import { Box, Flex, Link, HStack, Image, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => (
  <Box
    bg="whiteAlpha.80"
    backdropFilter="saturate(180%) blur(8px)"
    boxShadow="md"
    px={8}
    py={4}
    position="sticky"
    top="0"
    zIndex="1000"
    borderBottom="1px solid"
    borderColor="gray.100"
  >
    <Flex align="center" justify="space-between" position="relative">
      {/*logo */}
      <Link
      as={RouterLink}
      to="/"
      display="flex"
      alignItems="center"
      gap={3}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      >
        <Image src="/logo.png" alt="AirStay Logo" width={8} height={8} />
        <Text fontSize="xl" fontWeight="bold" color="red.500">airstay</Text>
      </Link>

      {/*navbar*/}
      <HStack
        spacing={20}
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
      >
        {[
          { to: '/', label: 'Home' },
          { to: '/all-bookings', label: 'Bookings' },
          { to: '/about', label: 'About' },
        ].map(({ to, label }) => (
          <Link
            as={RouterLink}
            to={to}
            px={3}
            py={1.5}
            rounded="md"
            fontWeight="medium"
            fontSize="lg"
            color="gray.600"
            _hover={{
              bg: 'red.50',
              color: 'red.500',
              transform: 'scale(1.08)',
              boxShadow: '0 4px 12px rgba(255, 90, 95, 0.3)',
            }}
            _active={{ bg: 'red.100', transform: 'scale(0.96)' }}
            transition="all 0.2s ease-in-out"
            key={label}
          >
            {label}
          </Link>
        ))}
      </HStack>
    </Flex>
  </Box>
);

export default Header;
