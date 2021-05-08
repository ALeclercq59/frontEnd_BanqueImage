import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { uploadImage, analyseImage, getAllCategories } from "../API/API_access";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";

const Upload = () => {
  const { register, handleSubmit } = useForm();
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState();
  const [data1, setData1] = useState([]);
  const [playOnce, setPlayOnce] = useState(false);
  const [resultAnalyse, setResultAnalyse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [valueForSelect, setValueForSelect] = useState([]);

  const [keyWords, setKeyWords] = useState([]);

  useEffect(() => {
    if (!playOnce) {
      analyseImage(data1.id).then((response) => {
        setResultAnalyse(response.Labels);
        setPlayOnce(true);
        setLoading(false);
      });
      getAllCategories().then((response) => setCategories(response));
      createOptionsForSelect();
    }
  }, [data1, playOnce]);

  const createOptionsForSelect = () => {
    categories.map((category) => {
      valueForSelect.push({
        value: category.libelle,
        label: category.libelle,
      });
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("description", description);
    formData.append("copyright", copyright);
    formData.append("idUser", 1);

    uploadImage(formData).then((response) => {
      setData1(response);
      setLoading(true);
    });
  };

  return (
    <div>
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
      {loading && (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {resultAnalyse.length != 0 && (
        <Select
          isMulti
          name="colors"
          options={valueForSelect}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      )}

      {resultAnalyse.map((response) => (
        <p key={response.Name}>
          {response.Name} {response.Confidence.toFixed(2)}%
          {!keyWords.includes(response.Name) && (
            <button
              onClick={() => {
                setKeyWords(keyWords.push(response.Name));
                console.log(keyWords);
              }}
            >
              Ajouter
            </button>
          )}
        </p>
      ))}
    </div>
  );
};

export default Upload;
