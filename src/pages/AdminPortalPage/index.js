import React, { useMemo } from 'react';
import { matchPath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { Menu, Button } from 'antd';

import {

} from '@ant-design/icons';

import Landing from './Landing'

import Pizzas from './Pizzas'
import AddOns from './AddOns'
import Specials from './Specials'
import Locations from './Locations'

const { SubMenu, Item } = Menu

export default () => {
    const history = useHistory()

    const selected = useMemo(() => {
        const match = matchPath(history.location.pathname, {
                path: `/admin-portal/:selected`,
                exact: false,
                strict: false
            })
        return match && match.params && match.params.selected
    }, [history.location.pathname])

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                minHeight: '70vh',
                backgroundColor: 'white',
                borderRadius: '10px',
                overflow: 'hidden'
            }}
        >
            <Menu
                defaultSelectedKeys={[selected]}
                mode="inline"
                style={{
                    width: '200px'
                }}
            >
                <Item
                    key="pizzas"
                    onClick={() => history.push('/admin-portal/pizzas/toppings')}
                >
                    <span>Pizzas</span>
                </Item>

                <Item
                    key="add-ons"
                    onClick={() => history.push('/admin-portal/add-ons/sides')}
                >
                    <span>Add-ons</span>
                </Item>

                <Item
                    key="specials"
                    onClick={() => history.push('/admin-portal/specials/combos')}
                >
                    <span>Specials</span>
                </Item>

                <Item
                    key="locations"
                    onClick={() => history.push('/admin-portal/locations')}
                >
                    <span>Locations</span>
                </Item>
            </Menu>

            {!selected && <Landing />}

            {selected === 'pizzas' && <Pizzas />}
            {selected === 'add-ons' && <AddOns />}
            {selected === 'specials' && <Specials />}
            {selected === 'locations' && <Locations />}
        </div>

    );
}