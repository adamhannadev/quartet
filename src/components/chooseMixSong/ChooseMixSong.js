import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  }
}));

export default function ChooseMixSong() {
  const classes = useStyles();
  const [song, setSong] = React.useState("");

  const handleChange = event => {
    setSong(event.target.value);
  };

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">Choose your song</Typography>
        <FormControl className={classes.formControl}>
          <Select label="" value={song} onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Birlinn</MenuItem>
            <MenuItem value={20}>Morag</MenuItem>
            <MenuItem value={30}>Uibhist</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button variant="contained" color="primary" size="large">
        Let's go
      </Button>
    </Container>
  );
}