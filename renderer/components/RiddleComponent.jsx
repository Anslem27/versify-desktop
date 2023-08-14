import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Text, Button } from '@chakra-ui/react';

function RiddleComponent() {
    const [quote, setQuote] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false); // Add state to track answer visibility

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
        <div>
            {/* Show Spinner while loading */}
            {isLoading ? (
                <Spinner size="xs" />
            ) : (
                <div>
                    {/* Show fetched riddle */}
                    {quote.riddle && (
                        <>
                            <div>
                                <Text letterSpacing="tight" fontSize={16}>
                                    {quote.riddle}
                                </Text>
                                {/* Show answer when showAnswer is true */}
                                {showAnswer && <p style={{ fontWeight: "bold" }}>- {quote.answer}</p>}
                            </div>

                            {/* Toggle showAnswer when button is clicked */}
                            <Button mt={4} p={2} borderRadius={8} onClick={() => setShowAnswer(!showAnswer)}>
                                {showAnswer ? 'Hide answer' : 'Show answer'}
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default RiddleComponent;
