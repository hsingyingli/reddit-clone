import type {GetServerSideProps, NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import useAuth from '../hooks/useAuth';
import {supabase} from '../lib/supabase-client';
import {Box} from '@chakra-ui/react';
import PostList from '../components/PostList';
import {PostType} from '../@types/post';
import PostModel from '../components/PostModel';

interface Props {
  posts: Array<PostType>;
}

const Home: NextPage<Props> = ({posts}) => {
  const [allPost, setAllPost] = useState(posts);
  console.log(allPost)

  return (
    <Box display="flex" flexDirection="row" w="100%" gap={10}>
      <Box maxW={{base: '100%', md: '600px'}} w="full">
        {/*create post*/}
        <PostModel />
        {/*Posts (infinite scroll)*/}
        <PostList posts={posts} />
      </Box>
      <Box display={{base: 'none', md: 'block'}}>Hello</Box>
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const {data: posts, error} = await supabase.from('posts').select('*');
  
  if (error) {
    throw error;
  }
  

  return {
    props: {posts: posts.sort((a, b)=> b.vote.length - a.vote.length)},
  };
};
