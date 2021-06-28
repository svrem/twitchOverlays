import { Grid, Card, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";

const useStyles = makeStyles({
  item: {
    width: 200,
    height: 200,
    background: "#323232",
  },
  addButton: {
    position: "relative",
    width: 100,
    height: 100,
    margin: "25% 25%",
    "& span svg": {
      fill: "#2196f3",
      width: "100%",
      height: "100%",
    },
  },
});

const grids = () => {
  const classes = useStyles();

  const [apps, setApps] = useState([]);

  const handleClick = (e) => {
    const newArray = [...apps];
    newArray.push("");
    setApps(newArray);
  };

  return (
    <Grid container justify="flex-start" spacing={2}>
      {apps.map((app) => {
        return (
          <Grid item>
            <Card className={classes.item}></Card>
          </Grid>
        );
      })}

      <Grid item>
        <Card className={classes.item}>
          <IconButton
            onClick={handleClick}
            title="Create App"
            className={classes.addButton}
          >
            <AddIcon />
          </IconButton>
        </Card>
      </Grid>
    </Grid>
  );
};

export default grids;
