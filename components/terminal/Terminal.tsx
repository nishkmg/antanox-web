"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Terminal.module.css";

interface Command {
  input: string;
  output: string | React.ReactNode;
}

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands: Record<string, () => string | React.ReactNode> = {
  help: () => `Available commands: availability, services, info <name>, inquire, demo, pulse, clear, exit`,
  availability: () => {
    return (
      <div>
        <p>Checking engagement slots...</p>
        <p>STATUS: Limited availability — Q3 2026</p>
        <p>ACCEPTING: Security Intelligence, Digital Architecture</p>
        <p>QUEUE: 1 slot remaining</p>
        <p>Run `inquire` to begin the intake process.</p>
      </div>
    );
  },
  services: () => (
    <div>
      <p>ANTANOX SERVICE MANIFEST v1.0</p>
      <p>────────────────────────────</p>
      <p>[01] digital_architecture — Proprietary infrastructure builds</p>
      <p>[02] security_intelligence — Antanox Pulse — ARS-driven monitoring</p>
      <p>[03] wealth_interface — HNW portfolio analytics platform</p>
      <p>Run `info &lt;service_name&gt;` for details.</p>
    </div>
  ),
  pulse: () => {
    window.open("/pulse", "_blank");
    return "Opening Pulse page...";
  },
  inquire: () => {
    window.open("/inquiry", "_blank");
    return "Redirecting to intake process...";
  },
  demo: () => {
    window.open("/inquiry", "_blank");
    return "Redirecting to inquiry form...";
  },
  clear: () => {
    return "CLEAR";
  },
  exit: () => {
    return "EXIT";
  },
};

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<Command[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const processCommand = useCallback((cmd: string) => {
    const command = cmd.toLowerCase().trim();

    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "exit") {
      onClose();
      return;
    }

    if (command.startsWith("info ")) {
      const service = command.substring(5).trim();
      if (service === "security_intelligence") {
        setHistory((prev) => [
          ...prev,
          { input: cmd, output: "PROCESSING..." },
        ]);
        setIsTyping(true);
        setTimeout(() => {
          setHistory((prev) => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = {
              input: cmd,
              output: (
                <div>
                  <p>ANTANOX PULSE — SECURITY INTELLIGENCE LAYER</p>
                  <p>──────────────────────────────────────────</p>
                  <p>Type: Continuous multi-vector monitoring</p>
                  <p>Output: Antanox Risk Score (ARS) 0–1000</p>
                  <p>Mapping: MITRE ATT&CK Framework</p>
                  <p>Vectors: Domain, IP, Cloud, Repository, Endpoint</p>
                  <p>Run `demo` to request a demonstration.</p>
                </div>
              ),
            };
            return newHistory;
          });
          setIsTyping(false);
        }, 500);
        return;
      }
    }

    const handler = commands[command];
    if (handler) {
      setHistory((prev) => [
        ...prev,
        { input: cmd, output: "PROCESSING..." },
      ]);
      setIsTyping(true);

      setTimeout(() => {
        const result = handler();
        if (result === "CLEAR" || result === "EXIT") return;

        setHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { input: cmd, output: result };
          return newHistory;
        });
        setIsTyping(false);
      }, 300);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          input: cmd,
          output: (
            <span className={styles.error}>
              Command not recognized. Run `help` for available commands.
            </span>
          ),
        },
      ]);
    }
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      processCommand(input);
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.terminal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Antanox Terminal"
      >
        <div className={styles.header}>
          <div className={styles.dots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <span className={styles.title}>Antanox Terminal</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close terminal">
            ×
          </button>
        </div>

        <div className={styles.body} ref={historyRef}>
          <div className={styles.welcome}>
            <p>Antanox Terminal v1.0</p>
            <p>Type `help` for available commands.</p>
          </div>

          {history.map((cmd, index) => (
            <div key={index} className={styles.command}>
              <div className={styles.inputLine}>
                <span className={styles.prompt}>$</span>
                <span>{cmd.input}</span>
              </div>
              <div className={styles.output}>{cmd.output}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <span className={styles.prompt}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input}
            autoFocus
            disabled={isTyping}
          />
          <span className={styles.cursor} />
        </form>
      </div>
    </div>
  );
}
