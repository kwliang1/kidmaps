import type { NextPage } from 'next';
import Layout from "../src/components/Layout";
import App from "../src/app";
import {LocationProvider} from "../src/providers/Location";

const Home: NextPage = () => {
    const loggingTag = `[Home]`;

    console.info(`${loggingTag} render`);

    return (
        <Layout>
            {typeof window !== "undefined" ? (
                <LocationProvider>
                    <App/>
                </LocationProvider>
            ):(
                <App/>
            )}

        </Layout>
    )
}

export default Home;
