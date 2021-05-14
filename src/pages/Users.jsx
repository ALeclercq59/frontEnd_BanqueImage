import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

import { getAllUsers, removeUser } from "../API/API_access";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllUsersFunc();
  }, [users]);

  const getAllUsersFunc = () => {
    getAllUsers().then((response) => {
      setUsers(response);
    });
  };

  const deleteUser = (id) => {
    setOpen(false);
    removeUser(id).then((response) => console.log(response));
    getAllUsersFunc();
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <h2>Gestion des utilisateurs</h2>
        <Link to="/user/create">
          <Button
            style={{ position: "absolute", right: 0, top: 0 }}
            variant="contained"
            color="primary"
          >
            Ajouter un utilisateur
          </Button>
        </Link>
      </div>
      <br />
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Rôle</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((response) => (
            <tr>
              <td>{response.email}</td>
              <td>{response.name}</td>
              <td>{response.firstname}</td>
              <td>{response.role === 0 ? "Gestionnaire" : "Utilisateur"}</td>
              <td>
                <Link to={"/user/update/" + response.idUser}>
                  <IconButton>
                    <CreateIcon />
                  </IconButton>
                </Link>
                <IconButton onClick={() => setOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </td>
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Voulez-vous vraiment supprimer cet utilisateur ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    La suppression est permanente, vous ne pourrez plus
                    récupérer cet utilisateur. Etes-vous sûre ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">
                    Non
                  </Button>
                  <Button
                    onClick={() => deleteUser(response.idUser)}
                    color="primary"
                    autoFocus
                  >
                    Oui
                  </Button>
                </DialogActions>
              </Dialog>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
