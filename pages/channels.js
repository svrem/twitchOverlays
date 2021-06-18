import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Backdrop,
  Card,
} from "@material-ui/core";
import Channels from "../components/channels";
import Table from "../components/TableTest";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../services/firebase";

initFirebase();

const useStyles = makeStyles({
  channels: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    background: "#323232",
    width: "600px",
    minHeight: 40,
    margin: "auto",
    color: "white",
    // height: 32,
    padding: "50px 10px",
    // paddingBottom: "100px",
  },
  title: {
    marginBottom: "10px",
    color: "white",
    textAlign: "center",
  },
  button: {
    right: 0,
    position: "relative",
    top: 0,
    bottom: 0,
    marginLeft: "20px",
    height: 50,
    // margin: "auto",
    // left: "65%",
  },
  field: {
    height: 50,

    color: "white",
    width: "400px",
    marginTop: "-10px",
  },

  input: {
    "&::before": {
      // backgroundColor: "white",
      color: "white",
    },
    color: "white",
    "&::before": {
      color: "white",
    },
  },

  loading: {
    zIndex: 100,
  },
});

const checkIfIn = (name, channels) => {
  let bad = false;
  channels.forEach((item) => {
    if (item.name === name) bad = true;
  });
  return bad;
};

const getChannels = async () => {
  try {
    const id = await firebase.auth().currentUser.getIdToken();
    const res = await axios.get(
      "../api/getChannels",

      {
        headers: {
          Authorization: id,
        },
      }
    );
  } catch {}
};

export default function Hook() {
  const classes = useStyles();

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      getChannels();
    } else {
      console.log("no user");
    }
  });

  const deleteChannel = (row) => {
    let copy = [...channels];
    const index = copy.indexOf(row);
    copy.splice(index, 1);
    setChannels(copy);
  };

  const handleClick = async () => {
    setLoading(true);
    const target = document.getElementsByName("name")[0];
    try {
      const res = await axios.get(`/api/user/${target.value}`);
      if (checkIfIn(res.data.users[0].display_name, channels)) {
        setError(true);
        setErrorMessage("Channel already added");
      } else {
        let copy = [...channels];
        console.log(copy);
        copy.push({ name: res.data.users[0].display_name });

        target.value = "";
        // document.focus();
        // document.activeElement.blur();
        target.focus();
        setChannels(copy);
        setError(false);
        setErrorMessage("");
      }
    } catch (e) {
      console.log(e);
      setError(true);
      setErrorMessage("Couldn't find channel");
    }

    setLoading(false);
  };

  // useEffect(() => {
  //   getChannels();
  // }, []);

  return (
    <>
      <Backdrop className={classes.loading} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Typography className={classes.title} variant="h4" component="h2">
        Channels
      </Typography>
      <Card className={classes.root}>
        <Channels
          handleClick={handleClick}
          errorMessage={errorMessage}
          error={error}
          classes={classes}
        />
        <Table rows={channels} deleteChannel={deleteChannel} />
      </Card>
    </>
  );
}
