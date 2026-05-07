// src/app/users/page.jsx

"use client";

import { useEffect, useState } from "react";
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

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editingId, setEditingId] = useState(null);

  async function loadUsers() {
    try {
      const data = await getUsers();

      setUsers(data.data);
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
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Deseja deletar?");

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      alert("Usuário removido!");

      loadUsers();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Gerenciamento de Usuários
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mb-10"
      >
        <input
          type="text"
          placeholder="Nome"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="border p-2 rounded"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          {editingId ? "Atualizar" : "Cadastrar"}
        </button>

        {error && (
          <p className="text-red-500">{error}</p>
        )}
      </form>

      {loading && <p>Carregando...</p>}

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>

              <td className="p-2 border">{user.name}</td>

              <td className="p-2 border">{user.email}</td>

              <td className="p-2 border">{user.role}</td>

              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}