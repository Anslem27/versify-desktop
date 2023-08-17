import React, { useState } from 'react'
import {
    Flex,
    Heading,
    Text,
    IconButton, Button,
    Divider,
    Input, useColorMode, Stack, VStack, useBreakpointValue
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiChevronDown,
    FiChevronUp, FiArrowUpRight
} from "react-icons/fi"
import { SearchIcon } from "@chakra-ui/icons";
import RandomPoemComponent from './RandomPoemComponent';
import HomeBooks from './HomeBooks';
import Link from 'next/link';

const MidSection = () => {
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
            <Flex
                w={'full'}
                h={'100vh'}
                borderRadius={8}
                backgroundImage={
                    'url(https://th.bing.com/th/id/OIP.hsFL2YJDYegKjEcMwzYDngHaE8?pid=ImgDet&w=1152&h=768&rs=1)'
                }
                backgroundSize={'cover'}
                backgroundPosition={'center center'}>
                <VStack
                    w={'full'}
                    justify={'center'}
                    p={useBreakpointValue({ base: 4, md: 8 })}
                    borderRadius={8}
                    border={`2px solid transparent, linear-gradient(to right, black, transparent)`}
                    bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
                >
                    <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                        <Text
                            color={"white"}
                            fontWeight={700}
                            lineHeight={1.2}
                            fontSize={useBreakpointValue({ base: '2xl', md: '2xl' })}>
                            Don't let the story end just yet. Continue reading your last book and immerse
                            your'self in the world of literature.
                        </Text>
                        <Stack direction={'row'}>
                            <Link href="/explorer" passHref>
                                <Button
                                    width={180}
                                    borderRadius={20}
                                    background="black"
                                    textColor="white"
                                    p={3}
                                    mt={8}
                                    rightIcon={<FiArrowUpRight color="#ff4500" size={20} />}
                                >
                                    Explorer
                                </Button>
                            </Link>
                            <Button
                                bg={"#ff4500"}
                                rounded={'full'}
                                color={'white'}
                                _hover={{ bg: 'whiteAlpha.500' }}
                                p={3}
                                mt={8}
                            >
                                Get the mobile app
                            </Button>
                        </Stack>
                    </Stack>
                </VStack>
            </Flex>

            {/*Gutendex Books */}
            <Flex justifyContent="space-between" mt={8}>
                <Flex align="flex-end">
                    <Heading as="h2" size="sm" letterSpacing="tight">Book Collection</Heading>
                </Flex>
                {/* <IconButton icon={<FiCalendar />} /> */}
            </Flex>
            <HomeBooks />

            <Flex justifyContent="space-between" mt={8}>
                <Flex align="flex-end">
                    <Heading as="h2" size="sm" letterSpacing="tight">Poetry</Heading>
                    <Text fontSize="small" color="gray" ml={4}>sonnets, Odes and more</Text>
                </Flex>
                {/* <IconButton icon={<FiCalendar />} /> */}
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
