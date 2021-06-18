import App from "../App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";

test("startingAppWithoutAnyCrashes", () => {
  render(
    <Router>
      <App />
    </Router>
  );
});

test("titleIsShownCorrectly", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText("Scratch-A-Map")).toBeInTheDocument();
});
