"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    setAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    Cookies.set("authToken", token, { expires: 7 });
    setAuthenticated(true);
    router.push("/dashboard");
  };

  const logout = () => {
    Cookies.remove("authToken");
    setAuthenticated(false);
    router.push("/login");
  };

  return { authenticated, login, logout };
}