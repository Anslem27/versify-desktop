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
import Link from 'next/link';

const MoreFromAuthor = ({ author }) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://gutendex.com/books?search=' + author)
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
                <Flex justify="center" width={"auto"}>
                    <Grid
                        templateColumns={{
                            base: 'repeat(3, minmax(200px, 1fr)))',
                            sm: 'repeat(3, minmax(200px, 1fr)))',
                            md: "repeat(2, minmax(200px, 1fr))",
                        }}
                        gap={4}
                        minChildWidth="300px"
                        autoRows="minmax(240px, 1fr)"
                    >
                        {books.map(book => (
                            <GridItem key={book.id}>
                                <Link href={`/book_detail?id=${book.id}`} passHref>
                                    <a>
                                        <Box
                                            rounded="md"
                                            p={2}
                                            alignItems="center"
                                            cursor="pointer"
                                        >
                                            {book.formats && book.formats["image/jpeg"] ? (
                                                <Image
                                                    src={book.formats["image/jpeg"]}
                                                    alt={book.title}
                                                    maxH="200px"
                                                    objectFit="cover"
                                                    borderRadius={8}
                                                    boxShadow="md"
                                                    onLoad={() => setIsLoading(false)}
                                                />
                                            ) : (
                                                <Box height="180px" bg="gray.200" borderRadius={8} />
                                            )}
                                            <Text
                                                mt={2}
                                                fontSize="sm"
                                                fontWeight="bold"
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: "hidden"
                                                }}
                                            >
                                                {book.title}
                                            </Text>
                                            <Text fontSize="sm">{book.authors[0].name}</Text>
                                        </Box>
                                    </a>
                                </Link>
                            </GridItem>
                        ))}
                    </Grid>
                </Flex>
            )}
        </Box>
    );
}

export default MoreFromAuthor