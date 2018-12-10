import * as React from "react";

import { StyleRulesCallback, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface StateProps {
  opened: boolean;
}

export interface DispatchProps {
  close: any;
  deleteMinute: any;
}

function MinuteDeleteDialogComponent(props: StateProps & DispatchProps & WithStyles) {
  const { opened } = props;
  const { close, deleteMinute } = props;
  return (
    <div>
      <Dialog
        open={opened}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this Minute.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>
            Cancel
          </Button>
          <Button onClick={() => {
            deleteMinute();
            close();
          }} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const styles: StyleRulesCallback<string> = theme => ({
});

export default withStyles(styles)(MinuteDeleteDialogComponent);
