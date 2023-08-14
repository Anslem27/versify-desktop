import React, { useState } from 'react'
import {
    Flex,
    Heading,
    Avatar,
    Text,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Input, useColorMode,
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiChevronDown,
    FiChevronUp
} from "react-icons/fi"
import { SearchIcon } from "@chakra-ui/icons";
import RandomPoemComponent from './RandomPoemComponent';


const MidSection = () => {
    const { colorMode } = useColorMode();
    const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)

    const themeColor = {
        light: "#Fdfcf7",
        dark: "#16181c",
    };
    return (
        <Flex
            w={["100%", "100%", "60%", "60%", "55%"]}
            p="3%"
            flexDir="column"
            overflow="auto"
            minH="100vh"
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
                Happy Reading, <Flex display="inline-flex" fontWeight="bold">Calvin</Flex>
            </Heading>


            <Text fontWeight="bold" fontSize="xl">Keep the story Going</Text>
            <Text letterSpacing="tight" fontSize={13}>
                Don't let the story end just ye. Continue reading your last book and immerse
                your'self in the world of literature.
            </Text>

            {/* Poetry and Pending Books */}
            <Flex justifyContent="space-between" mt={8}>
                <Flex align="flex-end">
                    <Heading as="h2" size="lg" letterSpacing="tight">Poetry</Heading>
                    <Text fontSize="small" color="gray" ml={4}>sonnets, Odes and more</Text>
                </Flex>
                <IconButton icon={<FiCalendar />} />
            </Flex>

            {/* Poems */}
            <Flex flexDir="column">
                <Flex overflow="hidden">

                    <RandomPoemComponent />
                    {display == 'show' &&
                        <></>
                    }
                </Flex>
                <Flex align="center">
                    <Divider />
                    <IconButton
                        icon={display == 'show' ? <FiChevronUp /> : <FiChevronDown />}
                        onClick={() => {
                            if (display == 'show') {
                                changeDisplay('none')
                            } else {
                                changeDisplay('show')
                            }
                        }}
                    />
                    <Divider />
                </Flex>
            </Flex>
        </Flex >
    )
}

export default MidSection