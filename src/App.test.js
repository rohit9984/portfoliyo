import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the hero heading and contact email", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { level: 1, name: /rohit maurya/i })
  ).toBeInTheDocument();

  expect(
    screen.getAllByRole("link", { name: /mauryarohitkumar36@gmail.com/i }).length
  ).toBeGreaterThan(0);
});
