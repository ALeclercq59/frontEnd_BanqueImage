import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { uploadImage } from "../API/API_access";

const FormUpload = (props) => {
  const { register, handleSubmit } = useForm();
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("description", description);
    formData.append("copyright", copyright);
    formData.append("idUser", 1);

    uploadImage(formData).then((response) => props.checkUpload(response));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="1"
          onChange={(e) => setCopyright(e.target.value)}
        />
        <label class="form-check-label" for="inlineRadio1">
          Oui
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="0"
          onChange={(e) => setCopyright(e.target.value)}
        />
        <label class="form-check-label" for="inlineRadio2">
          Non
        </label>
      </div>
      <br />
      <input type="file" name="file" {...register("file")} required />
      <button>Submit</button>
    </form>
  );
};

export default FormUpload;
