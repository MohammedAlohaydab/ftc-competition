import React from "react";
import {Box, Typography, Card, CardContent, TextField } from "@material-ui/core";
import firebase from "firebase";

import Timer from "./timer";
const AnswerPageView = () => {

 const handleAnswer = async(event) => {
     let userAnswer =  event.target.value;
     let getAnwserFunction = firebase
         .functions()
         .httpsCallable("finalAnswer");

     let answer = getAnwserFunction()
         .then((result) => {
             alert(result.data["answer"]);
         })
         .catch((err) => {
             alert(err);
         });

 }

  return (
      <Box width="100%">

      <Card >
      <CardContent>


        <Typography gutterBottom variant="h5" component="h2">
          : باقي لك
        </Typography>
        <Timer />
          <TextField
              multiline={false}
              fullWidth
              margin={"normal"}
              label="ادخل الشفرة"
              name="answer"
              onChange={null}
              required
              variant="outlined"
          />
      </CardContent>
    </Card>
      </Box>
  );
};

export default AnswerPageView;
