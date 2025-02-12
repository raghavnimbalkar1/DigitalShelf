"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, []);

  return <p>Redirecting...</p>;
}