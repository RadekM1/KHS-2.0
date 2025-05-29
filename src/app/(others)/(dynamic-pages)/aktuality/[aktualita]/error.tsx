"use client";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error("Caught in Error Boundary:", error);

    window.location.reload();
  }, [error]);

  return null;
}
