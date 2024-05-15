import { Divider, List, Typography } from 'antd';

import CustomerRow from './CustomerRow';
import { CustomersListProps } from '../Types';

const CustomersList = ({ customers, customerType }:CustomersListProps) => {
   return (
    <>
        <Typography.Title level={2} >
            {customerType} Users
        </Typography.Title>
        <List
            itemLayout="horizontal"
            dataSource={customers}
            renderItem={(customer:any) => <CustomerRow key={customer.id} customer={customer}/> }
        />
        <Divider />
    </>
   )
}

export default CustomersList;