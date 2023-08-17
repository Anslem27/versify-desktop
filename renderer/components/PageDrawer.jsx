import {
    Divider,
    Flex,
    Icon,
    Link,
    useColorMode, IconButton,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import {
    FiHome,
    FiSearch,
    FiSettings,
    FiBookmark,
    FiArrowLeft
} from "react-icons/fi";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const SqueezeIconButton = motion(IconButton);

const BackIconWrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;


const PageDrawer = () => {
    const { colorMode } = useColorMode();
    const [isMobile] = useMediaQuery("(max-width: 1024px)"); /* and tablet */
    const [isWeb] = useMediaQuery("(min-width: 1024px)"); /* 480px */
    useDisclosure();

    const drawerColor = {
        light: "#F5F5F5",
        dark: "#16181c",
    };

    return (
        <div>

            <Flex
                flexDir={["column"]}
                width={"60px"}
                alignItems="center"
                backgroundColor={drawerColor[colorMode]}
                borderRadius={10}
                padding={7}
                margin={1}
            >
                <Flex
                    flexDir="column"
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                    alignItems={"center"}
                >
                    <Flex flexDir="column" as="nav">
                        {/* BackButton */}
                        <Link
                            display={["none", "none", "flex", "flex", "flex"]}
                            href="/home"
                            _hover={{ color: "#ff4500" }}    >
                            <IconButton
                                icon={<BackIconWrapper
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                ><FiArrowLeft size={20} />
                                </BackIconWrapper>
                                }
                                fontSize={33}
                                className="active-icon"
                                borderRadius={8}
                                p={2}
                            />
                        </Link>
                        <Divider mt={[5, 5, 5]} mb={[25, 50, 50]} />
                        <Flex
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={"center"}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >
                            <Flex p={2} mr={[2, 6, 0, 0, 0]}>
                                <Link
                                    display={["none", "none", "flex", "flex", "flex"]}
                                    _hover={{ color: "#ff4500" }}    >
                                    <Icon
                                        as={FiHome}
                                        fontSize={33}
                                        className="active-icon"
                                        borderRadius={8}
                                        p={2}
                                    />
                                </Link>
                            </Flex>
                            <Flex p={2} mr={[2, 6, 0, 0, 0]}>
                                <Link
                                    display={["none", "none", "flex", "flex", "flex"]}
                                    _hover={{ color: "#ff4500" }}
                                >
                                    <Icon
                                        as={FiSearch}
                                        fontSize={33}
                                        borderRadius={8}
                                        p={2}
                                    />
                                </Link>
                            </Flex>
                            <Flex p={2} mr={[2, 6, 0, 0, 0]}>
                                <Link
                                    display={["none", "none", "flex", "flex", "flex"]}
                                    _hover={{ color: "#ff4500" }}
                                >
                                    <Icon
                                        as={FiBookmark}
                                        fontSize={33}
                                        borderRadius={8}
                                        p={2}
                                    />
                                </Link>
                            </Flex>

                            <Flex p={2} mr={[2, 6, 0, 0, 0]}>
                                <Link
                                    display={["none", "none", "flex", "flex", "flex"]}
                                    _hover={{ color: "#ff4500" }}
                                >
                                    <Icon
                                        as={FiSettings}
                                        fontSize={33}
                                        borderRadius={8}
                                        p={2}
                                    />
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/*                     <Flex flexDir="column" alignItems="center" mt={5}>
                        <Divider mt={3} mb={3} />
                        <DarkModeSwitch />
                        <Avatar size="sm" mt={3} p={1} src="avatar-1.jpg" />
                    </Flex> */}
                </Flex>
            </Flex>

        </div>
    );
};

export default PageDrawer;