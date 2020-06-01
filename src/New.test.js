import React from "react";
import { render } from "@testing-library/react";
import { Post, RefactoredPost, PostsAPI } from "./App";
import { MemoryRouter, Route } from "react-router-dom";

function getSpy() {
  return jest.spyOn(PostsAPI, "get").mockImplementationOnce(
    () =>
      new Promise((resolve) =>
        resolve({
          title: "Hello World!",
          content: "My first post.",
        })
      )
  );
}

afterEach(() => {
  jest.clearAllMocks();
});

it("passes before refactoring", async () => {
  const spy = getSpy();

  const { findByText } = render(
    <MemoryRouter initialEntries={["/posts/590"]}>
      <Route path="/posts/:id">
        <Post />
      </Route>
    </MemoryRouter>
  );

  await findByText("Hello World!");
  await findByText("My first post.");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith("590");
});

it("passes after refactoring", async () => {
  const spy = getSpy();

  const { findByText } = render(
    <MemoryRouter initialEntries={["/posts/590"]}>
      <Route path="/posts/:id">
        <RefactoredPost />
      </Route>
    </MemoryRouter>
  );

  await findByText("Hello World!");
  await findByText("My first post.");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith("590");
});
