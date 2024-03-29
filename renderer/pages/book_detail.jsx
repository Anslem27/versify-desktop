import React, { useState, useEffect } from 'react';
import { ChakraProvider, ColorModeProvider, Flex, Box, Image, Text, Spinner, Center, Heading, Button, Card } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import customTheme from '../styles/theme';
import { Global } from '@emotion/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageDrawer from '../components/PageDrawer';
import ReactRenderHTML from 'react-render-html';
import GlobalStyle from '../styles/global';
import MoreFromAuthor from '../components/MoreFromAuthor';
const { remote } = require('electron');
const fs = require('fs');
const path = require('path');
import { motion } from 'framer-motion';
import styled from '@emotion/styled';


const AnimatedBox = styled(motion(Box))`
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    // Apply a simple scale animation
    transform-origin: center;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

const AnimatedImage = styled(motion(Image))`
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    // Apply a fade-in animation
    opacity: 0;
    animation: fadeIn 0.5s ease-in-out forwards;

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
`;



const BookDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch book details by ID from the API
        fetch(`https://gutendex.com/books/${id}`)
            .then(response => response.json())
            .then(data => {
                setBook(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
                setIsLoading(false);
            });
    }, [id]); // Execute the effect whenever the id changes

    const handleDownloadEbook = async () => {
        if (book.formats && book.formats['application/epub+zip']) {
            const ebookUrl = book.formats['application/epub+zip'];
            const fileName = `${book.id}.epub`;

            try {
                const response = await fetch(ebookUrl);
                const totalBytes = Number(response.headers.get('content-length'));
                let downloadedBytes = 0;

                // Create a progress toast
                const progressId = toast('Download in progress...', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: false,
                });

                response.body.on('data', (chunk) => {
                    downloadedBytes += chunk.length;
                    const progress = (downloadedBytes / totalBytes) * 100;
                    toast.update(progressId, {
                        render: `Download in progress... ${progress.toFixed(2)}%`,
                    });
                });

                const buffer = await response.arrayBuffer();
                const downloadsPath = remote.app.getPath('downloads'); // Get downloads path
                const versifyAppPath = path.join(downloadsPath, 'versifyApp');
                const downloadPath = path.join(versifyAppPath, fileName);

                // Create the 'versifyApp' directory if it doesn't exist
                fs.mkdirSync(versifyAppPath, { recursive: true });

                fs.writeFileSync(downloadPath, new Uint8Array(buffer));

                // Close the progress toast
                toast.dismiss(progressId);

                // Show a success toast
                toast.success('Ebook downloaded successfully!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } catch (error) {
                console.error('Error downloading ebook:', error);
                toast.error('Error downloading ebook. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        } else {
            console.error('Ebook format not available.');
        }
    };

    return (
        <ChakraProvider resetCSS theme={customTheme}>
            <ColorModeProvider
                options={{
                    initialColorMode: 'light',
                    useSystemColorMode: true,
                }}
            >
                <GlobalStyle />
                <Flex
                    h={[null, null, '100vh']}
                    maxW="2000px"
                    flexDir={['column', 'column', 'row']}
                    overflow="hidden"
                    overscrollY="hidden"
                >
                    {isLoading ? (
                        // Render a centered loading Spinner
                        <Flex justify="center" align="center" w="100vw" h="100vh">
                            <Spinner size="xl" />
                        </Flex>
                    ) : !book ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                            <Center>
                                <Text fontSize={22} textAlign={"center"}>
                                    Something unexpected happened.
                                </Text>
                            </Center>
                        </div>
                    ) : (
                        <>
                            {/* Section Drawer */}
                            <PageDrawer />
                            {/* Main book detail Section */}
                            <AnimatedBox p={4} m={2} display="flex" flex={1} // Apply animation to this Box
                                initial={{ opacity: 0, y: -20 }} // Initial animation values
                                animate={{ opacity: 1, y: 0 }} // Animate to these values
                                transition={{ duration: 0.5 }}>
                                <Flex flexDir="column" alignItems="center" width={"50vw"}>
                                    <Flex flexDir="row" justifyContent="center">
                                        <Center>
                                            <AnimatedImage
                                                src={book.formats && book.formats['image/jpeg'] ? book.formats['image/jpeg'] : ''}
                                                alt={book.title}
                                                maxH="300px"
                                                objectFit="cover"
                                                borderRadius={8}
                                                boxShadow="md"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </Center>
                                        <Flex flexDir={"column"} justifyContent={"center"}>
                                            <Heading mt={2}
                                                fontSize="4xl"
                                                fontWeight="bold" p={5}
                                                textAlign="center"
                                            >
                                                {book.title}
                                            </Heading>
                                            <Text textAlign={"center"} fontWeight={"bold"}>
                                                By - {book.authors.map(author => author.name).join(', ')}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    {/* Add more details about the book */}
                                    <Flex flexDir="column" justifyContent="space-between" flex={1} width={"100%"}>
                                        <Button mt={4} colorScheme="teal" width={"100%"} onClick={handleDownloadEbook}>
                                            Download eBook
                                        </Button>
                                        <Card mt={5} borderRadius={8} flex={1} overflowY="auto" >
                                            {/* Render the HTML content */}
                                        </Card>
                                    </Flex>
                                </Flex>

                            </AnimatedBox>
                            {/* Other Section */}
                            <Box p={10} borderRadius={10} width={"500px"} display={"flex"} flexDir={"column"} overflowY={"auto"} maxHeight={"100%"}>
                                <Heading fontSize={25}> More from the author</Heading>
                                <MoreFromAuthor author={book.authors.map(author => author.name).join(', ')} />
                            </Box>
                        </>
                    )}
                </Flex>
                <ToastContainer />
            </ColorModeProvider>
        </ChakraProvider>
    );
};

export default BookDetail;

