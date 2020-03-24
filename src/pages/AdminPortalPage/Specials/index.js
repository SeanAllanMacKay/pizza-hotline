import React, { useMemo } from 'react';
import { matchPath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { Tabs } from 'antd';

import {  } from 'antd';

const { TabPane } = Tabs;

export default () => {
    const history = useHistory()

    const selected = useMemo(() => {
        const match = matchPath(history.location.pathname, {
                path: `/admin-portal/specials/:selected`,
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
                onTabClick={(key) => history.push(`/admin-portal/specials/${key}`)}
            >
                <TabPane
                    tab='Combos'
                    key="combos"
                />

                <TabPane
                    tab='Coupons'
                    key="coupons"
                />

                <TabPane
                    tab='Promos'
                    key="promos"
                />
            </Tabs>
        </div>
    );
}