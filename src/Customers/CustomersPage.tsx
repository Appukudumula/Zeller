import { useEffect, useState } from "react";
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

  const handleCustomerTypeChange = (value: CustomerType) =>
    setSelectedCustomerType(value);

  const fetchCustomers = async () => {
    const result = await getZellerCustomers();
    setCustomers(result);
  };
  useEffect(() => {
    const filteredData = customers.filter(
      (customer: Customer) =>
        customer.role.toLowerCase() === selectedCustomerType.toLowerCase()
    );
    setFilteredCustomers(filteredData);
  }, [customers, selectedCustomerType]);

  useEffect(() => {
    fetchCustomers();
  }, []);

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
