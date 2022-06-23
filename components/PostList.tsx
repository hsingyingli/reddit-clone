import {Box} from '@chakra-ui/react'
import React from 'react'
import Post from './Post';
import { PostType } from '../@types/post'

interface Props {
  posts: Array<PostType>;
  }

const PostList:React.FC<Props> = ({posts}) => {
  return (
    <Box>
      {posts.map((post)=> {
        return <Post key={post.id} post={post}/>
        })}
    </Box>
  )
  }

  export default PostList
