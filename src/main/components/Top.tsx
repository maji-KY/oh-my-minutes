import * as React from "react";
import * as moment from "moment";

import { Form, Field } from "react-final-form";

import { StyleRulesCallback, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

import MinuteIndex from "models/MinuteIndex";

interface StateProps {
  minuteList: MinuteIndex[];
}

export interface DispatchProps {
  createNewMinute: Function
}

const required = value => value && value.trim() ? undefined : "Required";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function TopComponent(props: StateProps & DispatchProps & WithStyles) {
  const { classes } = props;
  const { minuteList } = props;
  const { createNewMinute } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.notice} elevation={1}>
        Chromeでのみ動作します
      </Paper>
      <Form
        onSubmit={(x: any, { reset }) => {
          console.log(x);
          createNewMinute(x.title);
          reset();
        }}
        initialValues={{ "title": "" }}
        render={({ handleSubmit, reset, submitting, pristine, invalid, values }) =>
          <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
            <Field
              name="title"
              validate={required}
            >
              {({ input, meta }) =>
                <TextField
                  {...input}
                  label={!pristine && invalid ? meta.error : "New Minute Name"}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  error={!pristine && invalid}
                />

              }
            </Field>
            <Button className={classes.button} type="submit" variant="outlined" disabled={pristine || invalid}>Add</Button>
          </form>
        }
      />
      <List>
        {minuteList.map((x: MinuteIndex) =>
          <ListItemLink key={x.timestamp} href={`#/minute/${x.title}`}>
            <Avatar>
              <LibraryBooksIcon />
            </Avatar>
            <ListItemText primary={x.title} secondary={moment(x.timestamp).format("YYYY/MM/DD(ddd)\n HH:mm:ssZ")} />
          </ListItemLink>
        )}
      </List>
    </div>
  );
}

const styles: StyleRulesCallback<string> = theme => ({
  "root": {
    "width": "100%"
    // "maxWidth": 800,
  },
  "container": {
    "display": "flex",
    "flexWrap": "wrap"
  },
  "textField": {
    "marginLeft": theme.spacing.unit,
    "marginRight": theme.spacing.unit
  },
  "button": {
    "marginTop": theme.spacing.unit,
    "marginBottom": theme.spacing.unit
  },
  "notice": {
    "margin": theme.spacing.unit,
    "padding": theme.spacing.unit,
    "font-size": 16
  }
});

export default withStyles(styles)(TopComponent);
