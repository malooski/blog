import { Link } from "react-router-dom";
import styled from "styled-components";

export interface TagBadgeProps {
    tag: string;
    text?: string;
}

const Span = styled(Link)`
    font-size: 0.75em;
    padding: 0.3em 0.6em;
    background-color: #7365a6;
    color: white;
    border-radius: 1em;
`;

export default function TagBadge(props: TagBadgeProps) {
    const { tag, text } = props;

    return <Span to={`/tag/${tag}`}>{text ?? tag}</Span>;
}
