import React, { useMemo } from 'react';
import { matchPath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { Tabs } from 'antd';

import {  } from 'antd';

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
                defaultActiveKey="sides"
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