import React from "react";
import { withRouter } from "react-router-dom";
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
  padding: {
    margin: theme.spacing(8),
    minWidth: 200
  }
}));

const MixReady = ({ history }) => {
  const classes = useStyles();

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">Your mix is ready!</Typography>
      </div>
      <h1>{props.mixer}</h1>
      <Button
        className={classes.padding}
        variant="contained"
        color="primary"
        size="large"
      >
        Download
      </Button>
    </Container>
  );
}

export default withRouter(MixReady);