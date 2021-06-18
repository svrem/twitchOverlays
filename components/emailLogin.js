import { TextField, Typography, Button } from "@material-ui/core";

const emailLogin = ({ classes, handleSubmit, errorMessage }) => {
  return (
    <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
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
  );
};

export default emailLogin;
