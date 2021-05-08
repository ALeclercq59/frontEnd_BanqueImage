import React, { useState, useEffect } from "react";
import { getAllCategories } from "../API/API_access";

const TestList = () => {
  const [categories, setCategories] = useState([]);
  const [playOnce, setPlayOnce] = useState(false);

  const [motcle, setMotCle] = useState("");
  const [listChoice, setListChoice] = useState([]);

  useEffect(() => {
    if (!playOnce) {
      getAllCategories().then((response) => {
        setCategories(response);
        setPlayOnce(true);
      });
    }
    console.log(listChoice);
  }, [playOnce]);

  const addListChoice = (data) => {
    setListChoice(listChoice.concat(data));
  };

  const removeListChoice = (data) => {
    setListChoice(listChoice.filter((item) => item !== data));
  };

  return (
    <div>
      Listes Mots détectés :
      {categories.map((response) => (
        <p key={response.libelle}>
          {response.libelle}{" "}
          {!listChoice.includes(response.libelle) && (
            <button onClick={() => addListChoice(response.libelle)}>
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
          addListChoice(motcle);
          setMotCle("");
        }}
      >
        Ajouter
      </button>
      Liste de mots clés choisi :
      {listChoice.map((response) => (
        <p key={response}>
          {response}{" "}
          <button onClick={() => removeListChoice(response)}>Supprimer</button>
        </p>
      ))}
    </div>
  );
};

export default TestList;
