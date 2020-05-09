// overide next App gloabally with this _app file
// importing global styling here. 😀
import React from "react";
import { AppProps } from "next/app";
//stylesheets import
import "../stylesheets/theme.less";
import { UserContextProvider } from "../contexts/UserContextProvider";
function Application({ Component, pageProps, router }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} key={router.route} />
    </UserContextProvider>
  );
}

export default Application;
