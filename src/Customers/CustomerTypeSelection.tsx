import { Divider, Radio, RadioChangeEvent, Space, Typography } from 'antd';

import {  CustomerTypeSelectionProps, CustomerType } from '../Types';

const CustomerTypeSelection = ({ handleCustomerTypeChange, selectedCustomerType}: CustomerTypeSelectionProps) => {
    const handleChange = (e: RadioChangeEvent) => handleCustomerTypeChange(e.target.value)

    return (
        <>
            <Typography.Title level={2} >
                User Types
            </Typography.Title>
            <Radio.Group onChange={handleChange} value={selectedCustomerType}>
            <Space direction="vertical">
                <Radio value={CustomerType.Admin}>{CustomerType.Admin}</Radio>
                <Radio value={CustomerType.Manager}>{CustomerType.Manager}</Radio>
            </Space>
            </Radio.Group>
            <Divider />
        </>
   )
}

export default CustomerTypeSelection;