import { last, sortBy } from "lodash";
import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { POSTS } from "./posts";

const PostPage = lazy(() => import("./pages/PostPage"));

function App() {
    const latestPost = last(sortBy(POSTS, p => p.createdAt))!;

    return (
        <Router>
            <Routes>
                <Route index element={<Navigate to={`/post/${latestPost.plug}`} />} />

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
