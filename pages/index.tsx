import type { NextPage } from 'next';
import Layout from "../src/components/Layout";
import { NavContextProvider } from "../src/providers/Navigation";
import { UserContextProvider } from "../src/providers/User";
import { PlacesProvider } from "../src/providers/Places";
import { ViewProvider } from "../src/providers/Navigation/views";
import App from "../src/app";

const Home: NextPage = () => {
    const loggingTag = `[Home]`;

    console.info(`${loggingTag} render`);

    return (
        <UserContextProvider>
            <NavContextProvider>
                <ViewProvider>
                    <PlacesProvider>
                        <Layout>
                         <App/>
                        </Layout>
                    </PlacesProvider>
                </ViewProvider>
            </NavContextProvider>
        </UserContextProvider>
    )
}

export default Home;
