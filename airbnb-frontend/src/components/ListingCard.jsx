import {
  Box,
  Heading,
  Text,
  Tag,
  VStack,
  HStack,
  Divider,
  Link,
  Icon,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const MotionBox = motion(Box);

const ListingCard = ({ listing }) => {
  const [showFull, setShowFull] = useState(false);

  const price =
    listing.price && typeof listing.price === "object" && listing.price.$numberDecimal
      ? parseFloat(listing.price.$numberDecimal).toFixed(2)
      : typeof listing.price === "number"
      ? listing.price.toFixed(2)
      : "N/A";

  const rating = listing.review_scores?.review_scores_rating || "Not rated";

  const summary = listing.summary || "No description provided.";

  const toggleText = () => setShowFull(!showFull);

  return (
    <MotionBox
      bg="white"
      p={5}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
      shadow="sm"
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition="all 0.2s ease-in-out"
      _hover={{ shadow: "lg" }}
    >
      <VStack align="start" spacing={4}>
        <HStack justifyContent="space-between" width="100%">
          <Tooltip label={listing.name} hasArrow>
            <Heading size="md" fontWeight="semibold" noOfLines={1}>
              <Link href={`/bookings?listing_id=${listing._id}`} color="red.400">
              {listing.name || "Untitled Listing"}
              </Link>
            </Heading>
          </Tooltip>
          <Tag
            bg="#FF5A5F"
            color="white"
            fontWeight="bold"
            borderRadius="md"
            px={6}
            py={1}
            fontSize="sm"
          >
            ${price}
          </Tag>
        </HStack>

        <Text fontSize="sm" color="gray.600" whiteSpace="pre-wrap">
          {showFull ? summary : summary.slice(0, 120) + (summary.length > 120 ? '...' : '')}
        </Text>

        {summary.length > 120 && (
          <Button
            onClick={toggleText}
            size="xs"
            colorScheme="gray"
            variant="link"
            alignSelf="flex-start"
          >
            {showFull ? 'Show less' : 'Show more'}
          </Button>
        )}

        <Divider />

        <VStack align="start" spacing={1} fontSize="sm" color="gray.700">
          <HStack>
            <Icon as={FaStar} color="yellow.400" />
            <Text>
              <strong>Rating:</strong> {rating}
            </Text>
          </HStack>
          <Text>
            <strong>Bedrooms:</strong>{" "}
            {listing.bedrooms || listing.bedroom_count || "Not specified"}
          </Text>
          <Text>
            <strong>Property Type:</strong> {listing.property_type || "Unknown"}
          </Text>
        </VStack>
      </VStack>
    </MotionBox>
  );
};

export default ListingCard;
