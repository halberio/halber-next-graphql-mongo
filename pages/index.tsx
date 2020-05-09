import { withApollo } from "../graphql/client";
import Layout from "../components/Layout";
const Index = () => {
 

  return <Layout>
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <h1>Welcome</h1>
    </div>
  </Layout>;
};

export default withApollo(Index);
