import React from 'react'
import { Button, Flex, Heading, useColorMode } from '@chakra-ui/react'
import RiddleComponent from './RiddleComponent';

const EndDrawer = () => {
    const { colorMode } = useColorMode();
    const themeColor = {
        light: "#Fdfcf7",
        dark: "#16181c",
    };
    return (
        <Flex
            w={["100%", "100%", "40%"]}
            bgColor={themeColor}
            p="3%"
            flexDir="column"
            overflow="auto"
            minW={[null, null, "350px", "300px", "500px"]}
        >
            <Flex alignContent="center">
            </Flex>
            <Heading letterSpacing="tight" fontSize={15}>Riddle me this.</Heading>
            {/* Riddle here */}
            <RiddleComponent />
            <Button mt={4} p={7} borderRadius={15}>Get the Mobile App</Button>
        </Flex>
    )
}

export default EndDrawer