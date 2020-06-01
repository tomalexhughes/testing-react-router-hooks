import React from "react";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom";
import { Post, RefactoredPost, PostsAPI } from "./App";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "590",
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

it("passes before refactoring", async () => {
  const spy = jest.spyOn(PostsAPI, "get").mockImplementationOnce(
    () =>
      new Promise((resolve) =>
        resolve({
          title: "Hello World!",
          content: "My first post.",
        })
      )
  );

  const { findByText } = render(
    <StaticRouter>
      <Post />
    </StaticRouter>
  );

  await findByText("Hello World!");
  await findByText("My first post.");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith("590");
});

// We expect this test to fail as the test is tied to mocking the hook
it("passes after refactoring", async () => {
  const spy = jest.spyOn(PostsAPI, "get").mockImplementationOnce(
    () =>
      new Promise((resolve) =>
        resolve({
          title: "Hello World!",
          content: "My first post.",
        })
      )
  );

  const { findByText } = render(
    <StaticRouter>
      <RefactoredPost />
    </StaticRouter>
  );

  await findByText("Hello World!");
  await findByText("My first post.");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith("590");
});
