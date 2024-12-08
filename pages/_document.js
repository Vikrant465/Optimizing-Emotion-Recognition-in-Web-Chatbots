import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Ensure ResponsiveVoice Script is added correctly */}
        <script
          src="https://code.responsivevoice.org/responsivevoice.js?key=kAGcZKWy"
          async
        ></script>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
