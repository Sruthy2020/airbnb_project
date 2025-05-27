import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  useToast,
  Card,
  CardBody,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';

const BookingPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const listingId = params.get("listing_id");

  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    name: '',
    email: '',
    mobile: '',
    postal: '',
    residential: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/bookings', {
        listing_id: listingId,
        startDate: form.startDate,
        endDate: form.endDate,
        name: form.name,
        email: form.email,
        daytimePhone: form.postal,
        mobilePhone: form.mobile,
        postalAddress: form.postal,
        homeAddress: form.residential,
      });

      toast({
        title: 'Booking successful!',
        description: 'You will be redirected shortly.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => navigate('/confirmation'), 1000);
    } catch (err) {
      console.error('Booking failed:', err);
      toast({
        title: 'Booking failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" py={10} px={4}>
      <Heading mb={6} color="red.400" textAlign="center">
        Let's Book the Property
      </Heading>

      <Card borderRadius="xl" boxShadow="md">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <Heading size="sm" color="gray.700">
                Booking Details
              </Heading>

              <HStack spacing={4} flexWrap="wrap">
                <FormControl isRequired flex="1">
                  <FormLabel>Check In</FormLabel>
                  <Input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                  </FormControl>
                
                <FormControl isRequired flex="1">
                  <FormLabel>Check Out</FormLabel>
                  <Input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
                  </FormControl>
                </HStack>

              <Heading size="sm" mt={4} color="gray.700">
                Your Details
              </Heading>

              <FormControl isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input name="mobile" placeholder="04xx xxx xxx" value={form.mobile} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Postal Address</FormLabel>
                <Input name="postal" placeholder="Your postal address" value={form.postal} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Residential Address</FormLabel>
                <Input name="residential" placeholder="Home address (no PO Box)" value={form.residential} onChange={handleChange} />
              </FormControl>

              <Button
              type="submit"
              colorScheme="red"
              size="lg"
              width="30%"
              fontWeight="bold"
              borderRadius="xl"
              alignSelf="center"
              mt={6}
              _hover={{ bg: 'red.700' }}
              >
                Book Now
              </Button>

            </VStack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default BookingPage;
