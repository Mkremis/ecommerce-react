import client from "./axiosClient";
import axios from "axios";
import { API_KEY } from "../config";

export function productRequests() {
  const getProductDetail = async (prodId) => {
    const options = {
      method: "GET",
      url: "https://asos2.p.rapidapi.com/products/v4/detail",
      params: {
        id: prodId,
        lang: "en-US",
        store: "US",
        sizeSchema: "US",
        currency: "USD",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };
  const getProductPrice = ({ prodId }) => {
    const options = {
      method: "GET",
      url: "https://asos2.p.rapidapi.com/products/v4/get-stock-price",
      params: {
        productIds: prodId,
        lang: "en-US",
        store: "US",
        sizeSchema: "US",
        currency: "USD",
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      },
    };

    return axios.request(options);
  };
  return { getProductDetail, getProductPrice };
}

export function cartRequests() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const updateUserCart = async (updatedCart) => {
    try {
      return await client.put(`/api/users/cart`, updatedCart, options);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCartItem = (itemId) => client.delete(`/api/users/cart/${itemId}`);

  return { deleteCartItem, updateUserCart };
}

export function likeRequests() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getUserLikes = () => client.get(`/api/users/likes`);

  const deleteLike = (prodId) => client.delete(`/api/users/likes/${prodId}`);

  const createLike = (newLike) =>
    client.post(`/api/users/likes`, newLike, options);

  return { getUserLikes, deleteLike, createLike };
}

export function userRequests() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const registerUser = async (
    userName,
    email,
    password,
    roles = ["ROLE_USER"]
  ) =>
    client.post(
      "/auth/register",
      { userName, email, password, roles },
      options
    );

  const loginUser = async (userName, password) =>
    client.post(`/auth/login`, {
      userName,
      password,
    });
  const reloadSession = async () => client.get(`/api/users/reload`);

  const logoutUser = async () => client.get("/api/users/logout");

  const getDashboard = async () => client.get("/api/users/dashboard");

  const updateDashboard = async (newDashboard) => {
    try {
      return await client.patch("/api/users/dashboard", newDashboard, options);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    reloadSession,
    getDashboard,
    updateDashboard,
  };
}

export function ordersRequests() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const createOrder = (order) =>
    client.post(`/api/users/create-order`, order, options);

  const getPurchases = () => client.get(`/api/users/purchases`);

  const getTransactions = (transactionId) =>
    client.get(`/api/users/transaction/${transactionId}`);

  return { createOrder, getPurchases, getTransactions };
}
