import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`https://expensetrackerbackend-y9nk.onrender.com/users?email=${formData.email}&password=${formData.password}`);
      if (data.length > 0) {
        dispatch(setUser(data[0]));
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Incorrect credentials',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast({
        title: 'Login Failed',
        description: error.message,
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
            Login
          </Heading>
          <form onSubmit={handleSubmit} width="100%">
            <VStack spacing={4} align="stretch">
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
                isLoading={false} // set true when sending the request
                type="submit"
              >
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
