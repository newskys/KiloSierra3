import Layout from "@components/ui/Layout";
import { Avatar, Box, Button, Card, TextField, Typography } from "@material-ui/core";
import React from "react";
import AssignmentIcon from "@material-ui/icons/AssignmentInd";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: "16px",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },

  title: {
    textAlign: "center",
  },

  avatar_wrap: {
    color: "#FF1493",
    // padding: "16px 0 0 0",
  },

  avatar: {
    margin: "0 auto",
    backgroundColor: "#FF1493",
  },

  login_input: {
    margin: "16px 0 0 0",
  },

  signup: {
    margin: "16px 0 0 0",
    padding: "8px",
  },
});

const SignUpPage = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Layout useHeader={false}>
      <Box className={classes.root}>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h4"
          component="h2"
        >
          SIGN IN
        </Typography>
        <Box className={classes.avatar_wrap}>
          <Avatar className={classes.avatar}>
            <AssignmentIcon />
          </Avatar>
        </Box>

        <TextField
          fullWidth
          className={classes.login_input}
          variant="outlined"
          label="ID *"
          margin="normal"
        />
        <TextField
          fullWidth
          className={classes.login_input}
          variant="outlined"
          label="Password *"
          margin="normal"
          type="password"
        />
        <TextField
          fullWidth
          className={classes.login_input}
          variant="outlined"
          label="Confirm Password *"
          margin="normal"
          helperText="Incorrect entry."
          type="password"
        />
        <TextField
          fullWidth
          className={classes.login_input}
          variant="outlined"
          label="Email *"
          margin="normal"
          helperText="Incorrect entry."
        />
        <TextField
          error
          fullWidth
          className={classes.login_input}
          variant="outlined"
          label="Phone Number *"
          margin="normal"
          helperText="Incorrect entry."
        />
        <Button className={classes.signup} fullWidth variant="contained" color="primary">SIGN UP</Button>
      </Box>
    </Layout>
  );
};

export default SignUpPage;
