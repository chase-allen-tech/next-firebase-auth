import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../utils/auth";

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    signUp({ email: data.email, pass: data.password });
  };

  const signUp = ({ email, pass }) => {
    auth
      .signup(email, pass)
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Head>
        <title>Sign Up Next Auth</title>
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
            Sign Up
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
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                router.push("/login");
              }}
            >
              Log In
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
