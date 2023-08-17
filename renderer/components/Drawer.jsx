import {
    Avatar,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Icon,
    Image,
    Link,
    useColorMode,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import {
    FiActivity,
    FiHome,
    FiNavigation,
    FiSearch,
    FiSettings,
    FiBookmark,
    FiMessageSquare,
} from "react-icons/fi";
import DarkModeSwitch from "./DarkModeSwitch";

const AppDrawer = () => {
    const { colorMode } = useColorMode();
    const [isMobile] = useMediaQuery("(max-width: 1024px)"); /* and tablet */
    const [isWeb] = useMediaQuery("(min-width: 1024px)"); /* 480px */
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                        <Image
                            height={"auto"}
                            objectFit="cover"
                            src="/images/logo.png"
                            alt="Logo"
                            style={{
                                borderRadius: "8px"
                            }}
                        />
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
                    <Flex flexDir="column" alignItems="center" mt={5}>
                        <Divider mt={3} mb={3} />
                        <DarkModeSwitch />
                        <Avatar size="sm" mt={3} p={1} src="avatar-1.jpg" />
                    </Flex>
                </Flex>
            </Flex>

        </div>
    );
};

export default AppDrawer;