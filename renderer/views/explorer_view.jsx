import React, { useState, useEffect } from 'react';
import {
    Flex,
    useColorMode,
    Spinner
} from '@chakra-ui/react';
import MidSection from '../components/MidSection';
import { useRouter } from 'next/router';
import PageDrawer from '../components/PageDrawer';
import ExplorerSection from '../components/ExplorerSection';
const Explorer = () => {

    const { colorMode } = useColorMode();
    const [display, changeDisplay] = useState('hide');
    const [value, changeValue] = useState(1);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Simulate checking a Google URL
        setTimeout(() => {
            setLoading(false);

            // Navigate to the desired page after a delay
            setTimeout(() => {
                /* Push somewhere necessary */
                // router.push('/desired-page');
            }, 2000); // Adjust the delay as needed
        }, 3000); // Simulate loading time

    }, []);

    return (

        <Flex
            h={[null, null, "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
            overscrollY={"hidden"}
        >
            {loading ? (
                <Flex justify="center" align="center" w="100vw" h="100vh">
                    <Spinner size="xl" />
                </Flex>
            ) : (
                <>
                    <PageDrawer />
                    <ExplorerSection />
                </>
            )}
        </Flex>

    )
}

export default Explorer