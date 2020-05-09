import * as React from "react";
import Head from "next/head";
type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
}) => {
  
  return (<div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    
    <section
      style={{
        minHeight: "calc(100vh - 10rem)",
      }}
    >
      {children}
    </section>
    <footer></footer>
  </div>)
}

export default Layout;
