import { sortBy } from "lodash";
import { useMemo } from "react";
import styled from "styled-components";
import { POSTS } from "../posts";
import TagBadge from "./TagBadge";

const RootDiv = styled.div`
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
`;
const TagsDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25em;
`;

function countTags() {
    const map = new Map<string, number>();
    for (const post of POSTS) {
        for (const tag of post.tags ?? []) {
            const count = map.get(tag) ?? 0;
            map.set(tag, count + 1);
        }
    }
    const entries = [...map.entries()].map(([tag, count]) => ({ tag, count }));
    return sortBy(entries, e => e.count).reverse();
}

export default function PopularTags() {
    const tagCount = useMemo(() => countTags(), []);

    return (
        <RootDiv>
            <h3>Popular Tags</h3>
            <TagsDiv>
                {tagCount.map(tag => (
                    <TagBadge tag={tag.tag} text={`${tag.tag} (${tag.count})`} />
                ))}
            </TagsDiv>
        </RootDiv>
    );
}
