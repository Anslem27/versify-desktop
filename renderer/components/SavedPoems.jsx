import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, Center, VStack, HStack } from '@chakra-ui/react';
import Link from 'next/link';

const SavedPoems = () => {
    const [savedPoems, setSavedPoems] = useState([]);

    useEffect(() => {
        const savedPoemsJSON = localStorage.getItem('savedPoems');
        const savedPoemsData = savedPoemsJSON ? JSON.parse(savedPoemsJSON) : [];
        setSavedPoems(savedPoemsData);

        // Set up EventSource for real-time updates
        const eventSource = new EventSource('/events');
        eventSource.onmessage = (event) => {
            const newPoem = JSON.parse(event.data);
            setSavedPoems((prevPoems) => [newPoem, ...prevPoems.slice(0, 4)]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <Box p={4}>
            <Heading fontSize={14} mb={4}>
                Recently Saved
            </Heading>
            {savedPoems.length === 0 ? (
                <Center flexDirection="column">
                    <Text mb={4}>Your saved poems list is empty.</Text>
                    <Link href="/">
                        <Button colorScheme="teal" size="sm">
                            Explore Poems
                        </Button>
                    </Link>
                </Center>
            ) : (
                <VStack spacing={4} align="start">
                    {savedPoems.map((poem, index) => (
                        <Box
                            key={index}
                            border="1px solid #ccc"
                            p={4}
                            borderRadius="md"
                            maxW="500px"
                            overflow="hidden"
                        >
                            <Heading fontSize="lg" mb={2}>
                                {poem.title}
                            </Heading>
                            <Text fontSize="md" mb={2} fontWeight="w400">
                                By {poem.author}
                            </Text>
                            <Text fontSize="sm" overflow="hidden" textOverflow="ellipsis" maxHeight="60px">
                                {poem.lines.join(' ')}
                            </Text>
                        </Box>
                    ))}
                </VStack>
            )}
        </Box>
    );
};

export default SavedPoems;
