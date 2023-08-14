import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, IconButton, Grid, Flex, Box, VStack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { FaList, FaTh } from 'react-icons/fa';

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

    const toggleViewMode = () => {
        setIsGridView(!isGridView);
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
                <Box p={4} bg="red.200" color="red.900">
                    Error: {error}
                </Box>
            ) : (
                <div>
                    <Flex align="start" mb={4}>
                        <IconButton
                            aria-label="Switch to List View"
                            icon={<FaList />}
                            isActive={!isGridView}
                            onClick={() => setIsGridView(false)}
                        />
                        <IconButton
                            aria-label="Switch to Grid View"
                            icon={<FaTh />}
                            isActive={isGridView}
                            onClick={() => setIsGridView(true)}
                        />
                    </Flex>
                    {isGridView ? (
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            {poems.map((poem, index) => (
                                <Box
                                    key={index}
                                    border="1px solid #ccc"
                                    p={4}
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
                        </Grid>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll' }}>
                            {poems.map((poem, index) => (
                                <Box
                                    key={index}
                                    border="1px solid #ccc"
                                    p={4}
                                    m={4}
                                    width="300px"
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
                            <ModalHeader>{selectedPoem?.title}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {selectedPoem?.lines.map((line, idx) => (
                                    <p key={idx}>{line}</p>
                                ))}
                                <Text>- {selectedPoem?.author}</Text>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default RandomPoemComponent;
