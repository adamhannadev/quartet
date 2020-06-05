import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { signOutStart } from "../../redux/user/user.actions";
import './style.css'

const Navbar = ({ signOut, currentUser }) => {
  return (
    <div className="navbar">
    <Grid justify="space-between" container spacing={3}>
      <Grid item>
      <img src="../quartetlogo.png" height="80" alt="Quartet Logo" />  
      </Grid>
      {currentUser ? (
        <Grid item >
            <Button style={{marginTop: "25%"}} variant="contained" color="primary" onClick={() => signOut()}>
              Sign Out
            </Button>
        </Grid>
      ) : null}
    </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(Navbar);