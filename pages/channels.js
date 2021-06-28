import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import AppDrawer from "../components/appDrawer";
import {
  Typography,
  CircularProgress,
  Backdrop,
  Card,
} from "@material-ui/core";
import { useRouter } from "next/router";
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
    background: "#9146ff",
    "&:hover": {
      background: "#743ac9",
    },
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

export default function Hook() {
  const classes = useStyles();
  const router = useRouter();

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user && user.emailVerified) {
      setUser(user);
      // setChannels(await getChannels());
    } else {
      setUser(true);
      // router.push("/");
    }
  });

  const deleteChannel = (row) => {
    let copy = [...channels];
    const index = copy.indexOf(row);
    copy.splice(index, 1);
    setChannels(copy);
    updateChannels(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const target = document.getElementsByName("name")[0];
    try {
      const res = await axios.get(`/api/user/${target.value}`);
      if (checkIfIn(res.data.users[0].display_name, channels)) {
        setError(true);
        setErrorMessage("Channel already added");
      } else {
        let copy = [...channels];
        copy.push({ name: res.data.users[0].display_name });

        target.value = "";
        // document.focus();
        // document.activeElement.blur();
        target.focus();
        setChannels(copy);
        updateChannels(copy);
        setError(false);
        setErrorMessage("");
      }
    } catch (e) {
      setError(true);
      setErrorMessage("Couldn't find channel");
    }

    setLoading(false);
  };

  const updateChannels = async (channels) => {
    const id = await firebase.auth().currentUser.getIdToken();

    const newChannels = [];

    channels.forEach((channel) => {
      newChannels.push(channel.name);
    });

    const res = await axios.post(
      "../api/updateChannels",
      { channels: newChannels },
      {
        headers: {
          Authorization: id,
        },
      }
    );
  };

  useEffect(async () => {
    if (user) {
      if (!user.emailVerified) {
        alert("To activate your account please verify your email.");
        router.push("/");
      }
      setLoading(true);
      const data = await getChannels();
      console.log(data);
      if (!data) {
        setLoading(false);
        // router.push("/");

        return;
      }
      const newChannels = [];
      data?.forEach((channel) => {
        newChannels.push({ name: channel });
      });
      setChannels(newChannels);
      setLoading(false);
    } else if (user === true) {
      router.push("/");
    }
  }, [user]);
  const getChannels = async () => {
    try {
      const id = await user.getIdToken();
      const res = await axios.get(
        "../api/getChannels",

        {
          headers: {
            Authorization: id,
          },
        }
      );
      return res.data;
    } catch {}
  };

  return (
    <>
      <AppDrawer current="My Channels" />
      <Backdrop className={classes.loading} open={loading}>
        <CircularProgress />
      </Backdrop>
      <Typography className={classes.title} variant="h4" component="h2">
        My Channels
      </Typography>
      <Card className={classes.root}>
        <Channels
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          error={error}
          classes={classes}
        />
        <Table rows={channels} deleteChannel={deleteChannel} />
      </Card>
    </>
  );
}
