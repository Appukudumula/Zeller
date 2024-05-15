export enum CustomerType {
    Admin = "Admin",
    Manager = "Manager",
}

export type Customer = {
    id: string
    name: string
    role: string
    email: string
}

export type CustomerTypeSelectionProps = {
    handleCustomerTypeChange: (value: CustomerType) => void
    selectedCustomerType: CustomerType
}

export type CustomersListProps = {
    customers: Customer[]
    customerType: CustomerType
}

export type CustomerRowProps = {
    customer: Customer
}