// overide next App gloabally with this _app file
// importing global styling here. 😀
import React from "react";
import { AppProps } from "next/app";
//stylesheets import
import "../stylesheets/theme.less";
import { UserContextProvider } from "../contexts/UserContextProvider";
import Header from "../components/Header";
function Application({ Component, pageProps, router }: AppProps) {
  
  
  return (
    <UserContextProvider>
      <Header/>
      <Component {...pageProps} key={router.route} />
    </UserContextProvider>
  );
}

export default Application;
