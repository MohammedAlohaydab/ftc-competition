import {
  Box,
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

const HintComponent = ({ hintID, revealed, hintText }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAcceptShow = async () => {
    const addOne = firebase.firestore.FieldValue.increment(1);

    let doc = await firebase.firestore().collection("hint").doc("hints").get();

    let curHints = doc.data()["hints"];

    if (curHints[hintID]["shown"] == true) return;
    curHints[hintID]["shown"] = true;
    firebase
      .firestore()
      .collection("hint")
      .doc("hints")
      .set({ lastHint: addOne, hints: curHints }, { merge: true })
      .catch((err) => {
        alert(err);
      });
    reduceDateEndTime();
  };
  const reduceDateEndTime = () => {};

  const HintText = () => {
    return (
      <Typography gutterBottom variant="h5" component="h2">
        اظهار التلميح رقم: {hintID + 1}
      </Typography>
    );
  };
  // before showing
  const HintButton = () => {
    return (
      <div>
        <Button
          style={{ margin: "10px", borderRadius: 15 }}
          variant="outlined"
          color="inherit"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            اظهار التلميح رقم: {hintID + 1}
          </Typography>
        </Button>
        <Dialog
          className="App"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"اظهار التلميح"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              اظهار هذا التلميح سياخذ من الوقت المتبقي لجميع اللاعبين, هل انت
              متاكد؟
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAcceptShow} color="primary">
              اظهار التمليح
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              اخفاء التلميح
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

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
