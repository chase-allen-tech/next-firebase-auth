import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Box, Grid, Typography, Button } from "@material-ui/core";
import { useAuth } from "../utils/auth";
import WithAuth from "../components/withAuth";

function Home() {
  const auth = useAuth();
  const router = useRouter();

  const logOut = () => {
    auth
      .signout()
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Head>
        <title>Next Auth</title>
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
        <Typography variant="h2" component="h1">
          Secret
        </Typography>
        <Button
          color="secondary"
          onClick={() => {
            router.push("/login");
          }}
        >
          Log In Page
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Sign Up Page
        </Button>
        <Box>
          <Button color="primary" variant="contained" onClick={logOut}>
            Log Out
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default WithAuth(Home);
