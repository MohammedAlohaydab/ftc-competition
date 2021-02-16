import React, {useEffect} from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import firebase from "firebase";

const HomePageView = () => {


  return (
    <div>
      <img src={"/static/images/ftcLogoWhiteNoText.png"}></img>
      <center>
        <h3>لقد وصلت</h3>
      </center>
      <Button
        // onClick={handleClick}
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

export default HomePageView;
