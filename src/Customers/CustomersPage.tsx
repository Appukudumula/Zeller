import { useCallback, useEffect, useState } from "react";
import { Col, Row } from "antd";

import CustomerTypeSelection from "./CustomerTypeSelection";
import CustomersList from "./CustomersList";
import { getZellerCustomers } from "../GraphQL";
import { Customer, CustomerType } from "../Types";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomerType, setSelectedCustomerType] =
    useState<CustomerType>(CustomerType.Admin);

  const filterCustomers = (
    curCustomers: Customer[],
    curCustomerType: CustomerType
  ) => {
    const filteredData = curCustomers.filter(
      (customer: Customer) =>
        customer.role.toLowerCase() === curCustomerType.toLowerCase()
    );
    setFilteredCustomers(filteredData);
  };

  const handleCustomerTypeChange = (value: CustomerType) => {
    setSelectedCustomerType(value);
    filterCustomers(customers, value);
  };

  const fetchCustomers = useCallback(async () => {
    const result = await getZellerCustomers();
    console.log("result", result);
    setCustomers(result);
    filterCustomers(result, selectedCustomerType);
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <Row gutter={[16, 16]}>
      <Col sm={24} md={{ span: 12, offset: 6 }} style={{ padding: 20 }}>
        <CustomerTypeSelection
          handleCustomerTypeChange={handleCustomerTypeChange}
          selectedCustomerType={selectedCustomerType}
        />
        <CustomersList
          customers={filteredCustomers}
          customerType={selectedCustomerType}
        />
      </Col>
    </Row>
  );
};
export default CustomersPage;
