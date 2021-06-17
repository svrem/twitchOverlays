import {
  Card,
  Backdrop,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../services/firebase";
import { useState } from "react";

initFirebase();

const useStyles = makeStyles({
  root: {
    background: "#323232",
    width: "600px",
    minHeight: 40,
    margin: "auto",
    color: "white",
    padding: "60px 10px",
    marginTop: 50,
  },
  input: {
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
    "&::before": {
      color: "white",
    },
    color: "white",
    "&::before": {
      color: "white",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    height: 50,
    alignSelf: "center",
    width: "90%",
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    marginLeft: 30,
    marginTop: 10,
  },
  body: {
    overflowY: "none",
  },
  loading: {
    zIndex: 100,
  },
});

const index = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = (email, password) => {
    setLoading(true);
    const creds = firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((creds) => {
        console.log("wow");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        setErrorMessage("Email or password is incorrect.");
      });
  };
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // TODO: handle user router
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const [email, password, _] = e.target.querySelectorAll("input");

    loginUser(email.value, password.value);
  };

  return (
    <>
      <Backdrop className={classes.loading} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Card className={classes.root}>
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          autoComplete="off"
        >
          <TextField
            required
            name="email"
            type="email"
            InputLabelProps={{
              style: { color: "grey" },
            }}
            className={classes.input}
            InputProps={{
              style: { color: "white" },
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            InputLabelProps={{
              style: { color: "grey" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            required
            name="password"
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Typography className={classes.errorMessage} variant="subtitle1">
            {errorMessage}
          </Typography>
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Log in
          </Button>
        </form>
      </Card>
    </>
  );
};

export default index;
