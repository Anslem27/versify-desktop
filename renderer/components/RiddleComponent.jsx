import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Spinner, Text, Button, Box, Flex, Stack,
    List,
    ListItem,
    ListIcon, useColorModeValue, Center
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'

function RiddleComponent() {
    const [quote, setQuote] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        async function fetchRandomQuote() {
            try {
                const response = await axios.get('https://riddles-api.vercel.app/random');
                const data = response.data;
                console.log('Fetched data:', data);
                setQuote(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching riddle:', error);
                setIsLoading(false);
            }
        }

        fetchRandomQuote();
    }, []);

    return (
        <Box>
            {/* Show Spinner while loading */}
            {isLoading ? (
                <Spinner size="xs" />
            ) : (
                <div>
                    {/* Show fetched riddle */}
                    {quote.riddle && (
                        <>
                            <Center py={6}>
                                <Box
                                    maxW={'330px'}
                                    w={'full'}
                                    bg={useColorModeValue('white', 'gray.800')}
                                    boxShadow={'2xl'}
                                    rounded={'md'}
                                    overflow={'hidden'}>
                                    <Stack
                                        textAlign={'center'}
                                        p={6}
                                        color={useColorModeValue('gray.800', 'white')}
                                        align={'center'}>
                                        <Text
                                            fontSize={'sm'}
                                            fontWeight={500}
                                            bg={useColorModeValue('green.50', 'green.900')}
                                            p={2}
                                            px={3}
                                            color={'green.500'}
                                            rounded={'full'}>
                                            Riddle me this...
                                        </Text>
                                        <Stack direction={'row'} align={'center'} justify={'center'}>
                                            <Text fontSize={'3xl'}>-</Text>
                                            {showAnswer && (
                                                <Text fontSize={'xl'} fontWeight={800}>
                                                    {quote.answer}
                                                </Text>

                                            )}
                                            {!showAnswer && (
                                                <Text color="green.400">Answer is hidden</Text>
                                            )}
                                        </Stack>
                                    </Stack>

                                    <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                                        {quote.riddle}

                                        <Button
                                            mt={10}
                                            w={'full'}
                                            bg={'green.400'}
                                            color={'white'}
                                            rounded={'xl'}
                                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                            _hover={{
                                                bg: 'green.500',
                                            }}
                                            onClick={() => setShowAnswer(!showAnswer)}
                                            _focus={{
                                                bg: 'green.500',
                                            }}>
                                            Show Answer
                                        </Button>
                                    </Box>
                                </Box>
                            </Center>
                        </>
                    )}
                </div>
            )}
        </Box>
    );
}

export default RiddleComponent;
