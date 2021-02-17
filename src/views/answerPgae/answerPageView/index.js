import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import firebase from "firebase";
import Timer from "./timer";
import HintComponent from "./hintComponent";

const AnswerPageView = ({date}) => {

  const handleAnswer = async (event) => {
    let userAnswer = event.target.value;
    let getAnwserFunction = firebase.functions().httpsCallable("finalAnswer");

    let answer = getAnwserFunction()
      .then((result) => {
        alert(result.data["answer"]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // return (

  const [hints, setHints] = useState([]);
  const [lastHintShown, setLastHintShown] = useState(-1);

  useEffect(() => {
    firebase
      .firestore()
      .collection("hint")
      .doc("hints")
      .onSnapshot((newHints) => {
        setHints(newHints.data()["hints"]);
      });
    firebase
      .firestore()
      .collection("hint")
      .doc("hints")
      .onSnapshot((newHints) => {
        setLastHintShown(newHints.data()["lastHint"]);
      });
  }, []);

  const renderHints = () => {
    if (hints.length == 0) return <h1> ...</h1>;
    let hintsToShow = [];
    for (var i = 0; i < lastHintShown + 1; i++) {
      let curHint = hints[i];
      hintsToShow.push(
        <HintComponent
          id={i}
          hintID={i}
          hintText={curHint["hintText"]}
          revealed={curHint["shown"]}
        />
      );
    }
    if (lastHintShown != 2) {
      let nextHint = hints[lastHintShown + 1];
      hintsToShow.push(
        <HintComponent
          id={lastHintShown + 1}
          hintID={lastHintShown + 1}
          hintText={nextHint["hintText"]}
          revealed={nextHint["shown"]}
        />
      );
    }
    return hintsToShow;
  };
  return (
    <div>
        <Box width="100%">

            <Card >
                <CardContent>


                    <Typography gutterBottom variant="h5" component="h2">
                        : باقي لك
                    </Typography>
                    <Timer endTime={date}/>
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

      <h5>
        {" "}
        عندك ثلاث تلميحات, ولكن كل تلميحه بسعرها, فكر زين قبل لا تظهر اي تلميحة
      </h5>
      <ButtonGroup orientation="vertical" style={{}}>
        {renderHints()}
      </ButtonGroup>
    </div>
  );
};

export default AnswerPageView;
