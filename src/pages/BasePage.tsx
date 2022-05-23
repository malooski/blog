import styled from "styled-components";
import malooLogo from "../assets/Logo.png";
import { LatestsPosts } from "../components/LatestPosts";
import PopularTags from "../components/PopularTags";
import { middleChildSelector } from "../util/css";

const BorderDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: linear-gradient(
        -45deg,
        #eda3ec,
        #c765c8,
        #855cd2,
        #613fb6,
        #c765c8,
        #eda3ec,
        #f2b5cf
    );
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: stretch;
    justify-content: center;

    overflow-y: auto;
`;

const InnerDiv = styled.div`
    border-radius: 16px;
    margin: 16px;
    max-width: 1200px;
    flex-grow: 1;
    background-image: radial-gradient(#515257, #3b3846);
    background-size: cover;

    justify-self: center;

    display: grid;
    grid-template:
        "header header header" auto
        "body   body   latest-posts" 1fr
        "footer footer footer" auto
        / 1fr auto auto;

    @media (max-width: 1200px) {
        grid-template: "";
    }
`;

const LogoImg = styled.img`
    margin: 1em 0;
    width: min(90%, 900px);
`;

const HeaderDiv = styled.div`
    justify-self: center;
    grid-area: header;

    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const BodyDiv = styled.div`
    grid-area: body;
    flex-grow: 1;
    margin: 0 2em 2em 2em;

    display: flex;
    flex-direction: column;
`;

const RightPaneDiv = styled.div`
    grid-area: latest-posts;
`;

const TagsDiv = styled.div``;

const FooterDiv = styled.div`
    font-size: 8pt;

    align-self: stretch;

    display: grid;
    grid-area: footer;
    grid-template-columns: 1fr 1fr 1fr;

    *:first-child {
        justify-self: start;
    }

    *${middleChildSelector} {
        justify-self: center;
    }

    *:last-child {
        justify-self: end;
    }

    padding: 0.5em 1em;
    margin: 0 1em;
    border-top: 2px solid #7365a6;
`;

export interface BasePageProps {
    title?: string;
    children?: React.ReactNode;
}

export default function BasePage(props: BasePageProps) {
    return (
        <BorderDiv>
            <InnerDiv>
                <HeaderDiv>
                    <LogoImg loading="lazy" src={malooLogo} />
                </HeaderDiv>
                <BodyDiv>{props.children}</BodyDiv>
                <RightPaneDiv>
                    <LatestsPosts count={5} />

                    <PopularTags />
                </RightPaneDiv>

                <FooterDiv>
                    <div></div>
                    <div>
                        <span>&copy; 2022 Malooski</span>
                    </div>
                    <div></div>
                </FooterDiv>
            </InnerDiv>
        </BorderDiv>
    );
}
