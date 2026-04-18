"use client";

import { useTerminal } from "./index";
import styles from "./TerminalTrigger.module.css";

export default function TerminalTrigger() {
  const { isOpen, openTerminal, closeTerminal, Terminal } = useTerminal();

  return (
    <>
      <button
        className={styles.trigger}
        onClick={openTerminal}
        aria-label="Open terminal"
        title="Open terminal (Cmd+K)"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="10" height="10" fill="currentColor" />
        </svg>
      </button>
      <Terminal isOpen={isOpen} onClose={closeTerminal} />
    </>
  );
}
