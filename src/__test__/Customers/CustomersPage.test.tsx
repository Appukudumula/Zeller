import { render, screen, waitFor } from "@testing-library/react";

import { Customer } from "../../Types";
import CustomersPage from "../../Customers/CustomersPage";
import * as GraphQL from "../../GraphQL";
import userEvent from "@testing-library/user-event";
import { act } from "react";

const MOCK_CUSTOMERS: Customer[] = [
  {
    name: "testname1",
    role: "MANAGER",
    id: "testId1",
    email: "test2@email.com",
  },
  {
    name: "testname2",
    role: "ADMIN",
    id: "testId2",
    email: "test2@email.com",
  },
  {
    name: "testname3",
    role: "ADMIN",
    id: "testId3",
    email: "test3@email.com",
  },
  {
    name: "testname4",
    role: "MANAGER",
    id: "testId4",
    email: "test4@email.com",
  },
  {
    name: "testname5",
    role: "MANAGER",
    id: "testId5",
    email: "test5@email.com",
  },
];

describe("CustomersPage", () => {
  beforeEach(async () => {
    jest.spyOn(GraphQL, "getZellerCustomers").mockResolvedValue(MOCK_CUSTOMERS);
  });

  test("Should render Admin users by default", async () => {
    render(<CustomersPage />);

    const headerElement = screen.getByText("Admin Users");
    expect(headerElement).toBeInTheDocument();

    await waitFor(() => {
      const roleElements = screen.queryAllByText(/^ADMIN$/);
      expect(roleElements).toHaveLength(2);
    });
  });

  test("Should render Manager users on customer change", async () => {
    render(<CustomersPage />);
    const adminRadioButton = screen.getByTestId("CustomerTypeAdmin");
    expect(adminRadioButton).toBeTruthy();

    const managerRadioButton = screen.getByTestId("CustomerTypeManager");
    expect(managerRadioButton).toBeTruthy();
    act(() => {
      userEvent.click(managerRadioButton);
    });
    await waitFor(() => {
      const headerElement = screen.getByText("Manager Users");
      expect(headerElement).toBeInTheDocument();
    });
    await waitFor(() => {
      const roleElements = screen.queryAllByText(/^MANAGER$/);
      expect(roleElements).toHaveLength(3);
    });

    act(() => {
      userEvent.click(adminRadioButton);
    });
    await waitFor(() => {
      const headerElement = screen.getByText("Admin Users");
      expect(headerElement).toBeInTheDocument();
    });
    await waitFor(() => {
      const roleElements = screen.queryAllByText(/^ADMIN$/);
      expect(roleElements).toHaveLength(2); // Including radio box
    });
  });
});
