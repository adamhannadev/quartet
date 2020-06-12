import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { getPartRecordings, triggerMix } from "../../utils/query";
import { selectCurrentUser } from "../../redux/user/user.selector";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  paddingTopBottom: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}));

const ChooseMixParts = ({ location, currentUser, history }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    soprano: null,
    tenor: null,
    alto: null,
    bass: null,
    loading: true,
    path: null,
    filename: null,
    mixer: null,
  });
  const [parts, setParts] = React.useState({
    soprano: null,
    tenor: null,
    alto: null,
    bass: null,
  });

  useEffect(() => {
    const getRecordings = async (song, part) => {
      const { data } = await getPartRecordings(song, part);
      const names = data.recordings.map((item) => item.uid);
      setState((state) => ({ ...state, [part]: names }));
    };
    getRecordings(location.state.id, "soprano");
    getRecordings(location.state.id, "tenor");
    getRecordings(location.state.id, "alto");
    getRecordings(location.state.id, "bass");
    setState((state) => ({ ...state, loading: false }));
  }, [location.state.id]);

  const handleChange = (event) => {
    setParts((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const mix = async () => {
    let recordings = [
      {
        partID: "soprano",
        uid: parts.soprano,
      },
      {
        partID: "tenor",
        uid: parts.tenor,
      },
      {
        partID: "alto",
        uid: parts.alto,
      },
      {
        partID: "bass",
        uid: parts.bass,
      },
    ];

    recordings = recordings.filter((item) => item.uid !== null);

    await triggerMix(
      location.state.id,
      currentUser.displayName.replace(" ", "_"),
      recordings
    ).then(function (response) {
      let path = response.data.path;
      let filename = response.data.filename;
      let mixer = response.data.user;
      console.log(mixer);
      setState((state) => ({ ...state, [path]: path, [filename]: filename, [mixer]: mixer }));
    });
  };
  const { soprano, tenor, alto, bass, loading, path, filename, mixer } = state;
  return loading ? (
    <h1>Loading...</h1>
  ) : (
      <Container>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h3">{location.state.title}</Typography>
        </div>
        <Grid container spacing={3} className={classes.paddingTopBottom}>
          <Grid item xs={3}>
            <Typography>Soprano</Typography>
            <FormControl className={classes.formControl}>
              <Select
                label=""
                name="soprano"
                value={parts.soprano}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {soprano
                  ? soprano.map((user) => (
                    <MenuItem value={user}>{user}</MenuItem>
                  ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>Tenor</Typography>
            <FormControl className={classes.formControl}>
              <Select
                label=""
                name="tenor"
                value={parts.tenor}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {tenor
                  ? tenor.map((user) => <MenuItem value={user}>{user}</MenuItem>)
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>Alto</Typography>
            <FormControl className={classes.formControl}>
              <Select
                label=""
                name="alto"
                value={parts.alto}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {alto
                  ? alto.map((user) => <MenuItem value={user}>{user}</MenuItem>)
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>Bass</Typography>
            <FormControl className={classes.formControl}>
              <Select
                label=""
                name="bass"
                value={parts.bass}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {bass
                  ? bass.map((user) => <MenuItem value={user}>{user}</MenuItem>)
                  : null}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* <Link to={{ pathname: '/mixReady', state: { path: path, filename: filename} }}> */}
        {mixer ? mixer : null}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => mix().then(history.push("/mix-ready", {
            mixer,
          }))}
        >
          Mix!
        </Button>
        {/* </Link> */}
      </Container >
    );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(ChooseMixParts));
