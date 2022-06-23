import {
  Box,
  Avatar,
  Textarea,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import React, {useEffect, useState, useRef} from 'react';
import {supabase} from '../lib/supabase-client';
import useAuth from '../hooks/useAuth';
import useAvatar from '../hooks/useAvatar';
import {ProfileType} from '../@types/auth';
import {getProfile} from '../lib/auth';

const PostModel: React.FC = () => {
  const {authState} = useAuth();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast();
  const initialRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [isPublished, setIsPublished] = useState('0');
  const [content, setContent] = useState('');

  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const avatarUrl = useAvatar(profile?.avatar_url || '');

  const handleCreatePost = async (e: any) => {
    e.preventDefault();
    onClose();
    if (imageUrl.length > 0 && image) {
      let {error: uploadError} = await supabase.storage
        .from('post-img')
        .upload(imageUrl, image as any);

      if (uploadError) {
        setTitle('');
        setContent('');
        setIsPublished('0');

        toast({
          title: 'Post create fail.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        throw uploadError;
      }
    }

    const {data, error} = await supabase.from('posts').insert([
      {
        created_at: new Date(),
        content,
        title,
        owner_id: authState.user?.id,
        image: imageUrl.length > 0 ? imageUrl : null,
        is_published: isPublished === '0' ? false : true,
      },
    ]);

    setTitle('');
    setContent('');
    setIsPublished('0');

    if (error) {
      toast({
        title: 'Post create fail.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      throw error;
    }

    toast({
      title: 'Post created.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    window.location.reload()
  };
  const handleUploadImage = (event: any) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      setImage(file);
      setImageUrl(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const read = async () => {
      const {data, error} = await getProfile(authState?.user?.id || '');
      setProfile(data);
    };
    read();
  }, [authState]);

  return (
    <Box>
      <InputGroup>
        <InputLeftElement>
          {authState.isAuth ? (
            <Avatar size="sm" name={profile?.username} src={avatarUrl} />
          ) : (
            <Avatar size="sm" />
          )}
        </InputLeftElement>
        <Input
          rounded='full'
          type="text"
          onClick={onOpen}
          placeholder={
            authState.isAuth ? 'Create Post' : 'Login to Create Post'
          }
          value=""
          onChange={() => {}}
        />
      </InputGroup>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleCreatePost}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  autoComplete="off"
                  placeholder="Title (require)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  rounded="lg"
                  px={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content... (require)"
                  size="xl"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Image"
                  type="file"
                  id="single"
                  accept="image/*"
                  onChange={handleUploadImage}
                  disabled={uploading}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Is Published</FormLabel>
                <RadioGroup
                  onChange={(e) => setIsPublished(e)}
                  value={isPublished}
                >
                  <Stack direction="row">
                    <Radio value={'1'}>Publish</Radio>
                    <Radio value={'0'}>Private</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={handleCreatePost}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PostModel;
