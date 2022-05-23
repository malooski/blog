import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import styled from "styled-components";
import Markdown from "../components/Markdown";
import TagBadge from "../components/TagBadge";
import { PostMetadata } from "../posts";
import { useAsyncMemo } from "../util/hooks/use_async_memo";
import BasePage from "./BasePage";

const RootDiv = styled.div`
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;

    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 2em;
    margin: 0.2em 0;
    padding: 0;

    justify-self: center;
    grid-area: title;
`;

const PostInfoDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const TagsDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const DateSpan = styled.span`
    font-style: italic;
`;

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;

    padding: 1em;
    border-radius: 1em;

    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
`;
interface PostPageProps {
    post: PostMetadata;
}

async function getPostContents(contentUrl: string): Promise<string> {
    const response = await axios.get(contentUrl);

    return response.data;
}

export default function PostPage(props: PostPageProps) {
    const { post } = props;
    const text = useAsyncMemo<string>(() => getPostContents(post.contentUrl), [post.contentUrl]);
    const tags = post.tags ?? [];

    const updatedAtDate = (post.updatedAt ?? post.createdAt).toString();
    const updatedAtText = formatDistanceToNow(post.updatedAt ?? post.createdAt, {
        addSuffix: true,
    });

    return (
        <BasePage title={post.title}>
            <RootDiv>
                <HeaderDiv>
                    <Title>{post.title}</Title>
                    <PostInfoDiv>
                        <DateSpan title={updatedAtDate}>{updatedAtText}</DateSpan>
                        <TagsDiv>
                            {tags.map(t => (
                                <TagBadge tag={t} />
                            ))}
                        </TagsDiv>
                    </PostInfoDiv>
                </HeaderDiv>
                <Markdown content={text ?? ""} />
            </RootDiv>
        </BasePage>
    );
}
