import { Avatar, List } from "antd";

import { CustomerRowProps } from "../Types";

const CustomerRow = ({ customer }:CustomerRowProps) => (
    <List.Item>
        <List.Item.Meta
            avatar={<Avatar shape='square' style={{ backgroundColor: '#1677ff' }}>{customer.name[0]}</Avatar>}
            title={customer.name}
            description={customer.role}
        />
    </List.Item>
);

export default CustomerRow;