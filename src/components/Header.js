import React from 'react'
import './Header.css'
import { Dropdown,  Space } from 'antd';
import { UserOutlined, DashboardOutlined, RadarChartOutlined, ToolOutlined } from '@ant-design/icons';

const Header = () => {

    const items = [
        {
            label: 'Dashboard',
            key: '1',
            message: 'Dashboard',
            icon: <DashboardOutlined />,
        },
        {
            label: 'Docs',
            key: '2',
            message: 'Docs',
            icon: <RadarChartOutlined />,
        },
        {
            label: 'Settings',
            key: '3',
            message: 'Settings',
            icon: <ToolOutlined />,
            danger: true,
        },
    ];

    const menuProps = {
        items,
    };


    return (
        <div className='header-class-main'>
            <ul>
                <li>
                    <h1>Job Analytics</h1>
                </li>
                <li>
                    <Space wrap>
                        <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                            User
                        </Dropdown.Button>
                    </Space>
                </li>
            </ul>
        </div>
    )
}

export default Header
