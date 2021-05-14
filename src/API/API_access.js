import axios from "axios";

const BASE_URL = "http://localhost:8082/api/";

export const getAllImages = () => {
  const url = BASE_URL + "images/";
  return axios.get(url).then((response) => response.data);
};

export const getImagesByPublication = (publication) => {
  const url = BASE_URL + "images/publication/" + publication;
  return axios.get(url).then((response) => response.data);
};

export const uploadImage = (formData) => {
  const url = BASE_URL + "images/upload";
  return axios.post(url, formData).then((response) => response.data);
};

export const analyseImage = (idImage) => {
  const url = BASE_URL + "images/analyse/" + idImage;
  return axios.get(url).then((response) => response.data);
};

export const getAllCategories = () => {
  const url = BASE_URL + "categories/";
  return axios.get(url).then((response) => response.data);
};

export const getImageById = (id) => {
  const url = BASE_URL + "images/" + id;
  return axios.get(url).then((response) => response.data);
};

export const updateImage = (id, formData) => {
  const url = BASE_URL + "images/" + id + "/update";
  return axios.put(url, formData).then((response) => response.data);
};

export const updateDateImage = (id, formData) => {
  const url = BASE_URL + "images/" + id + "/date";
  return axios.put(url, formData).then((response) => response.data);
};

export const addCategoriesForImage = (id, formData) => {
  const url = BASE_URL + "images/" + id + "/addCategorie";
  return axios.put(url, formData).then((response) => response.data);
};

export const addMotsCleForImage = (id, formData) => {
  const url = BASE_URL + "images/" + id + "/addMotCles";
  return axios.put(url, formData).then((response) => response.data);
};

// Users
export const getAllUsers = () => {
  const url = BASE_URL + "users/";
  return axios.get(url).then((response) => response.data);
};

export const getUserById = (id) => {
  const url = BASE_URL + "users/" + id;
  return axios.get(url).then((response) => response.data);
};

export const createUser = (formData) => {
  const url = BASE_URL + "users/create";
  return axios.post(url, formData).then((response) => response.data);
};

export const updateUser = (formData) => {
  const url = BASE_URL + "users/update";
  return axios.put(url, formData).then((response) => response.data);
};

export const removeUser = (id) => {
  const url = BASE_URL + "users/" + id + "/delete";
  return axios.delete(url).then((response) => response.status);
};
