import {
  Card,
  TextField,
  Button,
  Typography,
  Link,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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
    "& form": {
      display: "flex",
      flexDirection: "column",
    },
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
    ":-webkit-autofill": {
      background: "blue",
    },
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
  signUpLink: {
    marginTop: 10,
    width: "calc(100% - 60px)",
    left: 0,
    right: 0,
    margin: "auto",
  },
});

const signUp = () => {
  const classes = useStyles();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const [email, password, password2] = e.target.querySelectorAll("input");
    if (password.value != password2.value) {
      setErrorMessage("Passwords are not the same.");
      return;
    }
    const res = await axios.post("../api/register", {
      email: email.value,
      password: password.value,
    });
    if (res.data.message) setErrorMessage(res.data.message);
    else {
      setTimeout(async () => {
        alert("Don't forget to active your account by verifying your email!");
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        console.log(user);
        router.push("/");
      }, 200);
    }
    setLoading(false);
  };

  return (
    <>
      <Backdrop style={{ zIndex: 100 }} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Card className={classes.root}>
        <form onSubmit={handleSubmit} autoComplete="off">
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
            required
            name="email"
            type="Password"
            InputLabelProps={{
              style: { color: "grey" },
            }}
            className={classes.input}
            InputProps={{
              style: { color: "white" },
            }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <TextField
            required
            name="email"
            type="password"
            InputLabelProps={{
              style: { color: "grey" },
            }}
            className={classes.input}
            InputProps={{
              style: { color: "white" },
            }}
            id="outlined-basic"
            label="Repeat Password"
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
            Sign Up
          </Button>
        </form>
        <Typography variant="body1" className={classes.signUpLink}>
          Already have an account? Login{" "}
          <Link href="/" color="primary">
            here
          </Link>
          !
        </Typography>
      </Card>
    </>
  );
};

export default signUp;
