import { render, screen } from "@testing-library/react";

import { Customer } from "../../Types";
import CustomersPage from "../../Customers/CustomersPage";
import * as GraphQL from "../../GraphQL";

const mocData: Customer[] = [
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
];

// jest.mock("../../GraphQL", () => ({
//   ...jest.requireActual("../../GraphQL"),
//   getZellerCustomers: jest
//     .fn()
//     .mockImplementation(() => Promise.resolve(mocData)),
// }));

describe("CustomersPage", () => {
  beforeAll(() => {
    jest.spyOn(GraphQL, "getZellerCustomers").mockResolvedValue(mocData);
  });
  test("Should render Admin customers by default", () => {
    render(<CustomersPage />);

    const headerElement = screen.getByText("Admin Users");
    expect(headerElement).toBeInTheDocument();

    const roleElements = screen.queryAllByText(/^ADMIN$/i);
    expect(roleElements).toHaveLength(1);
  });
  test.skip("Should render Manager customers on customer change", () => {
    render(<CustomersPage />);

    const headerElement = screen.getByText("Admin Users");
    expect(headerElement).toBeInTheDocument();

    const roleElements = screen.queryByText(/^ADMIN$/i);
    expect(roleElements).toBeNull();
  });
});
