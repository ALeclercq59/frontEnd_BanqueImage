import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  analyseImage,
  getAllCategories,
  updateDateImage,
  addCategoriesForImage,
  addMotsCleForImage,
} from "../API/API_access";

import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

const FormAfterUpload = (props) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [dataAnalyse, setDataAnalyse] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [valueForSelect, setValueForSelect] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [listChoice, setListChoice] = useState([]);
  const [motcle, setMotCle] = useState("");

  useEffect(() => {
    getAllCategories().then((response) => {
      setCategories(response);
    });
    createOptionsForSelect();
    if (loading) {
      analyseImage(props.dataImage.id).then((response) => {
        setDataAnalyse(response.Labels);
        setLoading(false);
      });
    }
  }, [loading]);

  const searchIfPersonDetect = (listDetect) => {
    let result = false;
    dataAnalyse.map((response) => {
      if (response.Name == "Person") {
        result = true;
      }
    });
    return result;
  };

  const createOptionsForSelect = () => {
    categories.map((category) => {
      valueForSelect.push({
        value: category.libelle,
        label: category.libelle,
      });
    });
  };

  const addListChoice = (data) => {
    setListChoice(listChoice.concat(data));
  };

  const removeListChoice = (data) => {
    setListChoice(listChoice.filter((item) => item !== data));
  };

  const getCurrentDate = (date1, separator = "-") => {
    let newDate = date1;
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };

  const onSubmit = async () => {
    /* Form Data pour envoyer Date */
    const formDataDate = new FormData();
    formDataDate.append("date", getCurrentDate(startDate));
    console.log(getCurrentDate(startDate));
    updateDateImage(props.dataImage.id, formDataDate).then((response) =>
      console.log(response)
    );
    /* Form Data pour envoyer liste des catégories */
    const formDataCategories = new FormData();
    let categories = [];
    selectedOption.map((response) => categories.push(response.value));
    console.log(categories);
    formDataCategories.append("categories", categories);
    addCategoriesForImage(
      props.dataImage.id,
      formDataCategories
    ).then((response) => console.log(response));
    /* Form Data pour envoyer liste des mots clés */
    const formDataMotsCle = new FormData();
    formDataMotsCle.append("motcles", listChoice);
    console.log(listChoice);
    addMotsCleForImage(props.dataImage.id, formDataMotsCle).then((response) =>
      console.log(response)
    );
  };

  return (
    <div>
      <img
        src={props.dataImage.lien}
        class="img-fluid"
        height="250"
        width="250"
      />
      {loading && (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {searchIfPersonDetect() && (
          <div class="form-group">
            <label for="date_accord">
              Date d'accord de la personne présente
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="P"
              locale="fr"
              required
            />
          </div>
        )}
        {dataAnalyse.length != 0 && (
          <div>
            <div>
              <Select
                isMulti
                name="colors"
                options={valueForSelect}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Sélectionner une / plusieurs catégories"
                onChange={setSelectedOption}
                required
              />
            </div>
            <div class="col-md-12 border">
              <div class="row">
                <div class="col-md-5">
                  Liste des choses détectés sur l'image :
                  {dataAnalyse.map((response) => (
                    <p key={response.Name}>
                      {response.Name} {response.Confidence.toFixed(2)}%
                      {!listChoice.includes(response.Name) && (
                        <div
                          class="border"
                          onClick={() => addListChoice(response.Name)}
                        >
                          Ajouter dans la liste
                        </div>
                      )}
                    </p>
                  ))}
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="input_motcle">
                      Ajouter dans la liste un autre mot clé
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="input_motcle"
                      id="input_motcle"
                      value={motcle}
                      onChange={(e) => setMotCle(e.target.value)}
                    />
                    <div
                      class="border"
                      onClick={() => {
                        addListChoice(motcle);
                        setMotCle("");
                      }}
                    >
                      Ajouter
                    </div>
                  </div>
                  Liste des mots clés choisi pour votre image :
                  {listChoice.map((response) => (
                    <p key={response}>
                      {response}
                      <div
                        class="border"
                        onClick={() => removeListChoice(response)}
                      >
                        Supprimer
                      </div>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <button>Envoyer</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormAfterUpload;
