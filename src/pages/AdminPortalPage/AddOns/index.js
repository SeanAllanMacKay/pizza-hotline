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
                path: `/admin-portal/add-ons/:selected`,
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
                onTabClick={(key) => history.push(`/admin-portal/add-ons/${key}`)}
            >
                <TabPane
                    tab='Sides'
                    key="sides"
                />

                <TabPane
                    tab='Drinks'
                    key="drinks"
                />

                <TabPane
                    tab='Wings'
                    key="wings"
                />

                <TabPane
                    tab='Salads'
                    key="salads"
                />

                <TabPane
                    tab='Deserts'
                    key="deserts"
                />
            </Tabs>
        </div>
    );
}