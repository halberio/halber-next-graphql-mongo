import React from "react";
import { UserContext } from "../contexts/UserContextProvider";
import Link from "next/link";
export const Header = () => {
  return (
    <UserContext.Consumer>
      {({state}:any)  => <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
         
          {state && state.user && state.user.email? state.user.email :  <nav>
            <Link href="/login">
              <a>Login</a>
            </Link>{" "}
            |{" "}
            <Link href="/signup">
              <a>Signup</a>
            </Link>
       
          </nav>}
        </div>}
    </UserContext.Consumer>
  );
};
