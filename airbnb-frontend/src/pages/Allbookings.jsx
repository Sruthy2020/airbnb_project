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

  const cardBg = useColorModeValue('white.50', 'gray.800');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const bgColor = useColorModeValue('white', 'gray.900');


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
    <Box bgGradient="linear(to-b, red.50, white)" _dark={{ bg: bgColor }} minH="100vh" py={16} px={4}>
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
              p={4}
              transition="0.3s"
              _hover={{
                transform: 'scale(1.02)',
                boxShadow: '0 8px 24px rgba(255, 90, 95, 0.3)',
                borderColor: 'red.300',
              }}
              border="1px solid"
              borderColor="gray.100"
              cursor="pointer"
            >
              <CardBody>
                <VStack spacing={3} align="stretch">

                  <HStack justify="space-between" wrap="wrap">
                    <Box>
                      <Text fontSize="sm" color={labelColor}>Name</Text>
                      <Text fontWeight="bold">{booking.name}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={labelColor}>Email</Text>
                      <Text>{booking.email}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={labelColor}>Mobile</Text>
                      <Text>{booking.mobilePhone}</Text>
                    </Box>
                  </HStack>

                  <Divider />


                  <HStack justify="space-between" wrap="wrap">
                    <Box>
                      <Text fontSize="sm" color={labelColor}>Check-in</Text>
                      <Badge colorScheme="green" fontSize="md">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </Badge>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={labelColor}>Check-out</Text>
                      <Badge colorScheme="red" fontSize="md">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </Badge>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={labelColor}>Listing ID</Text>
                      <Text fontFamily="mono" fontSize="sm" color="gray.500">
                        {booking.listing_id}
                      </Text>
                    </Box>
                  </HStack>

                  <Divider />


                  <VStack spacing={3} align="stretch">
                    <Text fontSize="m" fontWeight="semibold" color={labelColor}>
                      Listing Info
                    </Text>

                    {booking.listing ? (
                      <>
                        <HStack justify="space-between" wrap="wrap">
                          <Box>
                            <Text fontSize="s" color={labelColor}>Name</Text>
                            <Text fontSize="sm">{booking.listing.name || 'N/A'}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="s" color={labelColor}>Location</Text>
                            <Text fontSize="sm">{booking.listing.address?.market || 'N/A'}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="s" color={labelColor}>Type</Text>
                            <Text fontSize="sm">{booking.listing.property_type || 'N/A'}</Text>
                          </Box>
                        </HStack>

                        {booking.listing.images?.picture_url && (
                          <Box mt={3} w="100%" overflow="hidden" borderRadius="lg">
                            <img
                              src={booking.listing.images.picture_url}
                              alt="Listing Preview not available"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "12px",
                                display: "block",
                              }}
                            />
                          </Box>
                        )}
                      </>
                    ) : (
                      <Text fontSize="sm" color="gray.400" fontStyle="italic">
                        Listing not found or removed.
                      </Text>
                    )}
                  </VStack>

                  <Divider />


                  <VStack spacing={3} align="stretch">
                    <Text fontSize="m" fontWeight="semibold" color={labelColor}>
                      Address Info
                    </Text>
                    <HStack spacing={4} wrap="wrap">
                      <Box>
                        <Text fontSize="s" color={labelColor}>Postal</Text>
                        <Text fontSize="sm">{booking.postalAddress || 'N/A'}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="s" color={labelColor}>Home</Text>
                        <Text fontSize="sm">{booking.homeAddress || 'N/A'}</Text>
                      </Box>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
    </Box>
  );
};

export default AllBookings;
