"use client";

import { useState, useEffect, useCallback } from "react";
import Terminal from "./Terminal";

export default function useTerminal() {
  const [isOpen, setIsOpen] = useState(false);

  const openTerminal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeTerminal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { isOpen, openTerminal, closeTerminal, Terminal };
}
