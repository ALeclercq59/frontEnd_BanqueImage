import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";

import CardImage from "../components/CardImage";

import { getAllImages, getAllCategories } from "../API/API_access";

const Images = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [imageSorted, setImageSorted] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [valueForSelect, setValueForSelect] = useState([]);

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories().then((response) => {
        setCategories(response);
      });
    }
    if (categories.length !== 0 && valueForSelect.length === 0) {
      createOptionsForSelect();
    }

    getAllImages().then((response) => setImages(response));

    const sortedImages = () => {
      const imagesObj = Object.keys(images).map((i) => images[i]);
      const sortedArray = imagesObj.sort((a, b) => {
        return a.id - b.id;
      });
      setImageSorted(sortedArray);
    };
    sortedImages();
  }, [images, search]);

  const createOptionsForSelect = () => {
    categories.map((category) => {
      valueForSelect.push({
        value: category.libelle,
        label: category.libelle,
      });
    });
  };

  return (
    <div>
      <h2>Gestion des images</h2>
      <br />
      <div class="row">
        <div class="col-md-4">
          <TextField
            className="search"
            label="Rechercher"
            variant="outlined"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            fullWidth={true}
          />
        </div>
        <div class="col-md-6">
          <Select
            name="colors"
            isClearable={true}
            options={valueForSelect}
            className="basic-select"
            classNamePrefix="select"
            placeholder="Rechercher par catégorie"
            onChange={(value) => {
              if (value === null) {
                setSelectedCategorie("");
              } else {
                setSelectedCategorie(value);
              }
            }}
            required
          />
        </div>
      </div>

      <br />
      <br />
      <Grid container spacing={4}>
        {search === ""
          ? selectedCategorie === "" || selectedCategorie === null
            ? images.map((response) => (
                <Grid item key={response.name} xs={12} sm={6} md={4}>
                  <CardImage image={response} key={response.name} />
                </Grid>
              ))
            : imageSorted
                .filter((image) =>
                  image.categories
                    .map((res) => res.libelle)
                    .includes(selectedCategorie.value)
                )
                .map((response) => (
                  <Grid item key={response.name} xs={12} sm={6} md={4}>
                    <CardImage image={response} key={response.name} />
                  </Grid>
                ))
          : selectedCategorie === "" || selectedCategorie === null
          ? imageSorted
              .filter(
                (image) =>
                  (image.categories
                    .map((res) => res.libelle)
                    .includes(selectedCategorie.value) === false &&
                    image.description
                      .toLowerCase()
                      .includes(search.toLowerCase()) === true) ||
                  (image.categories
                    .map((res) => res.libelle)
                    .includes(selectedCategorie.value) === false &&
                    image.title.toLowerCase().includes(search.toLowerCase())) ||
                  (image.categories
                    .map((res) => res.libelle)
                    .includes(selectedCategorie.value) === false &&
                    image.categories
                      .map((res) => res.libelle)
                      .includes(search.toLowerCase()))
              )
              .map((response) => (
                <Grid item key={response.name} xs={12} sm={6} md={4}>
                  <CardImage image={response} key={response.name} />
                </Grid>
              ))
          : imageSorted
              .filter(
                (image) =>
                  (image.categories
                    .map((res) => res.libelle)
                    .includes(selectedCategorie.value) &&
                    image.description
                      .toLowerCase()
                      .includes(search.toLowerCase()) === true) ||
                  (image.categories
                    .map((res) => res.libelle)
                    .includes(selectedCategorie.value) &&
                    image.title.toLowerCase().includes(search.toLowerCase())) ||
                  (image.categories
                    .map((res) => res.libelle)
                    .includes(selectedCategorie.value) &&
                    image.categories
                      .map((res) => res.libelle)
                      .includes(search.toLowerCase()))
              )
              .map((response) => (
                <Grid item key={response.name} xs={12} sm={6} md={4}>
                  <CardImage image={response} key={response.name} />
                </Grid>
              ))}
      </Grid>
    </div>
  );
};

export default Images;
