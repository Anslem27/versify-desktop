import React, { useState } from 'react'
import {
    Flex,
    Heading,
    Text,
    IconButton, Button,
    Divider,
    Input, useColorMode,
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiChevronDown,
    FiChevronUp, FiArrowUpRight
} from "react-icons/fi"
import { SearchIcon } from "@chakra-ui/icons";
import RandomPoemComponent from './RandomPoemComponent';
import HomeBooks from './HomeBooks';
import FeedBooksSection from '../sections/FeedBooks';

const ExplorerSection = () => {

    const { colorMode } = useColorMode();
    const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)

    const themeColor = {
        light: "#F5F5F5",
        dark: "#0d1117",
    };
    return (
        <Flex
            w={["100%", "60%", "60%", "55%"]}
            minW={[null, null, "60%", "60%"]}
            p={3}
            m={1.5}
            flexDir="column"
            overflow="auto"
            minH="100vh"
            borderRadius={8}
            overscrollY={"hidden"}
            backgroundColor={themeColor[colorMode]}
        >
            {/* Search Bar */}
            <Flex justify="space-between" alignItems="center" mb={4}>

                <Flex alignItems="center">
                    <Flex
                        rounded="full"
                        p={2}
                        mr={2}
                    >
                        <SearchIcon />
                    </Flex>
                    <Input
                        type="text"
                        placeholder="Search book name, author or edition..."
                        size="sm"
                        rounded="full"
                        pr={4}
                        width={"500px"}
                    />
                </Flex>
            </Flex>
            <Heading
                fontWeight="normal"
                mb={4}
                letterSpacing="tight"
            >
                Explorer Collection
            </Heading>
            <FeedBooksSection />

        </Flex >
    )
}

export default ExplorerSection