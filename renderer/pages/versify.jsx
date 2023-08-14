import React, { useState } from 'react'
import {
    Flex,
    useColorMode

} from '@chakra-ui/react'
import AppDrawer from '../components/Drawer'
import EndDrawer from '../components/EndDrawer';
import MidSection from '../components/MidSection';

export default function VersifyApp() {
    const { colorMode } = useColorMode();
    const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)

    const themeColor = {
        light: "#Fdfcf7",
        dark: "#16181c",
    };
    return (
        <Flex
            h={[null, null, "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
        >
            {/* Column 1 */}
            <AppDrawer />

            {/* Column 2 */}
            <MidSection />

            {/* Column 3 */}
            <EndDrawer />
        </Flex>
    )
}