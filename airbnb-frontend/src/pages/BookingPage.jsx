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
  //get the listing_id from the URL query parameters..
  const location = useLocation();
  //urlSearchParams is used to parse the query parameters from the URL...
  const params = new URLSearchParams(location.search);
  //get the listing_id from the query parameters...
  const listingId = params.get("listing_id");

  //if listingId is not present, redirect to home page...
  const navigate = useNavigate();
  const toast = useToast();



  //form state to hold booking details...
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    name: '',
    email: '',
    mobile: '',
    postal: '',
    residential: '',
  });




  //handle form input changes...
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

//email, mobile, name validation functions...
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMobile = (mobile) =>
    /^04\d{2}\s?\d{3}\s?\d{3}$/.test(mobile);
  const isValidName = (name) =>
    /^[a-zA-Z\s]+$/.test(name);




  //handle form submission...
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      startDate,
      endDate,
      name,
      email,
      mobile,
      postal,
      residential,
    } = form;

    const checkIn = new Date(startDate);
    const checkOut = new Date(endDate);

    if (!startDate || !endDate || checkOut <= checkIn) {
      toast({
        title: 'Invalid dates',
        description: 'Check-out must be after check-in.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidName(name)) {
      toast({
        title: 'Invalid name',
        description: 'Name should contain only letters and spaces.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidMobile(mobile)) {
      toast({
        title: 'Invalid mobile number',
        description: 'Mobile number must start with 04 and be 10 digits(with or without spaces).',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/bookings', {
        listing_id: listingId,
        startDate,
        endDate,
        name,
        email,
        daytimePhone: postal,
        mobilePhone: mobile,
        postalAddress: postal,
        homeAddress: residential,
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
        description: err.response?.data?.error || 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };




  return (
    <Box bgGradient="linear(to-b, red.50, white)" minH="100vh" py={16} px={4}>
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
                  <Input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel>Check Out</FormLabel>
                  <Input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    min={form.startDate || new Date().toISOString().split('T')[0]}
                  />
                </FormControl>
              </HStack>

              <Heading size="sm" mt={4} color="gray.700">
                Your Details
              </Heading>

              <FormControl isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  name="mobile"
                  placeholder="04xx xxx xxx"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Postal Address</FormLabel>
                <Input
                  name="postal"
                  placeholder="Your postal address"
                  value={form.postal}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Residential Address</FormLabel>
                <Input
                  name="residential"
                  placeholder="Home address (no PO Box)"
                  value={form.residential}
                  onChange={handleChange}
                />
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
  </Box>
  );
};

export default BookingPage;
