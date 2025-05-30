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
  useColorModeValue,
  Fade,
} from '@chakra-ui/react';
import { FaRegLightbulb, FaGlobe, FaShieldAlt, FaHeart } from 'react-icons/fa';

const AboutPage = () => {
  // Define color modes for different elements for makign it pretty..
  const sectionTitleColor = useColorModeValue('gray.700', 'gray.100');
  const sectionTextColor = useColorModeValue('gray.600', 'gray.300');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  //features of the about page..
  const features = [
    { icon: FaGlobe, text: 'Global listings with trusted reviews' },
    { icon: FaRegLightbulb, text: 'Smart filters to help you find the perfect place' },
    { icon: FaShieldAlt, text: 'Secure bookings and instant confirmations' },
    { icon: FaHeart, text: 'Supportive customer service every step of the way' },
  ];

  return (
    <Box bgGradient="linear(to-b, red.50, white)" _dark={{ bg: bgColor }} minH="100vh" py={16} px={4}>
      <Container maxW="5xl">
        <Fade in>
          <VStack align="start" spacing={12}>
            <Heading size="2xl" color="red.400">
              About AirStay
            </Heading>

            <Text fontSize="lg" color={sectionTextColor} lineHeight="taller" maxW="3xl">
              AirStay is a next-generation platform for booking short-term and long-term stays. Whether you're a digital nomad, a family on vacation, or just someone needing a quick weekend getaway, we make it easy to find a place that feels like home.
            </Text>

            <Divider />

            <Box w="full">
              <Heading size="lg" color={sectionTitleColor} mb={6}>
                What We Offer
              </Heading>
              <VStack align="start" spacing={4} fontSize="md" color={sectionTextColor}>
                {features.map((feature, idx) => (
                  <HStack key={idx} spacing={4} _hover={{ pl: 1 }} transition="all 0.2s ease">
                    <Icon as={feature.icon} color="red.400" boxSize={5} />
                    <Text>{feature.text}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Divider />

            <Box w="full">
              <Heading size="lg" color={sectionTitleColor} mb={4}>
                Our Mission
              </Heading>
              <Text fontSize="md" color={sectionTextColor} maxW="3xl" lineHeight="taller">
                Our mission is simple: to create seamless, secure, and meaningful travel experiences.
                We believe in empowering both guests and hosts by fostering trust, transparency, and accessibility in every booking.
              </Text>
            </Box>

            <Divider />

            <Box w="full">
              <Heading size="lg" color={sectionTitleColor} mb={4}>
                What People Say
              </Heading>
              <Box
                p={6}
                bg={boxBg}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={borderColor}
                shadow="lg"
                transition="0.3s"
                _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
              >
                <Text fontStyle="italic" fontSize="md" color={sectionTextColor}>
                  "AirStay helped me find a cozy, affordable home in Melbourne within minutes. The booking process was smooth, and I felt secure the entire time."
                </Text>
                <Text mt={4} fontWeight="medium" fontSize="sm" color="gray.500">
                  - Rachel T., Frequent Traveler
                </Text>
              </Box>
            </Box>
          </VStack>
        </Fade>
      </Container>
    </Box>
  );
};

export default AboutPage;
