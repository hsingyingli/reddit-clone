import {useEffect} from 'react';
import type {GetServerSideProps, NextPage} from 'next';
import useAuth from '../hooks/useAuth';
import {supabase} from '../lib/supabase-client';

interface Props {
  posts: Object;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const {data, error} = await supabase.from('posts').select('*');

  return {
    props: {posts: data},
  };
};

const Home: NextPage<Props> = ({posts}) => {
  const {authState, handleUserLogout} = useAuth();
  useEffect(() => {
    const subscription = supabase
      .from('posts')
      .on('INSERT', (payload) => {
        console.log(payload);
      })
      .subscribe();

    return () => supabase.removeSubscription(subscription);
  }, []);
  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
      <pre>{JSON.stringify(authState, null, 2)}</pre>
    </div>
  );
};

export default Home;
