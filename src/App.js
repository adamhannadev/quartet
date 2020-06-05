// Import react and utilities
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// Import global styles
import "./App.css";
// Impoort the page components
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import ChooseSong from "./components/chooseSong/ChooseSong";
import UploadMidi from "./components/uploadMidi/UploadMidi";
import RecordSong from "./components/recordSong/RecordSong";
import ClipSaved from "./components/clipSaved/ClipSaved";
import ChooseMixSong from "./components/chooseMixSong/ChooseMixSong";
import ChooseMixParts from "./components/chooseMixParts/ChooseMixParts";
import MixReady from "./components/mixReady/MixReady";
import Navbar from "./components/navbar/Navbar";

import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

function App({ currentUser, checkUserSession }) {
  const [state, setState] = useState({
    loading: true,
  });
  useEffect(() => {
    checkUserSession();
    setState((state) => ({ ...state, loading: false }));
  }, [checkUserSession]);
  const { loading } = state;
  return loading ? (
    <h1>Loading...</h1>
  ) : (

    <div className="App">
      <Router>
        <Navbar currentUser={currentUser} />
        <div>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}

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
            <Route path="/record-song" render={() => <RecordSong />} />
            <Route
              path="/clip-saved"
              render={() =>
                currentUser ? <ClipSaved /> : <Redirect to="/" />
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
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
