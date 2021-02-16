import React, { useEffect } from "react";
import { Button, LinearProgress } from "@material-ui/core";
import { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const HomePageView = ({updateCounter, setLoading }) => {


  const handleClick = () => {
    setLoading(true);
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
          updateCounter();
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <center>
        <h3>لقد وصلت</h3>
      </center>
      <Button
        onClick={handleClick}
        variant="outlined"
        size="large"
        color="inherit"
        style={{ margin: "100px", fontSize: 21 }}
      >
        الذهاب الى صفحة الاجابة
      </Button>
    </div>
  );
};
HomePageView.propTypes = {
  setLoading: PropTypes.func,
};
export default HomePageView;
