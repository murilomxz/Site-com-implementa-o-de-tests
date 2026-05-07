// src/app/books/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hook/use.api";

export default function BooksPage() {
  const {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    loading,
    error,
  } = useApi();

  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    isbn: "",
    author_id: "",
    category_id: "",
    quantity: 1,
    available_qty: 1,
    published_year: "",
  });

  const [editingId, setEditingId] = useState(null);

  async function loadBooks() {
    try {
      const data = await getBooks();

      setBooks(data.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        author_id: Number(form.author_id),
        category_id: Number(form.category_id),
        quantity: Number(form.quantity),
        available_qty: Number(form.available_qty),
        published_year: Number(form.published_year),
      };

      if (editingId) {
        await updateBook(editingId, payload);

        alert("Livro atualizado!");
      } else {
        await createBook(payload);

        alert("Livro criado!");
      }

      setForm({
        title: "",
        isbn: "",
        author_id: "",
        category_id: "",
        quantity: 1,
        available_qty: 1,
        published_year: "",
      });

      setEditingId(null);

      loadBooks();
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleEdit(book) {
    setEditingId(book.id);

    setForm({
      title: book.title,
      isbn: book.isbn || "",
      author_id: book.author_id,
      category_id: book.category_id || "",
      quantity: book.quantity,
      available_qty: book.available_qty,
      published_year: book.published_year || "",
    });
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Deseja deletar?");

    if (!confirmDelete) return;

    try {
      await deleteBook(id);

      alert("Livro removido!");

      loadBooks();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Gerenciamento de Livros
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Título"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="ISBN"
          className="border p-2 rounded"
          value={form.isbn}
          onChange={(e) =>
            setForm({ ...form, isbn: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Author ID"
          className="border p-2 rounded"
          value={form.author_id}
          onChange={(e) =>
            setForm({
              ...form,
              author_id: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Category ID"
          className="border p-2 rounded"
          value={form.category_id}
          onChange={(e) =>
            setForm({
              ...form,
              category_id: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Quantidade"
          className="border p-2 rounded"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Disponíveis"
          className="border p-2 rounded"
          value={form.available_qty}
          onChange={(e) =>
            setForm({
              ...form,
              available_qty: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Ano"
          className="border p-2 rounded"
          value={form.published_year}
          onChange={(e) =>
            setForm({
              ...form,
              published_year: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-black text-white rounded p-2"
        >
          {editingId ? "Atualizar" : "Cadastrar"}
        </button>

        {error && (
          <p className="text-red-500 col-span-2">
            {error}
          </p>
        )}
      </form>

      {loading && <p>Carregando...</p>}

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Título</th>
            <th className="border p-2">ISBN</th>
            <th className="border p-2">Quantidade</th>
            <th className="border p-2">Disponíveis</th>
            <th className="border p-2">Ano</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">{book.id}</td>

              <td className="border p-2">{book.title}</td>

              <td className="border p-2">{book.isbn}</td>

              <td className="border p-2">
                {book.quantity}
              </td>

              <td className="border p-2">
                {book.available_qty}
              </td>

              <td className="border p-2">
                {book.published_year}
              </td>

              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(book.id)}
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