import { render, screen } from "@testing-library/react";
import { Customer, CustomerType } from "../../Types";
import CustomersList from "../../Customers/CustomersList";

describe("CustomersList", () => {
  test("Should render customers", () => {
    const customers: Customer[] = [
      {
        name: "testname1",
        role: "MANAGER",
        id: "testId1",
        email: "test2@email.com",
      },
      {
        name: "testname2",
        role: "MANAGER",
        id: "testId2",
        email: "test2@email.com",
      },
    ];
    render(
      <CustomersList
        customers={customers}
        customerType={CustomerType.Manager}
      />
    );

    const headerElement = screen.getByText("Manager Users");
    expect(headerElement).toBeInTheDocument();

    customers.map((customer) => {
      const nameElement = screen.getByText(customer.name);
      expect(nameElement).toBeInTheDocument();
    });

    const roleElements = screen.getAllByText("MANAGER");
    expect(roleElements).toHaveLength(2);
  });

  test("Should render no customers", () => {
    const customers: Customer[] = [];
    render(
      <CustomersList customers={customers} customerType={CustomerType.Admin} />
    );

    const headerElement = screen.getByText("Admin Users");
    expect(headerElement).toBeInTheDocument();

    const roleElements = screen.queryByText(/^ADMIN$/i);
    expect(roleElements).toBeNull();
  });
});
