import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import firebase from "firebase";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";


const HintComponent = ({ hintID, revealed, hintText, hintHours, currEndDate, updateEndDate}) => {
  const hintDescText = "Showing this hint will 'reduce' the remaining time for all players, are you sure?";
  const hintTitle = "Warning" ;
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(hintTitle);
  const [dialogDesc, setDialogDesc] = useState(hintDescText);
  const [isError, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const calcEndDateTimestamp = (hours) => {
    let date = new Date(currEndDate*1000);
    date.setHours(date.getHours() - hours);
    return date.getTime()/1000;
  }

  const handleErrorDialog = () =>{
    setDialogTitle("Error");
    setDialogDesc("It looks like you want to show a hint, but there's not enough time.");
    setError(true);
  }

  const checkIfThereIsTimeAndReduce = (hours) => {
    let timestamp = calcEndDateTimestamp(hours);

    let startDate = new Date();
    let endDate   =  new Date(timestamp*1000);
    let secondsLeft = (endDate.getTime() - startDate.getTime()) / 1000;

    if (secondsLeft < 1)// less than 1 sec left
      return false;

    else {
      updateEndDate(timestamp);
      return true
    }

  };

  const handleAcceptShow = async () => {
    const addOne = firebase.firestore.FieldValue.increment(1);

    let doc = await firebase.firestore().collection("hint").doc("hints").get();

    let curHints = doc.data()["hints"];

    if (curHints[hintID]["shown"] == true) return;
    let canReduce = checkIfThereIsTimeAndReduce(curHints[hintID]["hours"]);

    if (!canReduce){
      handleErrorDialog();
      return ;
    }

    curHints[hintID]["shown"] = true;
    firebase
      .firestore()
      .collection("hint")
      .doc("hints")
      .set({ lastHint: addOne, hints: curHints }, { merge: true })
      .catch((err) => {
        alert(err);
      });
  };


  const HintText = () => {
    return (
      <Typography gutterBottom variant="h5" component="h2">

         Hint {hintID + 1}: {hintText}
      </Typography>
    );
  };

  // before showing
  const HintButton = () => {
    return (
      <div>
        <Button
          style={{ margin: "10px", borderRadius: 15 }}
          variant="contained"
          color="inherit"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <Typography color={"primary"} gutterBottom variant="h5" component="h2">
            Hint {hintID + 1} Details
          </Typography>
        </Button>
        {showDialog()}
      </div>
    );

  };
  const showDialog = () => {
    return(
        <Dialog
            className="App"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogDesc}
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            {isError?
                <Button onClick={handleClose} color="primary" autoFocus>
                 OK
                </Button>
                :<div>
                  <Button onClick={handleAcceptShow} color="secondary">
                     show the hint and reduce {hintHours} hours
                  </Button>
                  <Button onClick={handleClose} color="" autoFocus>
                    Cancel
                  </Button>
                </div> }

          </DialogActions>
        </Dialog>
    )
  }
  if (revealed) {
    return <HintText />;
  } else {
    return <HintButton />;
  }
};

export default HintComponent;

HintComponent.propTypes = {
  hintID: PropTypes.string,
  revealed: PropTypes.bool,
};
