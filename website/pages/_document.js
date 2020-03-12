/* eslint-disable jsx-a11y/media-has-caption */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// NOTE: _document.js is only rendered on server.
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <title>Datacampsets - DataCamp Datasets</title>
          <meta name="description" content="View and download all DataCamp datasets." />
          <link
            async
            href="https://fonts.googleapis.com/css?family=Lato&display=optional"
            rel="stylesheet"
          />
          <style>
            {`html, body {
                background: #EFF2F6;
                height: 100%;
                min-height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                overflow-x: hidden;
                overflow-y: auto;

                * {
                  -webkit-overflow-scrolling: touch;
                }
              }`}
          </style>
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
