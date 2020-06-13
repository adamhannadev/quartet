import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { getAllSongs } from "../../utils/query";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(8),
    minWidth: 200,
  },
}));

const ChooseMixSong = ({ history }) => {
  const classes = useStyles();
  const [song, setSong] = useState({
    id: null,
    title: null,
  });
  const [state, setState] = useState({
    loading: true,
    data: null,
  });
  useEffect(() => {
    const contests = async () => {
      let { data } = await getAllSongs();
      let { midis } = data;
      setState((state) => ({ ...state, loading: false, data: midis }));
    };
    contests();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    const [id, title] = value.split("&&");
    setSong({ ...song, id, title });
  };
  const { loading, data } = state;
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">Choose your song</Typography>
        <FormControl className={classes.formControl}>
          <Select
            label=""
            value={song.id + "&&" + song.title}
            onChange={handleChange}
          >
            <MenuItem value="null&&null">
              <em>None</em>
            </MenuItem>
            {data.map((song) => (
              <MenuItem key={song.id} value={song.id + "&&" + song.title}>
                {song.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* {song ? <ChooseMixParts /> : null} */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        disabled={song.id ? false : true}
        onClick={() => {
          history.push("/choose-mix-parts", {
            ...song,
          });
        }}
      >
        Let's go
      </Button>
    </Container>
  );
};

export default withRouter(ChooseMixSong);
