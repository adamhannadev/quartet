import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  paddingTopBottom: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8)
  }
}));

export default function ChooseSong() {
  const classes = useStyles();
  const [song, setSong] = React.useState("");

  const handleChange = event => {
    setSong(event.target.value);
  };

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h3">Song Title</Typography>
      </div>
      <Grid container spacing={3} className={classes.paddingTopBottom}>
        <Grid item xs={3}>
          <Typography>Soprano</Typography>
          <FormControl className={classes.formControl}>
            <Select label="" value={song} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Birlinn-Soprano</MenuItem>
              <MenuItem value={20}>Morag-Soprano</MenuItem>
              <MenuItem value={30}>Uibhist-Soprano</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Typography>Tenor</Typography>
          <FormControl className={classes.formControl}>
            <Select label="" value={song} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Birlinn-Tenor</MenuItem>
              <MenuItem value={20}>Morag-Tenor</MenuItem>
              <MenuItem value={30}>Uibhist-Tenor</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Typography>Alto</Typography>
          <FormControl className={classes.formControl}>
            <Select label="" value={song} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Birlinn-Alto</MenuItem>
              <MenuItem value={20}>Morag-Alto</MenuItem>
              <MenuItem value={30}>Uibhist-Alto</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Typography>Bass</Typography>
          <FormControl className={classes.formControl}>
            <Select label="" value={song} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Birlinn-Bass</MenuItem>
              <MenuItem value={20}>Morag-Bass</MenuItem>
              <MenuItem value={30}>Uibhist-Bass</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" size="large">
        Mix!
      </Button>
    </Container>
  );
}