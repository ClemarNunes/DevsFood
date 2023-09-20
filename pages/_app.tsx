import { Layout } from '../components/Layout';
import '../styles/globals.css'
import { Session } from 'next-auth';
import  { SessionProvider }  from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store';



function MyApp({ Component, pageProps }: AppProps <{session: Session}>) {
 
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>  
      </SessionProvider>
      </Provider>
  );
}

export default MyApp



