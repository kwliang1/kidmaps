import type { NextPage } from 'next';
import Layout from "../src/components/Layout";
import { UserContextProvider } from "../src/providers/User";
import App from "../src/app";

const Home: NextPage = () => {
    const loggingTag = `[Home]`;

    console.info(`${loggingTag} render`);

    return (
        <UserContextProvider>
            <Layout>
                <App/>
            </Layout>
        </UserContextProvider>
    )
}

export default Home;
