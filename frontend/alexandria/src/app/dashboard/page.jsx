"use client";

import Link from "next/link";

import {
  BookOpen,
  Users,
  Library,
  ArrowRight,
  ShieldCheck,
  BookCopy,
  LayoutDashboard,
  Sparkles,
  Clock3,
  BadgeCheck,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
    
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-indigo-400/20 blur-3xl rounded-full -top-32 -left-32" />

        <div className="absolute w-[400px] h-[400px] bg-blue-400/20 blur-3xl rounded-full top-[30%] right-[-100px]" />
      </div>

  

      <header className="relative bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/15 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-lg">
              <Library size={42} />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Alexandria
              </h1>

              <p className="text-blue-100 text-lg">
                Sistema moderno de gerenciamento de
                biblioteca
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/10">
            <ShieldCheck size={22} />

            <span className="font-medium">
              API protegida com JWT
            </span>
          </div>
        </div>
      </header>



      <section className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-md rounded-[36px] shadow-2xl border border-white/50 p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
       

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
                  <Sparkles size={18} />

                  Painel Administrativo
                </div>
              </div>

              <h2 className="text-6xl font-black leading-tight text-gray-800">
                Controle total da sua biblioteca
              </h2>

              <p className="mt-8 text-gray-600 text-lg leading-9">
                Gerencie livros, usuários,
                empréstimos e permissões em uma
                plataforma moderna, rápida e segura.
                Tudo integrado com autenticação JWT e
                API RESTful.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/biblioteca"
                  className="group bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl"
                >
                  <BookOpen size={22} />

                  Acessar Biblioteca

                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  href="/users"
                  className="group bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 text-indigo-700 px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg"
                >
                  <Users size={22} />

                  Usuários
                </Link>
              </div>
            </div>

          

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-3xl p-6 shadow-2xl">
                <BookCopy size={40} />

                <h3 className="mt-5 text-3xl font-bold">
                  Livros
                </h3>

                <p className="mt-2 text-indigo-100">
                  Controle completo do catálogo
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-3xl p-6 shadow-2xl">
                <Users size={40} />

                <h3 className="mt-5 text-3xl font-bold">
                  Usuários
                </h3>

                <p className="mt-2 text-blue-100">
                  Gestão de permissões
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100">
                <Clock3
                  size={40}
                  className="text-indigo-600"
                />

                <h3 className="mt-5 text-2xl font-bold text-gray-800">
                  Empréstimos
                </h3>

                <p className="mt-2 text-gray-500">
                  Controle de devoluções
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100">
                <BadgeCheck
                  size={40}
                  className="text-blue-600"
                />

                <h3 className="mt-5 text-2xl font-bold text-gray-800">
                  Segurança
                </h3>

                <p className="mt-2 text-gray-500">
                  Proteção JWT integrada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="relative max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="text-indigo-700" />

          <h2 className="text-3xl font-bold text-gray-800">
            Gerenciamento rápido
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
         

          <Link href="/users">
            <div className="group bg-white/90 backdrop-blur-md rounded-[32px] shadow-xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-indigo-100">
              <div className="flex items-center justify-between mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-5 rounded-3xl shadow-lg">
                  <Users size={45} />
                </div>

                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm">
                  Administração
                </span>
              </div>

              <h3 className="text-4xl font-black text-gray-800">
                Usuários
              </h3>

              <p className="mt-5 text-gray-600 leading-8 text-lg">
                Gerencie administradores, usuários,
                permissões e acessos da plataforma.
              </p>

              <div className="mt-8 flex items-center gap-3 text-indigo-700 font-bold text-lg">
                Abrir gerenciamento

                <ArrowRight className="group-hover:translate-x-1 transition" />
              </div>
            </div>
          </Link>

        

          <Link href="/biblioteca">
            <div className="group bg-white/90 backdrop-blur-md rounded-[32px] shadow-xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-100">
              <div className="flex items-center justify-between mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-5 rounded-3xl shadow-lg">
                  <BookOpen size={45} />
                </div>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
                  Biblioteca
                </span>
              </div>

              <h3 className="text-4xl font-black text-gray-800">
                Biblioteca
              </h3>

              <p className="mt-5 text-gray-600 leading-8 text-lg">
                Controle livros, autores,
                disponibilidade, categorias e
                empréstimos.
              </p>

              <div className="mt-8 flex items-center gap-3 text-blue-700 font-bold text-lg">
                Acessar biblioteca

                <ArrowRight className="group-hover:translate-x-1 transition" />
              </div>
            </div>
          </Link>
        </div>
      </section>

   

      <footer className="relative bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white py-7">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-bold text-lg">
              Alexandria © 2026
            </p>

            <p className="text-blue-100">
              Plataforma de gerenciamento de biblioteca
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/10">
            <ShieldCheck size={20} />

            <span>REST API + JWT Authentication</span>
          </div>
        </div>
      </footer>
    </div>
  );
}