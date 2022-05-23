import { formatDistanceToNow } from "date-fns/esm";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostMetadata } from "../posts";

export interface PostListProps {
    posts: PostMetadata[];
}

const RootDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 0.3em 1em;
`;

const TitleSpan = styled.span``;

export default function PostList(props: PostListProps) {
    const { posts } = props;
    return <RootDiv>{posts.map(p => renderPostListItem(p))}</RootDiv>;

    function renderPostListItem(post: PostMetadata) {
        const timeDistance = formatDistanceToNow(post.createdAt, { addSuffix: true });

        return (
            <Fragment>
                <Link to={`/post/${post.plug}`}>
                    <TitleSpan>{post.title}</TitleSpan>
                </Link>

                <span>{timeDistance}</span>
            </Fragment>
        );
    }
}

export interface PostListItemProps {
    post: PostMetadata;
}
