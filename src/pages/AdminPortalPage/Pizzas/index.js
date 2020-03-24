import React from 'react';

import { Tabs, Table } from 'antd';

import ToppingsTab from './ToppingsTab'
import SaucesTab from './SaucesTab'
import CrustsTap from './CrustsTab'

const { TabPane } = Tabs;

export default () => {
    return (
        <div
            style={{
                flex: 1,
                padding: '10px 20px 0 20px'
            }}
        >
            <Tabs
                defaultActiveKey="toppings"
            >
                <TabPane
                    tab='Toppings'
                    key="toppings"
                >
                    <ToppingsTab />
                </TabPane>

                <TabPane
                    tab='Sauces'
                    key="sauces"
                >
                    <SaucesTab />
                </TabPane>

                <TabPane
                    tab='Crusts'
                    key="crusts"
                >
                    <CrustsTap />
                </TabPane>

                <TabPane
                    tab='Specialty Pizzas'
                    key="specialty-pizzas"
                />
            </Tabs>
        </div>
    );
}