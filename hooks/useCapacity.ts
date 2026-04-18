"use client";

import { useState, useEffect } from "react";
import type { CapacityStatus } from "@/lib/capacity";

export function useCapacity() {
  const [status, setStatus] = useState<CapacityStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCapacity() {
      try {
        const response = await fetch("/api/capacity");
        if (!response.ok) {
          throw new Error("Failed to fetch capacity");
        }
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchCapacity();
  }, []);

  return { status, loading, error };
}
