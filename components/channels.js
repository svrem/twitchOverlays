import { Button, TextField } from "@material-ui/core";

const checkIfSpace = (e) => {
  e.target.value = e.target.value.replace(" ", "");
};

const channels = ({ classes, error, errorMessage, handleSubmit }) => {
  return (
    <form
      autoComplete="off"
      spellCheck="false"
      onSubmit={handleSubmit}
      className={classes.channels}
    >
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
        // onClick={handleClick}
        type="submit"
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </form>
  );
};

export default channels;
