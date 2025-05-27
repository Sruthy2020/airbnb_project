import { Box, Text, Link, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => (
  <Box bg="gray.100" py={6} px={6} textAlign="center">
    <HStack spacing={6} justify="center" mb={2}>
      <Link as={RouterLink} to="/" fontSize="sm" color="gray.600" _hover={{ color: 'red.400' }}>
        Home
      </Link>
      <Link as={RouterLink} to="/all-bookings" fontSize="sm" color="gray.600" _hover={{ color: 'red.400' }}>
        Bookings
      </Link>
      <Link as={RouterLink} to="/about" fontSize="sm" color="gray.600" _hover={{ color: 'red.400' }}>
        About
      </Link>
    </HStack>
    <Text fontSize="xs" color="gray.500">
      © {new Date().getFullYear()} AirStay. All rights reserved.
    </Text>
  </Box>
);

export default Footer;
