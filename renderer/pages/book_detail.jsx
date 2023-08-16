import React, { useState, useEffect } from 'react';
import { ChakraProvider, ColorModeProvider, Flex, Box, Image, Text, Spinner, Center, Heading, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import customTheme from '../styles/theme';
import { Global } from '@emotion/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageDrawer from '../components/PageDrawer';
import GlobalStyle from '../styles/global';
const { remote } = require('electron');
const fs = require('fs');
const path = require('path');

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
                        <div>Book not found</div>
                    ) : (
                        <>
                            {/* Section Drawer */}
                            <PageDrawer />
                            {/* Main book detail Section */}
                            <Box p={4}>
                                <Flex flexDir="column" alignItems="center">
                                    <Flex flexDir="row" justifyContent="center">
                                        <Center>
                                            <Image
                                                src={book.formats && book.formats['image/jpeg'] ? book.formats['image/jpeg'] : ''}
                                                alt={book.title}
                                                maxH="250px"
                                                objectFit="cover"
                                                borderRadius={8}
                                                boxShadow="md"
                                            />
                                        </Center>
                                        <Heading mt={2} fontSize="4xl" fontWeight="bold" p={5} w={200} textAlign="center">
                                            {book.title}
                                        </Heading>
                                    </Flex>
                                    <Text fontSize="sm">{book.id}</Text>
                                </Flex>
                                {/* Add more details about the book */}
                                <Button mt={4} colorScheme="teal" onClick={handleDownloadEbook}>
                                    Download eBook
                                </Button>
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