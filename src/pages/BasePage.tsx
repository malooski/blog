import { sortBy, take } from "lodash";
import { useMemo } from "react";
import styled from "styled-components";
import malooLogo from "../assets/Logo.png";
import PostList from "../components/PostList";
import { POSTS } from "../posts";
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
`;

const LatestPostsDiv = styled.div`
    grid-area: latest-posts;

    & > div {
        display: flex;
        flex-direction: column;
        grid-area: latest-posts;
        padding: 1.25em;
        margin: 0 2em 2em 0em;
        border-radius: 2em;
        border: 1px solid #646075;

        background-color: #3b3846;

        & > h3 {
            margin: 0 0 0.5em 0;
            padding: 0;

            text-align: center;
        }
    }
`;

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
    const latestPosts = useMemo(
        () =>
            take(
                sortBy(POSTS, p => p.updatedAt ?? p.createdAt),
                5
            ),
        []
    );

    return (
        <BorderDiv>
            <InnerDiv>
                <HeaderDiv>
                    <LogoImg loading="lazy" src={malooLogo} />
                </HeaderDiv>
                <BodyDiv>{props.children}</BodyDiv>
                <LatestPostsDiv>
                    <div>
                        <h3>Latest Posts</h3>
                        <PostList posts={latestPosts} />
                    </div>
                </LatestPostsDiv>

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
