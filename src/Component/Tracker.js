import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';

const Tracker = () => {
  const user = useSelector(state => state.user.user);
  const toast = useToast();
  const [transaction, setTransaction] = useState({
    type: 'Income',
    category: 'Salary',
    amount: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'type') {
      setTransaction(prevState => ({
        ...prevState,
        category: value === 'Income' ? 'Salary' : 'Food & Drinks'
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Unauthorized',
        description: 'You must be logged in to record a transaction.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await axios.post('https://expensetrackerbackend-y9nk.onrender.com/transactions', {
        ...transaction,
        userId: user.id
      });
      toast({
        title: 'Success',
        description: 'Transaction added successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setTransaction({ type: 'Income', category: 'Salary', amount: '', date: '' }); 
    } catch (error) {
      console.error('Failed to add transaction:', error);
      toast({
        title: 'Failed to add transaction',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const categories = {
    Income: ['Salary', 'Gifts', 'Refunds', 'Other'],
    Expense: ['Food & Drinks', 'Shopping', 'Housing', 'Bills', 'Vehicle & Transport', 'Lifestyle']
  };

  return (
    <Box
      H="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="blue.100" 
      style={{fontFamily: "cursive"}}
    >
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" style={{fontFamily: "cursive"}}>Add Transaction</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel style={{"font-family":" ui-sans-serif"}}>Type:</FormLabel>
            <Select name="type" value={transaction.type} onChange={handleInputChange}>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Select>
          </FormControl>
          {/* <br /> */}
          <FormControl isRequired>
            <FormLabel style={{"font-family":" ui-sans-serif"}}>Category:</FormLabel>
            <Select name="category" value={transaction.category} onChange={handleInputChange}>
              {categories[transaction.type].map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Select>
          </FormControl>
          {/* <br /> */}
          <FormControl isRequired>
            <FormLabel style={{"font-family":" ui-sans-serif"}}>Amount in Rupees:</FormLabel>
            <Input type="number" name="amount" value={transaction.amount} onChange={handleInputChange} />
          </FormControl>
          {/* <br /> */}
          <FormControl isRequired>
            <FormLabel style={{"font-family":" ui-sans-serif"}}>Date:</FormLabel>
            <Input type="date" name="date" value={transaction.date} onChange={handleInputChange} />
          </FormControl>
        
          <Button type="submit" colorScheme="blue" mt={12} style={{fontSize:"20px"}}>
            Create
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default Tracker;
