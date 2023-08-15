import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Spinner, IconButton,
    Grid, Flex, Box, VStack, Text, Modal,
    ModalOverlay, ModalContent,
    ModalHeader, ModalBody, ModalCloseButton, useToast, Button,
} from '@chakra-ui/react';
import { FaList, FaTh, FaSave } from 'react-icons/fa';

const RandomPoemComponent = () => {
    const [poems, setPoems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGridView, setIsGridView] = useState(false);
    const [selectedPoem, setSelectedPoem] = useState(null);

    useEffect(() => {
        async function fetchRandomPoem() {
            try {
                const response = await axios.get('https://poetrydb.org/title,random/Sonnet;5');
                const data = response.data;
                setPoems(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching poems:', error);
                setError(error.message);
                setIsLoading(false);
            }
        }

        fetchRandomPoem();
    }, []);

    const toast = useToast(); // Chakra UI toast hook

    // Function to save a poem to local storage
    const savePoemToLocal = (poem) => {
        try {
            // Retrieve existing saved poems from local storage
            const savedPoemsJSON = localStorage.getItem('savedPoems');
            const savedPoems = savedPoemsJSON ? JSON.parse(savedPoemsJSON) : [];

            // Check if the poem is already saved
            const isPoemSaved = savedPoems.some(savedPoem => savedPoem.title === poem.title);

            if (!isPoemSaved) {
                // Add the poem to the saved poems array
                savedPoems.push(poem);

                // Save the updated array to local storage
                localStorage.setItem('savedPoems', JSON.stringify(savedPoems));

                // Show a toast message to indicate successful save
                toast({
                    title: 'Poem Saved',
                    description: `You saved "${poem.title}" to your collection.`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Show a toast message if the poem is already saved
                toast({
                    title: 'Poem Already Saved',
                    description: `The poem "${poem.title}" is already saved in your collection.`,
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error saving poem:', error);

            // Show a toast message if there's an error
            toast({
                title: 'Error Saving Poem',
                description: 'An error occurred while saving the poem.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };


    const openModal = (poem) => {
        setSelectedPoem(poem);
    };

    const closeModal = () => {
        setSelectedPoem(null);
    };

    return (
        <div>
            {isLoading ? (
                <Spinner size="lg" />
            ) : error ? (
                <Box m={20} p={3} bg="red.200" color="red.900">
                    Error: {error}
                </Box>
            ) : (
                <div>
                    <Flex align="start" mb={4}>
                        <IconButton
                            aria-label="Switch to List View"
                            icon={<FaList />}
                            size={"sm"}
                            m={1}
                            isActive={!isGridView}
                            onClick={() => setIsGridView(false)}
                        />
                        <IconButton
                            aria-label="Switch to Grid View"
                            icon={<FaTh />}
                            m={1}
                            size={"sm"}
                            isActive={isGridView}
                            onClick={() => setIsGridView(true)}
                        />
                    </Flex>
                    <Text m={3} fontWeight={"bold"}>Sonnets</Text>

                    {isGridView ? (
                        <Grid templateColumns="repeat(3, 1fr)" gap={4} overflow={"hidden"} p={3}>
                            {poems.map((poem, index) => (
                                <Box
                                    key={index}
                                    border="1px solid #ccc"
                                    p={4}
                                    borderRadius="md"
                                    overflow="hidden"
                                    _hover={{
                                        transform: 'scale(1.05)', // Small zoom on hover
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Splash effect on hover
                                    }}
                                    onClick={() => openModal(poem)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <VStack align="start" spacing={2}>
                                        <h3>{poem.title}</h3>
                                        <Text
                                            height="100px"
                                            overflow="hidden"
                                            textOverflow="ellipsis"
                                        >
                                            {poem.lines.slice(0, 3).join(' ')}
                                        </Text>
                                        <Text>{poem.author}</Text>
                                    </VStack>
                                </Box>
                            ))}
                        </Grid>
                    ) : (
                        <div /* style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'hidden' }} */>
                            {poems.map((poem, index) => (
                                <Box
                                    key={index}
                                    border="1px solid #ccc"
                                    p={4}
                                    m={4}
                                    width="95%"
                                    borderRadius="md"
                                    overflow="hidden"
                                    onClick={() => openModal(poem)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <VStack align="start" spacing={2}>
                                        <h3>{poem.title}</h3>
                                        <Text
                                            height="100px"
                                            overflow="hidden"
                                            textOverflow="ellipsis"
                                        >
                                            {poem.lines.slice(0, 3).join(' ')}
                                        </Text>
                                        <Text>{poem.author}</Text>
                                    </VStack>
                                </Box>
                            ))}
                        </div>
                    )}
                    <Modal isOpen={selectedPoem !== null} onClose={closeModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader
                                fontSize={30}
                                fontWeight="bold"
                                textAlign="center"
                            >
                                {selectedPoem?.title}
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {selectedPoem?.lines.map((line, idx) => (
                                    <Text key={idx} p={1} textAlign="center">
                                        {line}
                                    </Text>
                                ))}
                                <Text fontWeight="bold" p={3}>
                                    - By {selectedPoem?.author}
                                </Text>
                                <Button
                                    onClick={() => savePoemToLocal(selectedPoem)}
                                    leftIcon={<FaSave />}
                                    colorScheme="teal"
                                    size="lg"
                                    bgGradient="linear(to-r, red.400, #ff4500)"
                                    border="1px"
                                    borderColor="teal.400"
                                    _hover={{
                                        bgGradient: 'none',
                                        bg: 'teal.400',
                                        borderColor: 'teal.400',
                                    }}
                                >
                                    Save Poem
                                </Button>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default RandomPoemComponent;
