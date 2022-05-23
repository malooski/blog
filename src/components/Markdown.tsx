import { lazy, Suspense } from "react";
import { CodeComponent } from "react-markdown/lib/ast-to-react";

import highlighterStyle from "react-syntax-highlighter/dist/esm/styles/prism/darcula";

const ReactMarkdown = lazy(() => import("react-markdown"));
const SyntaxHighlighter = lazy(() =>
    import("react-syntax-highlighter").then(rsh => ({ default: rsh.PrismAsync }))
);

export interface MarkdownProps {
    content: string;
}

const CODE_COMPONENT: CodeComponent = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
        <Suspense
            fallback={
                <code className={className} {...props}>
                    {children}
                </code>
            }
        >
            <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={highlighterStyle}
                PreTag="div"
            />
        </Suspense>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    );
};

export default function Markdown(props: MarkdownProps) {
    const { content } = props;
    return (
        <Suspense fallback={content}>
            <ReactMarkdown
                components={{
                    code: CODE_COMPONENT,
                }}
            >
                {content}
            </ReactMarkdown>
        </Suspense>
    );
}
