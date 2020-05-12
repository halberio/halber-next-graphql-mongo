import React, {useEffect,  useContext } from "react";
import { withApollo } from "../graphql/client";
import Layout from "../components/Layout";
import cookies from "next-cookies";
import { useQuery } from "@apollo/react-hooks";
import { UserContext,useDispatchUser } from '../contexts/UserContextProvider';
import gql from "graphql-tag";

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
  const {state} = useContext(UserContext);
  const { dispatch } = useDispatchUser();
  const { data } = useQuery(GET_AUTHED_USER, {
    variables: { token: tempToken },
  });
  useEffect(()=>{
    if(tempToken && data){
      dispatch({
        type: "LOGIN_REQUEST",
        user: {
          name: data.getUserWithToken.name,
          email: data.getUserWithToken.email,
          token: data.getUserWithToken.token,
        },
      });
    }
  },[data, tempToken])
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
        <h3>{tempToken  && state && state.user ? state.user.name : null}</h3>
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
