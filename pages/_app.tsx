import type {AppProps} from 'next/app';
import React, {useEffect, useState} from 'react';
import {supabase} from '../lib/supabase-client';
import useAuth from '../hooks/useAuth';
import Chakra from '../components/Chakra';
import Layout from '../components/Layout';
import AuthProvider from '../store/providers/AuthProvider';
import SupaProvider from '../store/providers/SupaProvider';

function MyApp({Component, pageProps}: AppProps) {

  return (
    <Chakra>
      <AuthProvider>
        <SupaProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SupaProvider>
      </AuthProvider>
    </Chakra>
  );
}

export default MyApp;
