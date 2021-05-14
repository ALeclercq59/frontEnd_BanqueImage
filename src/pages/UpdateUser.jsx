import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import { getUserById, updateUser } from "../API/API_access";

const UpdateUser = () => {
  const { register, handleSubmit } = useForm();
  const [playOnce, setPlayOnce] = useState(false);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (!playOnce) {
      getUserById(id).then((response) => {
        setUser(response);
        setEmail(response.email);
        setName(response.name);
        setFirstname(response.firstname);
        response.role === 0 ? setRole("gestionnaire") : setRole("utilisateur");
        setPassword(response.password);
        setPlayOnce(true);
      });
    }
  }, [playOnce]);

  const onSubmit = async () => {
    let roleUser = 0;
    const formData = new FormData();
    formData.append("idUser", id);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("firstname", firstname);
    formData.append(
      "role",
      role === "gestionnaire" ? (roleUser = 0) : (roleUser = 1)
    );
    formData.append("password", password);

    updateUser(formData).then((response) => console.log(response));

    history.push("/users");
  };

  return (
    <div>
      <h2>Modification de l'utilisateur</h2>
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
            aria-label="gender"
            name="gender1"
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
            Modifier
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
