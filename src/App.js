import React, { useEffect, useState } from "react";
import { useParams, withRouter, BrowserRouter, Route } from "react-router-dom";

export class PostsAPI {
  static get() {
    return new Promise((resolve) =>
      resolve({
        title: "Foo Bar",
        content: "Foo Bar Baz",
      })
    );
  }
}

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    PostsAPI.get(id).then(setPost);
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export const RefactoredPost = withRouter(
  ({
    match: {
      params: { id },
    },
  }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
      PostsAPI.get(id).then(setPost);
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
  }
);

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/posts/:id">
        <Post />
      </Route>
    </BrowserRouter>
  );
}
