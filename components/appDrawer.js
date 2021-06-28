import {
  IconButton,
  SwipeableDrawer,
  Avatar,
  List,
  ListItem,
  Divider,
  ListItemText,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import MenuButton from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../services/firebase";

initFirebase();

const useStyles = makeStyles({
  iconButton: {
    fill: "#9146ff",
    // width: 10,
    // height: 10,
    margin: 15,
    position: "absolute",
    top: 0,
    left: 0,
    width: 35,
    height: 35,
  },
  icon: {
    left: 100,

    width: 35,
    height: 35,
    fill: "white",
    fill: "#9146ff",
  },
  list: {
    width: "250px",
  },
  drawer: {
    // background: "#575757",
    background: "#9146ff",
    color: "white",
  },
  user: {
    position: "absolute",
    bottom: 0,
    // padding: 10,
    boxSizing: "border-box",
    display: "flex",
    "& hr": {
      width: "100%",
      transform: "translateY(-5px)",

      position: "absolute",
    },
    "& div, button": {
      marginLeft: 10,
      transform: "translateY(2.5px)",
    },
  },
  button: {
    color: "white",
  },
});

const links = {
  "My Apps": "apps",
  "My Channels": "channels",
  Community: "community",
};

const appDrawer = ({ avatarPicture, current }) => {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      <IconButton className={classes.iconButton} onClick={() => setOpen(true)}>
        <MenuButton color="action" className={classes.icon} />
      </IconButton>
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        anchor={"left"}
        open={open}
        // className={classes.drawer}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <List className={classes.list}>
          {["My Apps", "My Channels", "Community"].map((text, index) => (
            <Link href={`/${links[text]}`}>
              <ListItem disabled={current === text} button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <List className={`${classes.list} ${classes.user}`}>
          <Divider />
          <Avatar
            alt="Cindy Baker"
            src={firebase.auth().currentUser?.photoURL}
          />
          <Button
            onClick={(e) => setAnchor(e.currentTarget)}
            className={classes.button}
          >
            {firebase.auth().currentUser?.displayName ||
              firebase.auth().currentUser?.email.split("@")[0]}
          </Button>
          <Menu
            onClose={() => setAnchor(null)}
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem
              onClick={async () => {
                await firebase.auth().signOut();
                router.push("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default appDrawer;
