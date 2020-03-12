// This import is to try fix the weird next Link issue with css.
// c.f. https://github.com/zeit/next-plugins/issues/282
import "../static/empty.css";
import App, { Container } from "next/app";
import Router from "next/router";
import { AppProvider } from "../context/AppContext.tsx";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </Container>
    );
  }
}

export default MyApp;
