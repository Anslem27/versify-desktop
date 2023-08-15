import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Grid, Link, Spinner } from '@chakra-ui/react';
import xml2js from 'xml2js';
import CategoryFeed from "../models/feedbooks";

const FeedBooksSection = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://catalog.feedbooks.com/publicdomain/browse/top.atom')
            .then(response => response.text())
            .then(data => {
                const parser = new xml2js.Parser();
                parser.parseString(data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML:', err);
                        setLoading(false);
                        return;
                    }

                    const feed = new CategoryFeed(result.feed); // Use the model to parse the data
                    const entries = feed.feed.entry;
                    const bookList = entries.map(entry => ({
                        title: entry.title.t,
                        author: entry.author.name.t,
                        image: entry.link.find(link => link.rel === 'http://opds-spec.org/image').href,
                        downloadLink: entry.link.find(link => link.rel === 'application/epub+zip').href,
                    }));

                    setBooks(bookList);
                    setLoading(false);
                });
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }, []);

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={4} p={4}>
            {loading ? (
                <Box gridColumn="1 / -1" textAlign="center">
                    <Spinner size="lg" />
                </Box>
            ) : (

                books.map((book, index) => (
                    <Box key={index} borderWidth="1px" rounded="md" p={2} boxShadow="md">
                        <Image src={book.image} alt={book.title} maxH="200px" objectFit="cover" borderRadius={8} />
                        <Text mt={2} fontSize="sm" fontWeight="bold">
                            {book.title}
                        </Text>
                        <Text fontSize="sm">Author: {book.author}</Text>
                        <Link href={book.downloadLink} mt={2} color="blue.500" fontSize="sm" fontWeight="bold">
                            Download
                        </Link>
                    </Box>
                ))
            )}
        </Grid>
    );
};

export default FeedBooksSection;
