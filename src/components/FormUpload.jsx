import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { uploadImage } from "../API/API_access";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "react-switch";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const FormUpload = (props) => {
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState(0);
  const [checked, setChecked] = useState(true);

  const onSubmit = async (data) => {
    checked ? setCopyright(1) : setCopyright(0);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("copyright", copyright);
    formData.append("file", data.file[0]);
    formData.append("idUser", 14);

    uploadImage(formData).then((response) => props.checkUpload(response));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Télécharger une image</h2>
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
        onChange={(e) => setChecked(e.valueOf())}
        checked={checked}
        id="normal-switch"
      />
      <br />
      <br />
      <input
        accept="image/*"
        type="file"
        name="file"
        {...register("file")}
        required
      />
      <br />
      <br />
      <Button
        type="submit"
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
    </form>
  );
};

export default FormUpload;
