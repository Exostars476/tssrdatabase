import React, { useEffect, useMemo, useState, useRef } from "react";

const QUIZ_DATA = [
  { protocol: "FTP", full: "File Transfert Protocol", ports: [21] },
  { protocol: "SSH", full: "Secure Shell", ports: [22] },
  { protocol: "SFTP", full: "Secure File Transfet Protocol", ports: [22] },
  { protocol: "SMTP", full: "Simple Mail Transfert Protocol", ports: [25] },
  { protocol: "DNS", full: "Domain Name System", ports: [53] },
  { protocol: "DHCP", full: "Dynamic Host Configuration Protocol", ports: [67, 68] },
  { protocol: "TFTP", full: "Trivial File Transfert Protocol", ports: [69] },
  { protocol: "HTTP", full: "Hyper Text Transfert Protocol", ports: [80] },
  { protocol: "POP3", full: "Post Office Protocol", ports: [110] },
  { protocol: "NTP", full: "Network Time Protocol", ports: [123] },
  { protocol: "IMAP", full: "Internet Message Access Protocol", ports: [143] },
  { protocol: "SNMP", full: "Simple Network Management Protocol", ports: [161] },
  { protocol: "LDAP", full: "Lightweight Directory Access Protocol", ports: [389] },
  { protocol: "HTTPS", full: "Hyper Text Transfert Protocol Secure", ports: [443] },
  { protocol: "SMB", full: "Server Message Block", ports: [445] },
  { protocol: "LDAPS", full: "Lightweight Directory Access Protocol Secure", ports: [636] },
  { protocol: "RDP", full: "Remote Desktop Protocol", ports: [3389] },
];

const PORT_TO_PROTOCOLS = QUIZ_DATA.reduce((acc, item) => {
  item.ports.forEach((port) => {
    if (!acc[port]) acc[port] = [];
    acc[port].push(item.protocol);
  });
  return acc;
}, {});

function normalizeText(value) {
  return String(value).trim().toUpperCase();
}

function normalizePortAnswer(value) {
  return String(value)
    .replace(/\s+/g, "")
    .replace(/,/g, "/")
    .replace(/;/g, "/")
    .replace(/OU/gi, "/")
    .replace(/OR/gi, "/");
}

function isCorrectAnswer(question, answer) {
  if (!question) return false;

  if (question.type === "portToProtocol") {
    const validProtocols = PORT_TO_PROTOCOLS[question.port] || [];
    return validProtocols.some(
      (protocol) => normalizeText(answer) === normalizeText(protocol)
    );
  }

  if (question.type === "protocolToPort") {
    const cleaned = normalizePortAnswer(answer);

    // réponses complètes possibles (ex: "67/68")
    const validAnswers = [
      question.item.ports.join("/"),
      question.item.ports.join(" ou "),
      question.item.ports.join(","),
    ].map(normalizePortAnswer);

    // accepte aussi chaque port individuellement
    const singlePorts = question.item.ports.map((p) => String(p));

    return (
      validAnswers.includes(cleaned) ||
      singlePorts.includes(cleaned)
    );
  }

  return false;
}

