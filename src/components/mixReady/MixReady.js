import React from "react";
import { Link, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  padding: {
    margin: theme.spacing(8),
    minWidth: 200,
  },
}));

const download = (mixer, filename) => {
  // axios.get(`/download/${mixer}/${filename.split('.').slice(0, -1).join('.')}`, {
  //   user: mixer,
  //   filename: filename
  // });
  console.log(filename);
  const url = `public/recordings/mixed/${mixer}/${filename}`;
  window.open(url, '_blank');
}

const MixReady = ({ location }) => {
  const classes = useStyles();
  const { mixer, filename, path } = location.state;
  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">Your mix is ready!</Typography>
      </div>
      <h1>Mixer: {mixer}</h1>
      <h1>Filename: {filename}</h1>
      <h1>Path: {path}</h1>

      <Button
        className={classes.padding}
        variant="contained"
        color="primary"
        size="large"
        onClick={download(mixer, filename)}
      >
        Download
      </Button>

    </Container>
  );
};

export default withRouter(MixReady);
