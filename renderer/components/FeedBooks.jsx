import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Grid, Link } from '@chakra-ui/react';

const BookBrowser = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('https://catalog.feedbooks.com/publicdomain/browse/top.atom')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'text/xml');
                const entries = xmlDoc.getElementsByTagName('entry');

                const bookList = Array.from(entries).map(entry => {
                    return {
                        title: entry.querySelector('title').textContent,
                        author: entry.querySelector('author name').textContent,
                        image: entry.querySelector('link[rel="http://opds-spec.org/image"]').getAttribute('href'),
                        downloadLink: entry.querySelector('link[rel="application/epub+zip"]').getAttribute('href')
                    };
                });

                setBooks(bookList);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={4} p={4}>
            {books.map((book, index) => (
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
            ))}
        </Grid>
    );
};

export default BookBrowser;
