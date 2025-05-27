import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Select,
  Button,
  Text,
  HStack,
  SimpleGrid,
  Spinner,
  Center,
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react';
import ListingCard from '../components/ListingCard';

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [limit, setLimit] = useState(10);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const toast = useToast();

  const fetchListings = async (params) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.get('http://localhost:3001/api/listings/filter', {
        params: { ...params, limit },
      });
      setListings(res.data);
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again later.');
      toast({
        title: 'Error fetching listings',
        description: 'Please check your connection or try again later.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLimit(10);
    setSearchTriggered(true);
    fetchListings({ location, type: propertyType, bedrooms });
  };

  useEffect(() => {
    if (searchTriggered) {
      fetchListings({ location, type: propertyType, bedrooms });
    }
  }, [limit]);

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <Heading textAlign="center" color="red.400" mb={6}>
        Explore Stays
      </Heading>

      {/* Card Form */}
      <Card mb={10} p={4} shadow="md" borderRadius="xl">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <HStack spacing={4} flexWrap="wrap">
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                isRequired
                variant="filled"
                flex="1"
              />
              <Select
                placeholder="Property Type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                variant="filled"
                flex="1"
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
              </Select>
              <Select
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                variant="filled"
                flex="1"
              >
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
              </Select>
              <Button
                type="submit"
                colorScheme="red"
                flexShrink="0"
              >
                Search
              </Button>
            </HStack>
          </form>
        </CardBody>
      </Card>

      {/* Error Message */}
      {errorMsg && (
        <Text color="red.500" textAlign="center" mb={4}>
          {errorMsg}
        </Text>
      )}

      {/* Listings Count */}
      {listings.length > 0 && (
        <Heading size="md" mb={6} color="gray.600">
          {listings.length} result{listings.length !== 1 && 's'} found
        </Heading>
      )}

      {/* Results */}
      {loading ? (
        <Center mt={10}>
          <Spinner size="xl" color="red.400" />
        </Center>
      ) : listings.length === 0 && searchTriggered ? (
        <Text textAlign="center" mt={10} color="gray.500">
          No listings found. Try different filters.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </SimpleGrid>
      )}

      {/* Load More */}
      {listings.length >= limit && searchTriggered && (
        <Center mt={10}>
          <Button
            onClick={() => setLimit((prev) => prev + 10)}
            colorScheme="red"
            variant="outline"
          >
            Load More
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default HomePage;
