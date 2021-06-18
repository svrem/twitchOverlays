import {
  Card,
  Backdrop,
  CircularProgress,
  TextField,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import EmailLogin from "../components/emailLogin";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../services/firebase";

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
  Divider: {
    marginTop: 20,
    width: "calc(100% + 60px)",
    left: 0,
    right: 0,
    // background:"",
    transform: "translateX(-30px)",
    margin: "auto",
  },
  or: {
    background: "blue",
    width: "max-content",
    padding: "0px 20px",
    textAlign: "center",
    right: 0,
    left: 0,
    margin: "auto",
    transform: "translateY(-14px)",
    background: "#323232",
    height: 40,
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
        <EmailLogin
          classes={classes}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
        />
        <Divider className={classes.Divider} />
        <Typography variant="subtitle1" className={classes.or}>
          or sign in with
        </Typography>
      </Card>
    </>
  );
};

export default index;
