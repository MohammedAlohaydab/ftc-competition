import React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import firebase from "firebase";

import Timer from "./timer";
const AnswerPageView = () => {
  return (
    <Card>
      <CardContent>
        <button
          onClick={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {})
              .catch((err) => {
                alert(err);
              });
          }}
        >
          {" "}
          sign out
        </button>
        <button
          onClick={async () => {
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
          }}
        >
          {" "}
          call function
        </button>
        <Typography gutterBottom variant="h5" component="h2">
          : باقي لك
        </Typography>
        <Timer />

        <Typography variant="body2" color="textSecondary" component="p">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate no n provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AnswerPageView;
