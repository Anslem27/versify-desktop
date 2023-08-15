import React, { useState } from 'react'
import {
    ChakraProvider,
    ColorModeProvider,
    useColorMode,
} from "@chakra-ui/react";
import customTheme from "../styles/theme";
import { Global, css } from "@emotion/react";
import { prismLightTheme, prismDarkTheme } from "../../renderer/styles/prism";
import Explorer from '../views/explorer_view';

const GlobalStyle = ({ children }) => {
    const { colorMode } = useColorMode();
    const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)

    return (
        <>
            <Global
                styles={css`
          ${colorMode === `light` ? prismLightTheme : prismDarkTheme};
          ::selection {
            background-color: #90cdf4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === "light" ? "#edeae1" : "#000000"};
          }
        `}
            />
            {children}
        </>
    );
};

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


