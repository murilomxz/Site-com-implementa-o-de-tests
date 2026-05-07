"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BookOpen,
  Pencil,
  Trash2,
  Plus,
  Library,
  Package,
  Hash,
  Calendar,
  Search,
  ArrowLeft
} from "lucide-react";

import { useApi } from "@/hook/use.api";

export default function BooksPage() {

  useEffect(() => {
  loadBooks();
}, []);
  const {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    loading,
    error,
  } = useApi();

  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    isbn: "",
    author_id: "",
    category_id: "",
    quantity: 1,
    available_qty: 1,
    published_year: "",
  });
  const router = useRouter();

  const [editingId, setEditingId] = useState(null);


  async function loadBooks() {
    try {
      const data = await getBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err.message);
      setBooks([]);
    }
  }
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    const confirmDelete = confirm(
      "Deseja deletar este livro?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBook(id);

      alert("Livro removido!");

      loadBooks();
    } catch (err) {
      console.log(err.message);
    }
  }

  const filteredBooks = (books ?? []).filter((book) =>
    (book?.title ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">

      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg border border-indigo-100 px-5 py-3 rounded-2xl text-slate-700 font-semibold hover:scale-[1.02]"
        >
          <ArrowLeft size={20} />

          Voltar ao Dashboard
        </button>
      </div>
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 rounded-[32px] p-8 text-white shadow-2xl mb-10">
        <div className="flex items-center gap-5">
          <div className="bg-white/15 p-5 rounded-3xl backdrop-blur-md">
            <Library size={45} />
          </div>

          <div>
            <h1 className="text-5xl font-black">
              Biblioteca
            </h1>

            <p className="text-blue-100 text-lg mt-2">
              Gerencie livros, estoque e informações
              da biblioteca
            </p>
          </div>
        </div>
      </div>



      <div className="bg-white rounded-[32px] shadow-2xl p-8 border border-indigo-100 mb-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-100 text-indigo-700 p-3 rounded-2xl">
            <BookOpen size={28} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black">
              {editingId
                ? "Editar Livro"
                : "Cadastrar Livro"}
            </h2>

            <p className="text-black">
              Preencha as informações do livro
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >


          <div>
            <label className="font-semibold text-black">
              Título
            </label>

            <input
              type="text"
              placeholder="Digite o título"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>



          <div>
            <label className="font-semibold text-black">
              ISBN
            </label>

            <input
              type="text"
              placeholder="Digite o ISBN"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.isbn}
              onChange={(e) =>
                setForm({
                  ...form,
                  isbn: e.target.value,
                })
              }
            />
          </div>



          <div>
            <label className="font-semibold text-black">
              Author ID
            </label>

            <input
              type="number"
              placeholder="ID do autor"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.author_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  author_id: e.target.value,
                })
              }
            />
          </div>



          <div>
            <label className="font-semibold text-black">
              Category ID
            </label>

            <input
              type="number"
              placeholder="ID da categoria"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.category_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  category_id: e.target.value,
                })
              }
            />
          </div>



          <div>
            <label className="font-semibold text-black">
              Quantidade
            </label>

            <input
              type="number"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: e.target.value,
                })
              }
            />
          </div>



          <div>
            <label className="font-semibold text-black">
              Disponíveis
            </label>

            <input
              type="number"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.available_qty}
              onChange={(e) =>
                setForm({
                  ...form,
                  available_qty: e.target.value,
                })
              }
            />
          </div>



          <div>
            <label className="font-semibold text-black">
              Ano de publicação
            </label>

            <input
              type="number"
              className="w-full mt-2 border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              value={form.published_year}
              onChange={(e) =>
                setForm({
                  ...form,
                  published_year: e.target.value,
                })
              }
            />
          </div>



          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] transition-all duration-300 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl"
            >
              <Plus size={20} />

              {editingId
                ? "Atualizar Livro"
                : "Cadastrar Livro"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 col-span-2">
              {error}
            </p>
          )}
        </form>
      </div>



      <div className="bg-white rounded-3xl p-5 shadow-xl mb-8 border border-indigo-100">
        <div className="flex items-center gap-3">
          <Search className="text-black" />

          <input
            type="text"
            placeholder="Pesquisar livro..."
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
            <h2 className="text-3xl font-bold text-black">
              Livros cadastrados
            </h2>

            <p className="text-black mt-1">
              Total: {filteredBooks.length}
            </p>
          </div>

          <div className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <Package size={20} />

            Biblioteca
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-lg">
            Carregando livros...
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
                    Título
                  </th>

                  <th className="text-left p-5">
                    ISBN
                  </th>

                  <th className="text-left p-5">
                    Quantidade
                  </th>

                  <th className="text-left p-5">
                    Disponíveis
                  </th>

                  <th className="text-left p-5">
                    Ano
                  </th>

                  <th className="text-left p-5">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-t border-gray-100 hover:bg-indigo-50/40 transition"
                  >
                    <td className="p-5 font-semibold">
                      #{book.id}
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 text-indigo-700 p-2 rounded-xl">
                          <BookOpen size={18} />
                        </div>

                        <span className="font-semibold">
                          {book.title}
                        </span>
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2 text-black">
                        <Hash size={16} />

                        {book.isbn}
                      </div>
                    </td>

                    <td className="p-5">
                      {book.quantity}
                    </td>

                    <td className="p-5">
                      {book.available_qty}
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />

                        {book.published_year}
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleEdit(book)
                          }
                          className="bg-yellow-400 hover:bg-yellow-500 transition text-white p-3 rounded-xl"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(book.id)
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

            {filteredBooks.length === 0 && (
              <div className="p-10 text-center text-black text-lg">
                Nenhum livro encontrado.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}