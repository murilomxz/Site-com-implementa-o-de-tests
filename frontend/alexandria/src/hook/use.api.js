// src/hooks/useApi.js

import { useState } from "react";

const API_URL = "http://localhost:3000/api";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function getToken() {
    return localStorage.getItem("token");
  }

  async function request(endpoint, method = "GET", body = null) {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const token = getToken();

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.message || "Erro na requisição");
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }



  async function register(userData) {
    return request("/auth/register", "POST", userData);
  }

  async function login(credentials) {
    const data = await request("/auth/login", "POST", credentials);

    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  }

  async function profile() {
    return request("/auth/profile");
  }

  function logout() {
    localStorage.removeItem("token");
  }

 

  async function getUsers(page = 1, limit = 10) {
    const data = await request(`/users?page=${page}&limit=${limit}`);
    return data?.data ?? data;
  }

  async function createUser(userData) {
    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "user",
    };

    return request("/users", "POST", payload);
  }

  async function getUserById(id) {
    return request(`/users/${id}`);
  }

  async function updateUser(id, userData) {
    return request(`/users/${id}`, "PUT", userData);
  }

  async function deleteUser(id) {
    return request(`/users/${id}`, "DELETE");
  }

 

  async function getAuthors(page = 1, limit = 10) {
    const data = await request(`/authors?page=${page}&limit=${limit}`);
    return data?.data ?? data;
  }

  async function getAuthorById(id) {
    return request(`/authors/${id}`);
  }

  async function createAuthor(authorData) {
    return request("/authors", "POST", authorData);
  }

  async function updateAuthor(id, authorData) {
    return request(`/authors/${id}`, "PUT", authorData);
  }

  async function deleteAuthor(id) {
    return request(`/authors/${id}`, "DELETE");
  }



  async function getCategories(page = 1, limit = 10) {
    const data = await request(`/categories?page=${page}&limit=${limit}`);
    return data?.data ?? data;
  }

  async function getCategoryById(id) {
    return request(`/categories/${id}`);
  }

  async function createCategory(categoryData) {
    return request("/categories", "POST", categoryData);
  }

  async function updateCategory(id, categoryData) {
    return request(`/categories/${id}`, "PUT", categoryData);
  }

  async function deleteCategory(id) {
    return request(`/categories/${id}`, "DELETE");
  }


async function getBooks(page = 1, limit = 10) {
  const data = await request(`/books?page=${page}&limit=${limit}`);
  return data?.data ?? data;
}
  async function getBookById(id) {
    return request(`/books/${id}`);
  }

  async function createBook(bookData) {
    return request("/books", "POST", bookData);
  }

  async function updateBook(id, bookData) {
    return request(`/books/${id}`, "PUT", bookData);
  }

  async function deleteBook(id) {
    return request(`/books/${id}`, "DELETE");
  }



  async function getLoans(page = 1, limit = 10) {
    const data = await request(`/loans?page=${page}&limit=${limit}`);
    return data?.data ?? data;
  }

  async function getLoanById(id) {
    return request(`/loans/${id}`);
  }

  async function createLoan(loanData) {
    return request("/loans", "POST", loanData);
  }

  async function returnLoan(id) {
    return request(`/loans/${id}/return`, "PATCH");
  }

  async function deleteLoan(id) {
    return request(`/loans/${id}`, "DELETE");
  }



  return {
    loading,
    error,

    register,
    login,
    profile,
    logout,

    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,

    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,

    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,

    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,

    getLoans,
    getLoanById,
    createLoan,
    returnLoan,
    deleteLoan,
  };
}