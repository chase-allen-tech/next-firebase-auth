import { useState, useEffect } from "react";
import { useAuth } from "../utils/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import { Grid, Typography } from "@material-ui/core";


const WithAuth = (Component) => {
  const WithAuthComponent = (props) => {
    const auth = useAuth();
    const { userId } = auth;
    const router = useRouter();
    const [user] = useState(userId);

    useEffect(() => {
      if (!userId) {
        router.replace("/login");
      }
    }, [userId]);

    if (!user) {
      return (
        <>
          <Head>
            <title>Redirecting to login</title>
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
              Redirecting...
            </Typography>
          </Grid>
        </>
      );
    }
    return <Component {...props} />;
  };

  return WithAuthComponent;
};

export default WithAuth;
