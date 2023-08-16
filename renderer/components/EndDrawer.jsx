import React from 'react';
import { Button, Flex, Heading, useColorMode, Text } from '@chakra-ui/react';
import RiddleComponent from './RiddleComponent';
import SavedPoems from './SavedPoems';
import styled from '@emotion/styled';
/* 
Hide overflow scroll but maintain scroll behaviour
 */
const ScrollableContainer = styled(Flex)`
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 11 */
    ::-webkit-scrollbar {
        width: 0; /* Safari and Chrome */
    }
`;

const EndDrawer = () => {
    const { colorMode } = useColorMode();
    const themeColor = {
        light: "#F5F5F5",
        dark: "#0d1117",
    };

    return (
        <ScrollableContainer
            w={["100%", "100%", "20%"]}
            bgColor={themeColor[colorMode]}
            p={3}
            m={1.5}
            borderRadius={8}
            flexDir="column"
            minW={[null, null, "350px", "300px", "350px"]}
        >
            <Heading letterSpacing="tight" fontSize={15}>Riddle me this.</Heading>
            {/* Riddle here */}
            <RiddleComponent />
            <SavedPoems />
        </ScrollableContainer>
    );
}

export default EndDrawer;
