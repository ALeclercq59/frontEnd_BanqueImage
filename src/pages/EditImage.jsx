import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "react-switch";

import { getImageById, updateImage } from "../API/API_access";

const EditImage = () => {
  const { register, handleSubmit } = useForm();
  const [playOnce, setPlayOnce] = useState(false);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState(0);
  const [checkedCopyright, setCheckedCopyright] = useState(true);
  const [publication, setPublication] = useState(0);
  const [checkedPublication, setCheckedPublication] = useState(true);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (!playOnce) {
      getImageById(id).then((response) => {
        setImage(response);
        setTitle(response.title);
        setDescription(response.description);
        setCopyright(response.copyright);
        response.copyright === 1
          ? setCheckedCopyright(true)
          : setCheckedCopyright(false);
        setPublication(response.publication);
        response.publication === 1
          ? setCheckedPublication(true)
          : setCheckedPublication(false);
      });
    }
  }, [playOnce]);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("copyright", checkedCopyright ? 1 : 0);
    formData.append("publication", checkedPublication ? 1 : 0);

    updateImage(image.id, formData).then((response) => console.log(response));

    history.push("/image/show/" + image.id);
  };

  return (
    <div>
      <h2>Modification de l'image</h2>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="card">
          <img src={image.lien} />
        </div>
        <br />
        <TextField
          id="outlined-basic"
          label="Titre"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <br />
        <TextField
          id="outlined-multiline"
          label="Description"
          multiline
          rows={6}
          variant="outlined"
          fullWidth={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <br />
        <label style={{ fontSize: 17 }}>Ajouter un copyright :</label>
        <br />
        <Switch
          aria-label={"test"}
          onChange={(e) => setCheckedCopyright(e.valueOf())}
          checked={checkedCopyright}
          id="normal-switch"
        />
        <br />
        <br />
        <label style={{ fontSize: 17 }}>Publié l'image :</label>
        <br />
        <Switch
          aria-label={"test"}
          onChange={(e) => setCheckedPublication(e.valueOf())}
          checked={checkedPublication}
          id="normal-switch"
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="default">
          Modifier
        </Button>
      </form>
    </div>
  );
};

export default EditImage;
