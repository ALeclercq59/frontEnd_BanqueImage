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
