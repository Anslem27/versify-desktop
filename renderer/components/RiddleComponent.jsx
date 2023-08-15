import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Text, Button, Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';

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
        <Box

        >
            {/* Show Spinner while loading */}
            {isLoading ? (
                <Spinner size="xs" />
            ) : (
                <div>
                    {/* Show fetched riddle */}
                    {quote.riddle && (
                        <>
                            <Flex
                                justify='center'
                                direction='column'
                                align='center'
                                bgColor={"#ff4500"}
                                borderRadius='10px'
                                m={3}
                                position='relative'>
                                <Flex
                                    direction='column'
                                    mb='12px'
                                    align='center'
                                    justify='center'
                                    px='15px'
                                    pt='55px'>
                                    <img src='images/riddle.png' height={"20"}></img>
                                    <Text
                                        fontSize={{ base: "lg", xl: "18px" }}
                                        color='white'
                                        fontWeight='bold'
                                        lineHeight='150%'
                                        textAlign='center'
                                        px='10px'
                                        mt="10px"
                                        mb='6px'>
                                        {quote.riddle}
                                    </Text>
                                    {showAnswer &&
                                        <Text
                                            fontSize='14px'
                                            color={"white"}
                                            fontWeight='500'
                                            px='10px'
                                            mb='6px'
                                            textColor={"green.100"}
                                            textAlign='center'>
                                            {quote.answer}
                                        </Text>
                                    }
                                </Flex>

                                <Button
                                    bg='whiteAlpha.300'
                                    _hover={{ bg: "whiteAlpha.200" }}
                                    _active={{ bg: "whiteAlpha.100" }}
                                    mb={{ sm: "16px", xl: "24px" }}
                                    color={"white"}
                                    fontWeight='regular'
                                    fontSize='sm'
                                    minW='185px'
                                    onClick={() => setShowAnswer(!showAnswer)}
                                    mx='auto'>
                                    Show Answer
                                </Button>

                            </Flex>
                        </>
                    )}
                </div>
            )}
        </Box>
    );
}

export default RiddleComponent;
