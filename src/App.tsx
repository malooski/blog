import { last, sortBy, uniq } from "lodash";
import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { POSTS } from "./posts";

const PostPage = lazy(() => import("./pages/PostPage"));
const TagPage = lazy(() => import("./pages/TagPage"));

function App() {
    const latestPost = last(sortBy(POSTS, p => p.createdAt))!;
    const allTags = uniq(POSTS.map(p => p.tags ?? []).flat());

    return (
        <Router>
            <Routes>
                <Route index element={<Navigate to={`/post/${latestPost.plug}`} />} />

                {allTags.map(t => (
                    <Route
                        path={`/tag/${t}`}
                        element={
                            <Suspense fallback="Loading...">
                                <TagPage tag={t} />
                            </Suspense>
                        }
                    />
                ))}

                {POSTS.map(post => (
                    <Route
                        path={`/post/${post.plug}`}
                        element={
                            <Suspense fallback="Loading...">
                                <PostPage post={post} />
                            </Suspense>
                        }
                    />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
