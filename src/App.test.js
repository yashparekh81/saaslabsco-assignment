import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { fetchProjects } from "./services/apis";

const mockData = [
  { "s.no": 1, "percentage.funded": 186, "amt.pledged": 15283 },
  { "s.no": 2, "percentage.funded": 120, "amt.pledged": 8000 },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { "s.no": 1, "percentage.funded": 186, "amt.pledged": 15283 },
      ]),
  })
);

jest.mock("./services/apis", () => ({
  fetchProjects: jest.fn(),
}));

test("Renders data from API and displays it in the table", async () => {
  fetchProjects.mockResolvedValue(mockData);

  render(<App />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  // Wait for the data to load
  await waitFor(() => {
    expect(screen.getByText(/186%/)).toBeInTheDocument();
    expect(screen.getByText(/\$15283/)).toBeInTheDocument();
  });

  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(3); // One row for header and rest for footer
});

test("Renders table with correct data", () => {
  render(<Table data={mockData} page={1} />);

  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(mockData.length + 1);

  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("186%")).toBeInTheDocument();
  expect(screen.getByText("$15283")).toBeInTheDocument();
});

test("Renders pagination correctly and responds to clicks", () => {
  const setPage = jest.fn();
  render(<Pagination totalRecords={10} page={1} setPage={setPage} />);

  const nextButton = screen.getByText(/Next/i);
  const prevButton = screen.getByText(/Previous/i);

  expect(prevButton).toBeDisabled(); // For page 1: Previous is disabled
  fireEvent.click(nextButton);
  expect(setPage).toHaveBeenCalledWith(2);
});
