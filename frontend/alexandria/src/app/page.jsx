"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hook/use.api";

export default function Login() {
  const { login, loading, error } = useApi();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(form);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Alexandria
        </h2>

        <p className="text-center text-purple-200 mb-6">
          Faça login para continuar
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {error && (
            <p className="text-red-300 text-sm text-center">
              {error}
            </p>
          )}
        </form>

      </div>
    </div>
  );
}