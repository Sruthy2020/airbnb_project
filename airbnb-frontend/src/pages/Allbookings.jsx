import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardBody,
} from '@chakra-ui/react';
import axios from 'axios';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/bookings");
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <Spinner size="xl" color="red.500" mt={10} />;
  if (error) return (
    <Alert status="error" mt={6}>
      <AlertIcon />
      {error}
    </Alert>
  );

  return (
    <Box maxW="1000px" mx="auto" py={10} px={4}>
      <Heading mb={6} color="red.500" textAlign="center">
        All Bookings
      </Heading>

      {bookings.length === 0 ? (
        <Text>No bookings have been made yet.</Text>
      ) : (
        <VStack spacing={5} align="stretch">
          {bookings.map((booking, index) => (
            <Card key={booking._id || index} borderRadius="xl" boxShadow="md">
              <CardBody>
                <HStack justify="space-between" wrap="wrap">
                  <Box>
                    <Text fontWeight="bold">Name:</Text>
                    <Text>{booking.name}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Email:</Text>
                    <Text>{booking.email}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Mobile:</Text>
                    <Text>{booking.mobilePhone}</Text>
                  </Box>
                </HStack>

                <Divider my={3} />

                <HStack justify="space-between" wrap="wrap">
                  <Box>
                    <Text fontWeight="bold">Check-in:</Text>
                    <Text>{new Date(booking.startDate).toLocaleDateString()}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Check-out:</Text>
                    <Text>{new Date(booking.endDate).toLocaleDateString()}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Listing ID:</Text>
                    <Text>{booking.listing_id}</Text>
                  </Box>
                </HStack>

                <Divider my={3} />

                <Text fontSize="sm" color="gray.600">
                  Postal: {booking.postalAddress || "N/A"} | Home: {booking.homeAddress || "N/A"}
                </Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default AllBookings;
