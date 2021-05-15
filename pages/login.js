import { Button, TextField, Grid, Typography, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/auth";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {
  const auth = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState([false, ""]);
  const { register, handleSubmit, errors } = useForm();

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen([false]);
  };

  const onSubmit = (data) => {
    signIn({ email: data.email, pass: data.password });
  };

  const signIn = ({ email, pass }) => {
    auth
      .signin(email, pass)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        setOpen([true, `${err.message}`]);
      });
  };

  return (
    <div>
      <Head>
        <title>Log In Next Auth</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Typography variant="h3" component="h1">
            Log In
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={errors.email?.message && true}
              inputRef={register({
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "Not an email",
                },
              })}
              helperText={errors.email?.message && errors.email.message}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              error={errors.password?.message && true}
              inputRef={register({
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 chareacters",
                },
                maxLength: { value: 70, message: "no more than 70 characters" },
              })}
              helperText={errors.password?.message && errors.password.message}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
            />
            <Button
              style={{ marginTop: "1rem", marginBottom: "1.5rem" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Log In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Sign Up
            </Button>
            <Snackbar open={open[0]} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {open[1]}
              </Alert>
            </Snackbar>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
