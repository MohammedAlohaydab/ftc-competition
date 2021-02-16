import React from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import firebase from "firebase";

const HomePageView = () => {
  const handleClick = async () => {
    const countDoc = firebase.firestore().collection("docs").doc("count");
    const addOne = firebase.firestore.FieldValue.increment(1);
    await countDoc.set({ userCount: addOne });

    // next logic to implement:
    // signInAnon here then go to the next page.
    // if a user is signedInAnon he will be redircted to the answerPage
    // for wwexample if he closes and reopens the page he will be redircted to the answerPage.
  };

  return (
    <div>
      <img src={"/static/images/ftcLogoWhiteNoText.png"}></img>
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

export default HomePageView;
