import { sortBy, take } from "lodash";
import { useMemo } from "react";
import styled from "styled-components";
import { POSTS } from "../posts";
import PostList from "./PostList";

const LatestPostsDiv = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: latest-posts;
    padding: 1.25em;
    margin: 0 2em 2em 0em;
    border-radius: 2em;
    border: 1px solid #646075;

    background-color: #3b3846;

    font-size: 0.8em;

    & > h3 {
        margin: 0 0 0.5em 0;
        padding: 0;

        text-align: center;
    }
`;

export interface LatestPostsProps {
    count: number;
}

export function LatestsPosts(props: LatestPostsProps) {
    const latestPosts = useMemo(() => getLatestPosts(props.count), [props.count]);

    return (
        <LatestPostsDiv>
            <h3>Latest Posts</h3>
            <PostList posts={latestPosts} />
        </LatestPostsDiv>
    );
}

function getLatestPosts(count: number) {
    return take(
        sortBy(POSTS, p => p.createdAt),
        count
    );
}
