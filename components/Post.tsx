import {
  Box,
  Text,
  Heading,
  useColorModeValue,
  HStack,
  IconButton,
  VStack,
  Button,
} from '@chakra-ui/react';
import {TriangleDownIcon, TriangleUpIcon, ChatIcon} from '@chakra-ui/icons';
import React, {useState, useEffect} from 'react';
import {PostType} from '../@types/post';
import useAuth from '../hooks/useAuth';
import {supabase} from '../lib/supabase-client';

interface Props {
  post: PostType;
}

const Post: React.FC<Props> = ({post}) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [comments, setComments] = useState<any[] | null>([]);
  const {authState} = useAuth();
  const handleVote = async (up: boolean) => {
    const userId = authState.user?.id || '';
    if (up) {
      if (!currentPost.vote.includes(userId)) {
        const {data, error} = await supabase
          .from('posts')
          .update({
            vote: [...currentPost.vote, userId],
          })
          .match({id: currentPost.id});
        if (error) throw error;
        setCurrentPost((prev) => ({...prev, vote: data[0].vote}));
      }
    } else {
      if (currentPost.vote.includes(authState.user?.id as string)) {
        // update
        const {data, error} = await supabase
          .from('posts')
          .update({
            vote: currentPost.vote.filter((id) => id != userId),
          })
          .match({id: currentPost.id});
        if (error) throw error;
        setCurrentPost((prev) => ({...prev, vote: data[0].vote}));
      }
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const {data, error} = await supabase
        .from('comment')
        .select(`context`)
        .match({post_id: post.id});
      if (data) {
        setComments(data);
      }
    };
    getComments();
  }, [post]);
  return (
    <Box
      my={5}
      bgColor={useColorModeValue('gray.50', 'gray.600')}
      p={5}
      rounded="md"
      boxShadow="md"
      _hover={{
        borderColor: `${useColorModeValue('gray.300', 'white')}`,
        borderWidth: 1,
      }}
    >
      <HStack gap={1} alignItems="start">
        <VStack>
          <IconButton
            isDisabled={!authState.isAuth}
            size="xs"
            aria-label="up vote"
            icon={<TriangleUpIcon />}
            onClick={() => handleVote(true)}
          />
          <Text>{currentPost.vote.length}</Text>
          <IconButton
            isDisabled={!authState.isAuth}
            size="xs"
            aria-label="down vote"
            icon={<TriangleDownIcon />}
            onClick={() => handleVote(false)}
          />
        </VStack>
        <Box>
          <Heading size="lg" mb={2}>
            {currentPost.title}
          </Heading>
          <Text as="pre" my={2} maxH="xs" overflowY="hidden">
            {currentPost.content}
          </Text>
          <Button leftIcon={<ChatIcon />} size="sm" variant="ghost">
            <Text>{comments?.length} comments</Text>
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default Post;
