import React, { useState, useEffect } from "react";
import { getAllCategories } from "../API/API_access";

const Child = (props) => {
  const [categories, setCategories] = useState([]);
  const [playOnce, setPlayOnce] = useState(false);

  const [motcle, setMotCle] = useState("");
  /*const [listChoice, setListChoice] = useState([]);*/

  useEffect(() => {
    if (!playOnce) {
      getAllCategories().then((response) => {
        setCategories(response);
        setPlayOnce(true);
      });
    }
    console.log(props.listChoice);
  }, [playOnce]);

  /*const addListChoice = (data) => {
    setListChoice(listChoice.concat(data));
  };

  const removeListChoice = (data) => {
    setListChoice(listChoice.filter((item) => item !== data));
  };*/

  return (
    <div>
      Listes Mots détectés :
      {categories.map((response) => (
        <p key={response.libelle}>
          {response.libelle}{" "}
          {!props.listChoice.includes(response.libelle) && (
            <button onClick={() => props.addListChoice(response.libelle)}>
              Ajouter dans la liste
            </button>
          )}
        </p>
      ))}
      <div class="form-group">
        <label for="input_motcle">Ajouter dans la liste un autre mot clé</label>
        <input
          type="text"
          class="form-control"
          name="input_motcle"
          id="input_motcle"
          value={motcle}
          onChange={(e) => setMotCle(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          props.addListChoice(motcle);
          setMotCle("");
        }}
      >
        Ajouter
      </button>
      Liste de mots clés choisi :
      {props.listChoice.map((response) => (
        <p key={response}>
          {response}{" "}
          <button onClick={() => props.removeListChoice(response)}>
            Supprimer
          </button>
        </p>
      ))}
    </div>
  );
};

export default Child;
