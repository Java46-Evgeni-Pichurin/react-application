import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,Button } from "@mui/material";
import React from "react";
type Props =  {
    open: boolean;
    title: string;
    content: string | JSX.Element;
    confirmHandler?: (flag: boolean)=>void
}
const ActionConfirmation: React.FC<Props> = ({open, title, content, confirmHandler}) => {
  let buttons = <></>
    if (confirmHandler) {
      buttons = <DialogActions>
      <Button onClick={() => confirmHandler(false)}>Cancel</Button>
      <Button onClick={() => confirmHandler(true)} autoFocus>
        OK
      </Button>
    </DialogActions>
    }
    return <Dialog
    open={open}
    
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    {buttons}

  </Dialog>

}
export default ActionConfirmation