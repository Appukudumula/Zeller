import { render, screen } from "@testing-library/react";
import CustomerRow from "../../Customers/CustomerRow";
import { Customer } from "../../Types";

describe("CustomerRow", () => {
  test("Should render customer", () => {
    const customer: Customer = {
      name: "testname",
      role: "MANAGER",
      id: "testId",
      email: "test@email.com",
    };
    render(<CustomerRow customer={customer} />);

    const nameElement = screen.getByText(customer.name);
    expect(nameElement).toBeInTheDocument();

    const roleElement = screen.getByText(customer.role);
    expect(roleElement).toBeInTheDocument();
  });
});
