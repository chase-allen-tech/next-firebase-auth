import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import { ProvideAuth } from "../utils/auth";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ProvideAuth>
  );
}

export default MyApp;
