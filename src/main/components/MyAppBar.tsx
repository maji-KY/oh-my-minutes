import * as React from "react";

import { StyleRulesCallback, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";


interface StateProps {
  minuteTitle: string
  isViewingMinute: boolean
}

export interface DispatchProps {
}

function MyAppBarComponent(props: StateProps & DispatchProps & WithStyles) {
  const { classes } = props;
  const { isViewingMinute, minuteTitle } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            { isViewingMinute ? <span><a href="#/"><ArrowBackIcon /></a>&nbsp;{minuteTitle}</span> : "Oh My Minutes(pre-alpha)" }
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const styles: StyleRulesCallback<string> = theme => ({
  "root": {
    // flexGrow: 1,
  }
});

export default withStyles(styles)(MyAppBarComponent);
