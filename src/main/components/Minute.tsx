import * as React from "react";

import { StyleRulesCallback, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import Paper from '@material-ui/core/Paper';

import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import StopIcon from "@material-ui/icons/Stop";

import MinuteModel from "models/Minute";
import Speech from "models/Speech";
import MinuteDeleteDialog from "components/MinuteDeleteDialog";

interface StateProps {
  minute?: MinuteModel;
}

export interface DispatchProps {
  recStart: Function;
  recStop: Function;
  clearMinute: Function;
}

function MinuteComponent(props: StateProps & DispatchProps & WithStyles) {
  const { minute } = props;
  const { recStart, recStop, clearMinute } = props;
  const { classes } = props;
  const [ deleteDialogOpened, setDeleteDialogOpened ] = React.useState(false);
  return (
    <div>
      <Paper className={classes.notice} elevation={1}>
        データはブラウザのLocalStorageに保存されます
      </Paper>
      <Button color="secondary" onClick={() => recStart()}><KeyboardVoiceIcon className={classes.leftIcon} />Rec Start</Button>
      <Button onClick={() => recStop()}><StopIcon className={classes.leftIcon} />Rec Stop</Button>
      <Button onClick={() => setDeleteDialogOpened(true)}><DeleteIcon className={classes.leftIcon} />Clear</Button>
      <MinuteDeleteDialog close={() => setDeleteDialogOpened(false)} opened={deleteDialogOpened} deleteMinute={clearMinute} />
      <ul>
        {minute && minute.speechList.map((x: Speech) =>
          <li key={x.timestamp}>{x.selectedRecognition}</li>
        )}
      </ul>
    </div>
  );
}


const styles: StyleRulesCallback<string> = theme => ({
  "root": {
    "width": "100%"
  },
  "leftIcon": {
    "marginRight": theme.spacing.unit
  },
  "notice": {
    "margin": theme.spacing.unit,
    "padding": theme.spacing.unit,
    "font-size": 16
  }
});

export default withStyles(styles)(MinuteComponent);
