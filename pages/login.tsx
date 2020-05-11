import React from "react";
import { withApollo } from "../graphql/client";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { getErrorMessage } from "../lib/form";
import Layout from "../components/Layout";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatchUser } from "../contexts/UserContextProvider";

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        name
        email
        token
        tokenExpiration
      }
    }
  }
`;

const Login = () => {
  const [Login] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  const { dispatch } = useDispatchUser();
  const client = useApolloClient();
  const handleSubmit = async (values: any) => {
    try {
      await Login({
        variables: values,
      }).then((data: any) => {
        if (data.data.login.user) {
          dispatch({
            type: "LOGIN_REQUEST",
            user: {
              name: data.data.login.name,
              email: data.data.login.email,
              token: data.data.login.token,
            },
          });
          client.writeData({
            data: {
              isLoggedIn: true,
              name: data.data.login.user.name,
              email: data.data.login.user.email,
              token: data.data.login.user.token,
            },
          });
        }
      });

      //router.push("/signin");
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  };
  
  return (
    <Layout title={"Login"}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmit}
        style={{
          maxWidth: "30rem",
          margin: "auto",
          marginTop: "10rem",
        }}
      >
        <h1>Login</h1>
        {errorMsg && <p>{errorMsg}</p>}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default withApollo(Login);
