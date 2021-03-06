import React from "react";
import { withApollo } from "../graphql/client";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { getErrorMessage } from "../lib/form";
//import { useRouter } from "next/router";
import { Form, Input, Button, Checkbox } from "antd";
import Layout from "../components/Layout";
const SignUpMutation = gql`
  mutation SignUpMutation($name: String!, $email: String!, $password: String!) {
    signUp(input: { name: $name, email: $email, password: $password }) {
      email
      name
    }
  }
`;

function SignUp() {
  const [signUp] = useMutation(SignUpMutation);
  const [errorMsg, setErrorMsg] = React.useState();
  //const router = useRouter();

  async function handleSubmit(values: any) {
    try {
      await signUp({
        variables: values,
      });
      console.log("values");
      //router.push("/signin");
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <Layout title={"Sign Up"}>
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
        <h1>Sign Up</h1>
        {errorMsg && <p>{errorMsg}</p>}
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder={"Name"} />
        </Form.Item>
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
          <Input placeholder={"Email"} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder={"Password"} />
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

export default withApollo(SignUp);
