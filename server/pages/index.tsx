import Layout from '../components/layout';
import withAuth from '../hocs/withAuth';

const Home = () => {
  return <Layout></Layout>;
};

export default withAuth(Home);
