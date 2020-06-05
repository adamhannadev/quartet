// Import react and utilities
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Import global styles
import "./App.css";
// Impoort the page components
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import ChooseSong from "./components/chooseSong/ChooseSong";
import UploadMidi from "./components/uploadMidi/UploadMidi";
import RecordSong from "./components/recordSong/RecordSong";
import LogoSignOut from "./components/logoSignOut/LogoSignOut";
import ChooseMixSong from "./components/chooseMixSong/ChooseMixSong";
import ChooseMixParts from "./components/chooseMixParts/ChooseMixParts";
import MixReady from "./components/mixReady/MixReady";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

function App({ currentUser, checkUserSession }) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <div className="App">
      <Grid
        justify="space-between" // Add it here :)
        container
        spacing={24}
      >
        <Grid item>
          <Box border={1} borderRadius="50%">
            <Typography variant="h4">Q</Typography>
          </Box>
        </Grid>

        <Grid item>
          <div>
            <Button raised color="accent">
              Sign Out
            </Button>
          </div>
        </Grid>
      </Grid>
      <Router>
        <div>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <LogoSignOut />
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                currentUser ? <Redirect to="/dashboard" /> : <Landing />
              }
            />
            <Route
              path="/dashboard"
              render={() => (currentUser ? <Dashboard /> : <Redirect to="/" />)}
            />
            <Route
              path="/choose-song"
              render={() =>
                currentUser ? <ChooseSong /> : <Redirect to="/" />
              }
            />
            <Route
              path="/upload-midi"
              render={() =>
                currentUser ? <UploadMidi /> : <Redirect to="/" />
              }
            />
            <Route
              path="/record-song"
              render={() =>
                currentUser ? <RecordSong /> : <Redirect to="/" />
              }
            />
            <Route
              path="/choose-mix-song"
              render={() =>
                currentUser ? <ChooseMixSong /> : <Redirect to="/" />
              }
            />
            <Route
              path="/choose-mix-parts"
              render={() =>
                currentUser ? <ChooseMixParts /> : <Redirect to="/" />
              }
            />
            <Route
              path="/mix-ready"
              render={() => (currentUser ? <MixReady /> : <Redirect to="/" />)}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
