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
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cardBg = useColorModeValue('gray.50', 'gray.800');
  const labelColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" color="red.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt={6}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box maxW="1000px" mx="auto" py={10} px={4}>
      <Heading mb={8} color="red.500" textAlign="center">
        All Bookings
      </Heading>

      {bookings.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          No bookings have been made yet.
        </Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {bookings.map((booking, index) => (
            <Card
              key={booking._id || index}
              borderRadius="xl"
              boxShadow="lg"
              bg={cardBg}
              transition="0.3s"
              _hover={{ transform: 'scale(1.01)', boxShadow: 'xl' }}
            >
              <CardBody>
                <HStack justify="space-between" wrap="wrap" mb={2}>
                  <Box>
                    <Text fontSize="sm" color={labelColor}>
                      Name
                    </Text>
                    <Text fontWeight="bold">{booking.name}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color={labelColor}>
                      Email
                    </Text>
                    <Text>{booking.email}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color={labelColor}>
                      Mobile
                    </Text>
                    <Text>{booking.mobilePhone}</Text>
                  </Box>
                </HStack>

                <Divider my={3} />

                <HStack justify="space-between" wrap="wrap" mb={2}>
                  <Box>
                    <Text fontSize="sm" color={labelColor}>
                      Check-in
                    </Text>
                    <Badge colorScheme="green" fontSize="md">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color={labelColor}>
                      Check-out
                    </Text>
                    <Badge colorScheme="red" fontSize="md">
                      {new Date(booking.endDate).toLocaleDateString()}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color={labelColor}>
                      Listing ID
                    </Text>
                    <Text fontFamily="mono" fontSize="sm" color="gray.500">
                      {booking.listing_id}
                    </Text>
                  </Box>
                </HStack>

                <Divider my={3} />

                <Box fontSize="sm" color="gray.600">
                  <Text>
                    <strong>Postal Address:</strong>{' '}
                    {booking.postalAddress || 'N/A'}
                  </Text>
                  <Text>
                    <strong>Home Address:</strong>{' '}
                    {booking.homeAddress || 'N/A'}
                  </Text>
                </Box>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default AllBookings;
