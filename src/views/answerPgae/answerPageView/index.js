import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
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

const AnswerPageView = ({date, updateEndDate}) => {
    const [hints, setHints] = useState([]);
    const [lastHintShown, setLastHintShown] = useState(-1);
    const [isCallingCloudFunc, setCallingCloudFunc] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [open, setOpen] = useState(false);


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

    const handleAnswer = async () => {
        setCallingCloudFunc(true);
        let getAnwserFunction = firebase.functions().httpsCallable("finalAnswer");

        let answer = getAnwserFunction()
            .then((result) => {
                setCallingCloudFunc(false);
                let correctAnswer = result.data["answer"];
                if (correctAnswer === userAnswer){

                }
                else {
                    handleClickOpen();
                }

                // alert(typeof );
                // alert(typeof userAnswer);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
          currEndDate={date}
          updateEndDate={updateEndDate}
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
          currEndDate={date}
          updateEndDate={updateEndDate}
        />
      );
    }
    return hintsToShow;
    };

    const handleChange = (event) => {
        setUserAnswer(event.target.value);
    };
    const wrongAnswerDialog = () => {
        return(
            <Dialog
                className="App"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">oppps</DialogTitle>
                <DialogContent>
                    <DialogContentText color={"secondary"} id="alert-dialog-description">
                        اجابة خاطئة
                    </DialogContentText>
                    <DialogContentText  id="alert-dialog-description">
                        همممم لاتنسى ان فيه تلميحات تحت
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                        <Button onClick={handleClose} color="primary" autoFocus>
                            حاول مرة ثانية
                        </Button>

                </DialogActions>
            </Dialog>
        )
    }
    return (
    <>
        {wrongAnswerDialog()}
        {isCallingCloudFunc && <CircularProgress color="primary" />}

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
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                    <Button variant="contained" onClick={handleAnswer} color="primary">
                       التأكد من الشفرة
                    </Button>
                </CardContent>
            </Card>
        </Box>

      {/*<h5>*/}
      {/*  {" "}*/}
      {/*  عندك ثلاث تلميحات, ولكن كل تلميحه بسعرها, فكر زين قبل لا تظهر اي تلميحة*/}
      {/*</h5>*/}
      <ButtonGroup orientation="vertical" style={{}}>
        {renderHints()}
      </ButtonGroup>
    </>
  );
};

export default AnswerPageView;
