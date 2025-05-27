import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ConfirmationPage = () => (
  
  <Flex
    minH="100vh"
    align="center"
    justify="center"
    bg="gray.50"
    px={4}
  >
    <MotionBox
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      maxW="lg"
      w="100%"
      p={8}
      borderRadius="xl"
      boxShadow="md"
      textAlign="center"
      bg="white"
    >
      <VStack spacing={4}>
        <Icon as={CheckCircleIcon} boxSize={10} color="green.400" />
        <Heading size="lg" color="green.500">
          Booking Successful!
        </Heading>
        <Text fontSize="md" color="gray.600">
          Your booking has been saved. We'll email you the details shortly.
        </Text>
        <Button
          as={RouterLink}
          to="/"
          colorScheme="red"
          variant="solid"
          mt={4}
          borderRadius="xl"
        >
          ← Return to Homepage
        </Button>
      </VStack>
    </MotionBox>
  </Flex>
);

export default ConfirmationPage;
