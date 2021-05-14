import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";

import { getImageById } from "../API/API_access";

const ImageShow = () => {
  const { id } = useParams();
  const [playOnce, setPlayOnce] = useState(false);
  const [image, setImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [motCles, setMotCles] = useState([]);

  useEffect(() => {
    if (!playOnce) {
      getImageById(id).then((response) => {
        setImage(response);
        setCategories(response.categories);
        setMotCles(response.motCles);
        setPlayOnce(true);
      });
    }
  }, [playOnce]);

  return (
    <div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-5">
            <div class="card">
              <img src={image.lien} />
            </div>
            <br />
            <Button
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
            >
              Télécharger
            </Button>
          </div>
          <div class="col-md-6">
            <h2>{image.title}</h2>
            <br />
            <h5>{image.description}</h5>
          </div>
        </div>
        <br />
        <br />
      </div>
      {categories.length !== 0 && (
        <div class="col-md-8">
          <h5>Catégories</h5>
          {categories.map((response) => (
            <Chip
              style={{ marginRight: 8 }}
              label={response.libelle}
              color="primary"
            />
          ))}
        </div>
      )}
      <br />
      <br />
      {motCles.length !== 0 && (
        <div class="col-md-8">
          <h5>Mots-Clés</h5>
          {motCles.map((response) => (
            <Chip
              style={{ marginRight: 8 }}
              label={response.libelle}
              color="secondary"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageShow;
