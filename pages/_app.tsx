import type {AppProps} from 'next/app';
import React from 'react';
import Chakra from '../components/Chakra';
import Layout from '../components/Layout';
import AuthProvider from '../store/providers/AuthProvider';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Chakra>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Chakra>
  );
}

export default MyApp;
