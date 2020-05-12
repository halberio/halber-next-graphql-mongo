import React,{useContext} from "react";

import { useMutation} from "@apollo/react-hooks";
import { withApollo } from "../graphql/client";
import gql from "graphql-tag";
import { Button } from "antd";
import { UserContext } from '../contexts/UserContextProvider';
import Link from "next/link";

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout 
  }
`;
const Header = () => {
  const [logout] = useMutation(LOGOUT_MUTATION);
  const {state} = useContext(UserContext);
  const logouAction =async ()=>{
    await logout();
  }
  return (
    <div className="header" style={{ padding: "1rem" }}>
      {state && state.user ? (
        <div>
          <p>{state.user.name}</p>
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
