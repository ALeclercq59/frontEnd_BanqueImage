import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { createUser } from "../API/API_access";

const CreateUser = () => {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSubmit = async () => {
    let roleUser = 0;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("firstname", firstname);
    formData.append(
      "role",
      role === "gestionnaire" ? (roleUser = 0) : (roleUser = 1)
    );
    formData.append("password", password);

    createUser(formData).then((response) => console.log(response));

    history.push("/users");
  };

  return (
    <div>
      <h2>Créer un utilisateur</h2>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="col-md-6">
          <TextField
            type="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth={true}
          />
          <br />
          <br />
          <div class="row">
            <div class="col-md-6">
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth={true}
              />
            </div>
            <div class="col-md-6">
              <TextField
                id="outlined-basic"
                label="Prénom"
                variant="outlined"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                fullWidth={true}
              />
            </div>
          </div>
          <br />
          <FormLabel component="legend">Rôle</FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel
              value="gestionnaire"
              control={<Radio />}
              label="Gestionnaire"
            />
            <FormControlLabel
              value="utilisateur"
              control={<Radio />}
              label="Utilisateur"
            />
          </RadioGroup>
          <br />
          <div class="row">
            <div class="col-md-6">
              <TextField
                id="outlined-basic"
                label="Mot de passe"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth={true}
              />
            </div>
          </div>
          <br />
          <Button type="submit" variant="contained" color="default">
            Créer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
