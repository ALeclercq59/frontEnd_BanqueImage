import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();

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

  const searchIfPersonDetect = () => {
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
    if (data != "") {
      setListChoice(listChoice.concat(data));
    }
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
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
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
    addCategoriesForImage(props.dataImage.id, formDataCategories).then(
      (response) => console.log(response)
    );
    /* Form Data pour envoyer liste des mots clés */
    const formDataMotsCle = new FormData();
    formDataMotsCle.append("motcles", listChoice);
    console.log(listChoice);
    addMotsCleForImage(props.dataImage.id, formDataMotsCle).then((response) =>
      console.log(response)
    );

    history.push("/");
  };

  return (
    <div>
      <div class="card">
        <img src={props.dataImage.lien} />
      </div>
      {loading && (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {searchIfPersonDetect() && (
          <div class="form-group">
            <br />
            <label for="date_accord">
              Date d'accord de la personne présente
            </label>
            <br />
            <DatePicker
              className="inputDatePicker"
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
            <br />
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">
                  <h6>Liste des choses détectés sur l'image :</h6>
                  <List dense>
                    {dataAnalyse.map((response) => (
                      <ListItem key={response.Name} dense class="listItem">
                        <ListItemText
                          primary={
                            response.Name +
                            " " +
                            response.Confidence.toFixed(2) +
                            "%"
                          }
                        />
                        {!listChoice.includes(response.Name) && (
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() => addListChoice(response.Name)}
                            >
                              <AddIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </div>
                <div class="offset-md-2 col-md-4">
                  <TextField
                    id="outlined-basic"
                    label="Autre mot clé"
                    variant="outlined"
                    value={motcle}
                    onChange={(e) => setMotCle(e.target.value)}
                    fullWidth={true}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      addListChoice(motcle);
                      setMotCle("");
                    }}
                  >
                    Ajouter
                  </Button>
                  <br />
                  <br />
                  <h6>Liste des mots clés choisi pour votre image :</h6>
                  <List>
                    {listChoice.map((response) => (
                      <ListItem key={response} dense class="listItem">
                        <ListItemText primary={response} />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => removeListChoice(response)}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
            </div>
            <div class="offset-md-5">
              <Button variant="contained" color="primary" type="submit">
                Finir l'Upload
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormAfterUpload;
