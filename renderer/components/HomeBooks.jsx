import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    GridItem,
    Image,
    Text,
    Center,
    Spinner,
    Flex
} from '@chakra-ui/react';

const HomeBooks = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://gutendex.com/books/?page=2')
            .then(response => response.json())
            .then(data => {
                setBooks(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <Box p={4}>
            {isLoading ? (
                <Center height="400px">
                    <Spinner size="lg" />
                </Center>
            ) : (
                <Flex justify="center"> {/* Flex container */}
                    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} minChildWidth="300px">
                        {books.map(book => (
                            <GridItem key={book.id}>
                                <Box rounded="md" p={2} alignItems="center">
                                    {book.formats && book.formats["image/jpeg"] ? (
                                        <Image
                                            src={book.formats["image/jpeg"]}
                                            alt={book.title}
                                            maxH="180px"
                                            objectFit="cover"
                                            borderRadius={8}
                                            boxShadow="md"
                                            onLoad={() => setIsLoading(false)}
                                        />
                                    ) : (
                                        <Box height="180px" bg="gray.200" borderRadius={8} />
                                    )}
                                    <Text mt={2}
                                        fontSize="sm"
                                        fontWeight="bold"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: "hidden"
                                        }}>
                                        {book.title}
                                    </Text>
                                    <Text fontSize="sm">{book.authors[0].name}</Text>
                                </Box>
                            </GridItem>
                        ))}
                    </Grid>
                </Flex>
            )}
        </Box>
    );
};

export default HomeBooks;
