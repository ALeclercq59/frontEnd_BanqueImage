import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import PeopleIcon from "@material-ui/icons/People";
import GetAppIcon from "@material-ui/icons/GetApp";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ImageSearchIcon />
      </ListItemIcon>
      <ListItemText primary="Images" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Utilisateurs" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GetAppIcon />
      </ListItemIcon>
      <ListItemText primary="Ajouter Image" />
    </ListItem>
  </div>
);
