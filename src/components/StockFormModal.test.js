import { render, screen, fireEvent } from "@testing-library/react";
import StockFormModal from "./StockFormModal";

test("shows validation errors when saving empty form", () => {
  render(
    <StockFormModal
      open={true}
      onClose={() => {}}
      onSave={() => {}}
      initialData={null}
    />
  );

  fireEvent.click(screen.getByRole("button", { name: /save/i }));

  expect(screen.getByText(/Ticker is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Company name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Quantity must be > 0/i)).toBeInTheDocument();
  expect(screen.getByText(/Purchase price must be > 0/i)).toBeInTheDocument();
  expect(screen.getByText(/Purchase date is required/i)).toBeInTheDocument();
});