function buildShuffledQueue(items) {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function buildQuestionPools() {
  const portQuestions = Object.keys(PORT_TO_PROTOCOLS).map((port) => ({
    type: "portToProtocol",
    port: Number(port),
    prompt: `${port} ?`,
    expected: PORT_TO_PROTOCOLS[port].join(" ou "),
  }));

  const protocolQuestions = QUIZ_DATA.map((item) => ({
    type: "protocolToPort",
    item,
    prompt: `${item.protocol} (${item.full}) ?`,
    expected: item.ports.join(" ou "),
  }));

  return {
    portQuestions,
    protocolQuestions,
  };
}

function getNextQuestion(state) {
  const { portQuestions, protocolQuestions } = buildQuestionPools();

  let nextPortQueue = state?.portQueue?.length
    ? [...state.portQueue]
    : buildShuffledQueue(portQuestions);

  let nextProtocolQueue = state?.protocolQueue?.length
    ? [...state.protocolQueue]
    : buildShuffledQueue(protocolQuestions);

  let nextType = state?.nextType || "portToProtocol";
  let question;

  if (nextType === "portToProtocol") {
    question = nextPortQueue.shift();
    if (nextPortQueue.length === 0) {
      nextPortQueue = buildShuffledQueue(portQuestions);
    }
    nextType = "protocolToPort";
  } else {
    question = nextProtocolQueue.shift();
    if (nextProtocolQueue.length === 0) {
      nextProtocolQueue = buildShuffledQueue(protocolQuestions);
    }
    nextType = "portToProtocol";
  }

  return {
    question,
    portQueue: nextPortQueue,
    protocolQueue: nextProtocolQueue,
    nextType,
  };
}

function getScoreColor(percent) {
  const hue = Math.max(0, Math.min(120, (percent / 100) * 120));
  return `hsl(${hue}, 75%, 45%)`;
}

export default function QuizBootstrap() {
  const [questionFlow, setQuestionFlow] = useState({
    portQueue: [],
    protocolQueue: [],
    nextType: Math.random() < 0.5 ? "portToProtocol" : "protocolToPort",
  });
  const [isRunning, setIsRunning] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);

  const percent = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Number(((correctAnswers / totalQuestions) * 100).toFixed(1));
  }, [correctAnswers, totalQuestions]);

  const scoreColor = getScoreColor(percent);

  useEffect(() => {
    if (isRunning && !question) {
      const next = getNextQuestion(questionFlow);
      setQuestion(next.question);
      setQuestionFlow({
        portQueue: next.portQueue,
        protocolQueue: next.protocolQueue,
        nextType: next.nextType,
      });
    }
  }, [isRunning, question, questionFlow]);

  useEffect(() => {
    if (isRunning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRunning, question]);

  function toggleQuiz() {
    if (isRunning) {
      setIsRunning(false);
      setQuestion(null);
    } else {
      setIsRunning(true);
      const next = getNextQuestion(questionFlow);
      setQuestion(next.question);
      setQuestionFlow({
        portQueue: next.portQueue,
        protocolQueue: next.protocolQueue,
        nextType: next.nextType,
      });
    }
    setAnswer("");
    setFeedback(null);
  }

  function resetStats() {
    const freshFlow = {
      portQueue: [],
      protocolQueue: [],
      nextType: Math.random() < 0.5 ? "portToProtocol" : "protocolToPort",
    };

    setTotalQuestions(0);
    setCorrectAnswers(0);
    setFeedback(null);
    setQuestionFlow(freshFlow);

    if (isRunning) {
      const next = getNextQuestion(freshFlow);
      setQuestion(next.question);
      setQuestionFlow({
        portQueue: next.portQueue,
        protocolQueue: next.protocolQueue,
        nextType: next.nextType,
      });
      setAnswer("");
    }
  }

  function submitAnswer(e) {
    e.preventDefault();
    if (!question) return;

    const correct = isCorrectAnswer(question, answer);

    setTotalQuestions((prev) => prev + 1);
    if (correct) setCorrectAnswers((prev) => prev + 1);

    setFeedback({
      correct,
      userAnswer: answer || "(vide)",
      expected: question.expected,
    });

    setAnswer("");
    const next = getNextQuestion(questionFlow);
    setQuestion(next.question);
    setQuestionFlow({
      portQueue: next.portQueue,
      protocolQueue: next.protocolQueue,
      nextType: next.nextType,
    });
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-2">Quiz Ports / Protocoles</h1>
      <p className="text-center text-muted mb-4">
        Les questions sont mélangées, mais réparties de façon équilibrée dans le temps.
      </p>

      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Questions</h6>
            <h3>{totalQuestions}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Bonnes réponses</h6>
            <h3>{correctAnswers}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Taux</h6>
            <h3 style={{ color: scoreColor }}>{percent}%</h3>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-primary me-2" onClick={toggleQuiz}>
          {isRunning ? "Arrêter le quizz" : "Lancer le quizz"}
        </button>
        <button className="btn btn-secondary" onClick={resetStats}>
          Reset stats
        </button>
      </div>

      <div className="card p-4 text-center mb-4">
        <h2>{isRunning && question ? question.prompt : "Clique sur lancer"}</h2>
      </div>

      <form onSubmit={submitAnswer} className="row g-2 justify-content-center mb-4">
        <div className="col-md-6">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={!isRunning}
            placeholder="Votre réponse"
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-success" disabled={!isRunning}>
            Valider
          </button>
        </div>
      </form>

      {feedback && (
        <div className={`alert ${feedback.correct ? "alert-success" : "alert-danger"}`}>
          {feedback.correct ? "Bonne réponse" : `Faux - réponse attendue: ${feedback.expected}`}
        </div>
      )}
    </div>
  );
}
