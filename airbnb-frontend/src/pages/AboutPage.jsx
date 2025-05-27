import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Container,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaRegLightbulb, FaGlobe, FaShieldAlt, FaHeart } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <Box bg="gray.50" minH="100vh" py={12}>
      <Container maxW="4xl">
        <VStack align="start" spacing={8}>
          <Heading size="2xl" color="red.400" mb={4}>
            About AirStay
          </Heading>

          <Text fontSize="lg" color="gray.700" lineHeight="1.8">
            AirStay is a next-generation platform for booking short-term and long-term stays. Whether you're a digital nomad, a family on vacation, or just someone needing a quick weekend getaway, we make it easy to find a place that feels like home.
          </Text>

          <Divider />

          <Heading size="lg" color="gray.700">
            What We Offer
          </Heading>

          <VStack align="start" spacing={3} fontSize="md" color="gray.600">
            <HStack><Icon as={FaGlobe} color="red.400" /> <Text>Global listings with trusted reviews</Text></HStack>
            <HStack><Icon as={FaRegLightbulb} color="red.400" /> <Text>Smart filters to help you find the perfect place</Text></HStack>
            <HStack><Icon as={FaShieldAlt} color="red.400" /> <Text>Secure bookings and instant confirmations</Text></HStack>
            <HStack><Icon as={FaHeart} color="red.400" /> <Text>Supportive customer service every step of the way</Text></HStack>
          </VStack>

          <Divider />

          <Heading size="lg" color="gray.700">
            Our Mission
          </Heading>
          <Text fontSize="md" color="gray.600" lineHeight="1.8">
            Our mission is simple: to create seamless, secure, and meaningful travel experiences. We believe in empowering both guests and hosts by fostering trust, transparency, and accessibility in every booking.
          </Text>

          <Divider />

          <Heading size="lg" color="gray.700">
            What People Say
          </Heading>
          <Box
            p={4}
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            shadow="sm"
          >
            <Text fontStyle="italic" fontSize="md" color="gray.700">
              "AirStay helped me find a cozy, affordable home in Melbourne within minutes. The booking process was smooth, and I felt secure the entire time."
            </Text>
            <Text mt={2} fontWeight="medium" fontSize="sm" color="gray.500">
              - Rachel T., Frequent Traveler
            </Text>
          </Box>

        </VStack>
      </Container>
    </Box>
  );
};

export default AboutPage;
