import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(8),
    minWidth: 200
  },
  buttonGroup: {
    margin: theme.spacing(2)
  }
}));

export default function SavedClip() {
  const classes = useStyles();
  const [song, setSong] = React.useState("");

  const handleChange = event => {
    setSong(event.target.value);
  };

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">Clip Saved!</Typography>
      </div>
      
      <Button style={{marginTop: "2rem"}} variant="contained" color="primary" size="large">
        Back to Dashboard
      </Button>
      
    </Container>
  );
}
