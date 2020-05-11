import React from "react";

import { useQuery ,useMutation} from "@apollo/react-hooks";
import { withApollo } from "../graphql/client";
import gql from "graphql-tag";
import { Button } from "antd";
import Link from "next/link";
const IS_LOGGED_IN = gql`
  query authUser {
    isLoggedIn
    name
      email
      token
  }
`;
const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout 
  }
`;
const Header = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  const [logout] = useMutation(LOGOUT_MUTATION);

  const logouAction =async ()=>{
    await logout();
  }
  return (
    <div className="header" style={{ padding: "1rem" }}>
      {data && data.isLoggedIn ? (
        <div>
          <p>{data.name}</p>
          <Button onClick={logouAction}>Logout</Button>
        </div>
      ) : (
        <nav>
          <Link href="login">
            <a>Login</a>
          </Link>{" "}
          |
          <Link href="signup">
            <a>Singup</a>
          </Link>
        </nav>
      )}
    </div>
  );
};
export default withApollo(Header);
