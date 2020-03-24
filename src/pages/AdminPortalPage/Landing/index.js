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
            <div>{'{ HELP PAGE GOES HERE }'}</div>
        </div>
    );
}