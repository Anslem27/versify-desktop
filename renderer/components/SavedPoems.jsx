import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, Center, VStack, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SavedPoems = () => {
    const [savedPoems, setSavedPoems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const savedPoemsJSON = localStorage.getItem('savedPoems');
        const savedPoemsData = savedPoemsJSON ? JSON.parse(savedPoemsJSON) : [];
        setSavedPoems(savedPoemsData);

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
                        <Box p={1} key={index}>
                            <Link href={`/poem_detail_view/${index}`} >
                                <Flex justify="start" align="start" direction="row" w="100%" cursor="pointer">
                                    <Box padding={3}>
                                        <Text fontSize={35} fontWeight="bold" textColor="grey">
                                            {index < 9 ? `0${index + 1}` : index + 1}
                                        </Text>
                                    </Box>
                                    <Flex display="flex" flexDirection="column">
                                        <Text mt={2} fontSize={20} fontWeight="bold">
                                            {poem.title}
                                        </Text>
                                        <Text fontSize={10}>By - {poem.author}</Text>
                                        <p>{poem.lines.slice(0, 2).join(' ')}</p>
                                        <Flex wrap="wrap" mt={2}>
                                            <Text color="green" mr={2} fontSize={10} textTransform="capitalize">
                                                Reading Time
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Link>
                        </Box>
                    ))}
                </VStack>
            )}
        </Box>
    );
};

export default SavedPoems;
