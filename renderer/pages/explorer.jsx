import React from 'react'
import {
    ChakraProvider,
    ColorModeProvider,
} from "@chakra-ui/react";
import customTheme from "../styles/theme";
import Explorer from '../views/explorer_view';
import GlobalStyle from '../styles/global';

export default function ExplorerPage({ Component, pageProps }) {
    return (
        <ChakraProvider resetCSS theme={customTheme}>
            <ColorModeProvider
                options={{
                    initialColorMode: "light",
                    useSystemColorMode: true,
                }}
            >
                <GlobalStyle>
                    <Explorer />
                </GlobalStyle>
            </ColorModeProvider>
        </ChakraProvider>
    );
}


