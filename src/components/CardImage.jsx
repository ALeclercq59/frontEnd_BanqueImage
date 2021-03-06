import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const CardImage = (props) => {
  const { image } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={image.lien}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {image.title}
        </Typography>
        <Typography>
          {image.description.length > 85
            ? image.description.substr(0, 85) + "..."
            : image.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={"image/show/" + image.id}>
          <Button size="small" color="primary">
            View
          </Button>
        </Link>
        <Link to={"/image/edit/" + image.id}>
          <Button size="small" color="primary">
            Edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardImage;
