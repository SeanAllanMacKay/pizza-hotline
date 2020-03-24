import React, { useMemo } from 'react';
import { matchPath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { Tabs, Table } from 'antd';

import ToppingsTab from './ToppingsTab'
import SaucesTab from './SaucesTab'
import CrustsTap from './CrustsTab'

const { TabPane } = Tabs;

export default () => {
    const history = useHistory()

    const selected = useMemo(() => {
        const match = matchPath(history.location.pathname, {
                path: `/admin-portal/pizzas/:selected`,
                exact: true,
                strict: false
            })
        return match && match.params && match.params.selected
    }, [history.location.pathname])
    return (
        <div
            style={{
                flex: 1,
                padding: '10px 20px 0 20px'
            }}
        >
            <Tabs
                defaultActiveKey={selected}
                onTabClick={(key) => history.push(`/admin-portal/pizzas/${key}`)}
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