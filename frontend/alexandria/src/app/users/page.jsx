"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  Pencil,
  Trash2,
  Shield,
  Mail,
  Search,
  Crown,
  User,
  Sparkles,
  ArrowLeft
} from "lucide-react";

import { useApi } from "@/hook/use.api";

export default function UsersPage() {
  const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loading,
    error,
  } = useApi();

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const router = useRouter()

  const [editingId, setEditingId] = useState(null);

  async function loadUsers() {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateUser(editingId, form);

        alert("Usuário atualizado!");
      } else {
        await createUser(form);

        alert("Usuário criado!");
      }

      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      setEditingId(null);

      loadUsers();
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleEdit(user) {
    setEditingId(user.id);

    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    const confirmDelete = confirm(
      "Deseja deletar este usuário?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      alert("Usuário removido!");

      loadUsers();
    } catch (err) {
      console.log(err.message);
    }
  }

const filteredUsers = (users ?? []).filter((u) =>
  u.name?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100 p-8">
 
<div className="mb-6">
  <button
    onClick={() => router.push("/dashboard")}
    className="flex items-center gap-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg border border-indigo-100 px-5 py-3 rounded-2xl text-slate-700 font-semibold hover:scale-[1.02]"
  >
    <ArrowLeft size={20} />

    Voltar ao Dashboard
  </button>
</div>
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 rounded-[32px] p-8 text-white shadow-2xl mb-10">
        <div className="flex items-center gap-5">
          <div className="bg-white/15 backdrop-blur-md p-5 rounded-3xl">
            <Users size={45} />
          </div>

          <div>
            <h1 className="text-5xl font-black">
              Usuários
            </h1>

            <p className="text-blue-100 text-lg mt-2">
              Gerencie administradores e usuários da
              plataforma
            </p>
          </div>
        </div>
      </div>

      

      <div className="bg-white rounded-[32px] shadow-2xl border border-indigo-100 p-8 mb-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-indigo-100 text-indigo-700 p-4 rounded-2xl">
            <UserPlus size={30} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {editingId
                ? "Editar Usuário"
                : "Cadastrar Usuário"}
            </h2>

            <p className="text-gray-500">
              Preencha as informações do usuário
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >
        

          <div>
            <label className="font-semibold text-gray-700">
              Nome
            </label>

            <input
              type="text"
              placeholder="Digite o nome"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>


          <div>
            <label className="font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Digite o email"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>


          <div>
            <label className="font-semibold text-gray-700">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite a senha"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

         

          <div>
            <label className="font-semibold text-gray-700">
              Permissão
            </label>

            <select
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
            >
              <option value="user">
                Usuário
              </option>

              <option value="admin">
                Administrador
              </option>
            </select>
          </div>


          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.01] transition-all duration-300 text-white font-bold p-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl"
            >
              <Sparkles size={20} />

              {editingId
                ? "Atualizar Usuário"
                : "Cadastrar Usuário"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 md:col-span-2">
              {error}
            </p>
          )}
        </form>
      </div>

   

      <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-5 mb-8">
        <div className="flex items-center gap-3">
          <Search className="text-indigo-600" />

          <input
            type="text"
            placeholder="Pesquisar usuário..."
            className="w-full outline-none text-lg"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

  

      <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-indigo-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Usuários cadastrados
            </h2>

            <p className="text-gray-500 mt-1">
              Total: {filteredUsers.length}
            </p>
          </div>

          <div className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <Shield size={20} />

            Controle de acesso
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-lg">
            Carregando usuários...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="text-left p-5">
                    ID
                  </th>

                  <th className="text-left p-5">
                    Usuário
                  </th>

                  <th className="text-left p-5">
                    Email
                  </th>

                  <th className="text-left p-5">
                    Permissão
                  </th>

                  <th className="text-left p-5">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-100 hover:bg-indigo-50/40 transition"
                  >
                    <td className="p-5 font-semibold">
                      #{user.id}
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 text-indigo-700 p-3 rounded-2xl">
                          <User size={18} />
                        </div>

                        <div>
                          <p className="font-bold text-gray-800">
                            {user.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Usuário do sistema
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />

                        {user.email}
                      </div>
                    </td>

                    <td className="p-5">
                      {user.role === "admin" ? (
                        <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full flex items-center gap-2 w-fit font-semibold">
                          <Crown size={16} />

                          Admin
                        </div>
                      ) : (
                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2 w-fit font-semibold">
                          <User size={16} />

                          Usuário
                        </div>
                      )}
                    </td>

                    <td className="p-5">
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleEdit(user)
                          }
                          className="bg-yellow-400 hover:bg-yellow-500 transition text-white p-3 rounded-xl"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(user.id)
                          }
                          className="bg-red-500 hover:bg-red-600 transition text-white p-3 rounded-xl"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="p-10 text-center text-gray-500 text-lg">
                Nenhum usuário encontrado.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}