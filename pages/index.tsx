import React, { useEffect } from "react";
import { withApollo } from "../graphql/client";
import Layout from "../components/Layout";
import cookies from "next-cookies";
import gql from "graphql-tag";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
const GET_AUTHED_USER = gql`
  query getUserWithToken($token:String!) {
    getUserWithToken(token:$token){
      isLoggedIn
    name
      email
      token
    }
    
  }
`;
const Index = (props: any) => {
  let tempToken =props && props.token!=null ? props.token : " "
  const { data } = useQuery(GET_AUTHED_USER, {
    variables: { token: tempToken },
  });
  const client = useApolloClient();
  useEffect(() => {
    if (props && props.token && data && data.getUserWithToken) {
      client.writeData({
        data: {
          isLoggedIn: true,
          name: data.getUserWithToken.name,
          email: data.getUserWithToken.email,
          token: data.getUserWithToken.token,
        },
      });
    }
  }, [props]);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column"
        }}
      >
        <h1>Welcome</h1><br/>
        <h3>{data && data.getUserWithToken && props.token ? data.getUserWithToken.name : null}</h3>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async (ctx: any) => {
  return {
    token: cookies(ctx).token || "",
  };
};
export default withApollo(Index);
