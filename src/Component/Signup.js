import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const toast = useToast();
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://expensetrackerbackend-y9nk.onrender.com/users', formData);
      console.log('Signup Success:', response.data);
      toast({
        title: 'Signup Successful!',
        description: 'Your account has been created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup Error:', error);
      toast({
        title: 'Signup Failed!',
        description: error.response?.data?.message || 'An error occurred during signup.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box H="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
      <Box bg="white" p={8} borderRadius="lg" boxShadow="base" minW="md">
        <VStack spacing={4}>
          <Heading as="h2" size="xl" textAlign="center"  style={{fontFamily: "cursive"}}>
            Signup
          </Heading>
          <form onSubmit={handleSubmit} width="100%">
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="Full Name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Password"
                />
              </FormControl>
              <Button
                mt={4}
                width="full"
                colorScheme="blue"
                isLoading={false}
                type="submit"
              >
                Sign Up
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default Signup;
