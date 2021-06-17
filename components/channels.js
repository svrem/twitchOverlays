import { Button, TextField } from "@material-ui/core";

const checkIfSpace = (e) => {
  e.target.value = e.target.value.replace(" ", "");
};

const channels = ({ classes, error, errorMessage, handleClick }) => {
  return (
    <div className={classes.channels}>
      <TextField
        InputLabelProps={{
          style: { color: error ? "red" : "grey" },
        }}
        error={error}
        onChange={checkIfSpace}
        InputProps={{
          className: classes.input,
        }}
        className={classes.field}
        id={error ? "standard-error-helper-text" : "standard-basic"}
        label="Name"
        helperText={errorMessage}
        name="name"
      />
      <Button
        onClick={handleClick}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </div>
  );
};

export default channels;
