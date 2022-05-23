import { createGlobalStyle } from "styled-components";
import { THEME } from "../constants";

export default createGlobalStyle`
    html, body {
        font-family: 'Exo 2', sans-serif;
        color: ${THEME.colors.white};
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    h1, h3 {
        margin: 0.5em 0;
    }

    a {
        color: ${THEME.colors.pink}
    }
`;
