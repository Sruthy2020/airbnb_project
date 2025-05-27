import { Box, Flex, Spacer, Link, HStack, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => (
  <Box
    bg="white"
    boxShadow="sm"
    px={6}
    py={4}
    position="sticky"
    top="0"
    zIndex="1000"
  >
    <Flex align="center">
      <Link as={RouterLink} to="/" display="flex" alignItems="center" gap={3}>
        <Image src="/logo.png" alt="AirStay Logo" width={90} />
      </Link>

      <Spacer />
      <HStack spacing={6} fontWeight="medium">
        <Link as={RouterLink} to="/" color="gray.600" _hover={{ color: 'red.400' }}>
          Home
        </Link>
        <Link as={RouterLink} to="/all-bookings" color="gray.600" _hover={{ color: 'red.400' }}>
          Bookings
        </Link>
        <Link as={RouterLink} to="/about" color="gray.600" _hover={{ color: 'red.400' }}>
          About
        </Link>
      </HStack>
    </Flex>
  </Box>
);

export default Header;
