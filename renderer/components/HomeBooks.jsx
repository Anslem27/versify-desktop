import React, { useState, useEffect } from 'react';
import { Box, Text, Center, Spinner, Button, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from '@emotion/styled';

// Styled component using styled-components library
const BookCard = styled(motion.div)`
    display: inline-block;
    margin-right: 12px; /* Adjust the margin */
    max-width: 130px; /* Adjust the max-width */
    border-radius: 8px;
    overflow: hidden;
    padding: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

const Section = ({ title, books }) => {
    return (
        <div>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
                {title}
            </Text>
            <Flex style={{ overflowX: 'hidden', whiteSpace: 'nowrap', overflowY: 'hidden' }}>
                {books.slice(0, 10).map(book => (
                    <Link key={book.id} href={`/book_detail?id=${book.id}`} passHref>
                        <a>
                            <BookCard
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {book.formats && book.formats["image/jpeg"] ? (
                                    <motion.img
                                        src={book.formats["image/jpeg"]}
                                        alt={book.title}
                                        width="auto"
                                        height="80px" /* Adjust the image height */
                                        objectFit="cover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ borderRadius: '8px' }}
                                    />
                                ) : (
                                    <Box height="80px" bg="gray.200" />
                                )}
                                <Text
                                    mt={2}
                                    fontSize="xs" /* Adjust the font size */
                                    fontWeight="bold"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {book.title}
                                </Text>
                                <Text fontSize="xs">
                                    {book.authors[0].name}
                                </Text>
                            </BookCard>
                        </a>
                    </Link>
                ))}
            </Flex>
        </div>
    );
};
const HomeBooks = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [novelBooks, setNovelBooks] = useState([]);
    const [fictionBooks, setFictionBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('https://gutendex.com/books/?page=2').then(response => response.json()),
            fetch('https://gutendex.com/books/?topic=novel').then(response => response.json()),
            fetch('https://gutendex.com/books/?topic=fiction').then(response => response.json())
        ])
            .then(([featuredData, novelData, fictionData]) => {
                setFeaturedBooks(featuredData.results);
                setNovelBooks(novelData.results);
                setFictionBooks(fictionData.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <Box p={4}>
            <Section title="Featured Books" books={featuredBooks} />
            <Section title="Novel" books={novelBooks} />
            <Section title="Fiction" books={fictionBooks} />
            {isLoading && (
                <Center mt={4}>
                    <Spinner size="lg" />
                </Center>
            )}
        </Box>
    );
};

export default HomeBooks;



