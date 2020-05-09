import React from "react";
import { withApollo } from "../graphql/client";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { getErrorMessage } from "../lib/form";
//import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatchUser } from "../contexts/UserContextProvider";
const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      userId
      token
      tokenExpiration
    }
  }
`;

function Login() {
  const [Login] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  //@ts-ignore
  const { dispatch } = useDispatchUser();

  const handleSubmit = async (values: any) => {
    try {
      await Login({
        variables: values,
      }).then((data: any) => {
        if (data.data.login.token) {
          const user = {
            name: values.name,
            email: values.email,
            token: data.data.login.token,
          };
          dispatch({
            type: "SET_USER",
            user: user,
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
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
}

export default withApollo(Login);
