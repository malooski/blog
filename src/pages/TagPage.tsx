import { useMemo } from "react";
import styled from "styled-components";
import PostList from "../components/PostList";
import { POSTS } from "../posts";
import BasePage from "./BasePage";

export interface TagPageProps {
    tag: string;
}

const RootDiv = styled.div`
    max-width: 32em;
    display: flex;
    flex-direction: column;

    justify-self: center;

    align-items: center;
`;

function getTaggedPosts(tag: string) {
    return POSTS.filter(post => post.tags?.includes(tag));
}

export default function TagsPage(props: TagPageProps) {
    const { tag } = props;
    const matchedPosts = useMemo(() => getTaggedPosts(tag), [tag]);

    return (
        <BasePage>
            <RootDiv>
                <h1>Tag: {tag}</h1>
                <PostList posts={matchedPosts} />
            </RootDiv>
        </BasePage>
    );
}
