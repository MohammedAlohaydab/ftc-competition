import React,{useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const ErrorDialog = () => {
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return(
        <Dialog
            className="App"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"خطأ"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    يبدو انك تحاول اظهار تلميح لاكن لايوجد وقت كافي!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    حسنا
                </Button>

            </DialogActions>
        </Dialog>
    )
}
export default ErrorDialog;