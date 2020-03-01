import React, { useMemo } from 'react';
import { matchPath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import Logo from '../Logo'
import Button from '../Button'

const { SubMenu, Item } = Menu

export default () => {
    const history = useHistory()
    const page = useMemo(() => {
        const match = matchPath(history.location.pathname, {
                path: `/:page`,
                exact: false,
                strict: false
            })
        return match && match.params && match.params.page
    }, [history.location.pathname])

    const location = useMemo(() => {
        const match = matchPath(history.location.pathname, {
                path: `/menu/:location`,
                exact: true,
                strict: false
            })
        return match && match.params && match.params.location
    }, [history.location.pathname])

    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    padding: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'whitesmoke',
                    left: '20px',
                    top: -5
                }}
            >
                <Logo
                    height='100px'
                    fill="#cd0000"
                />
            </div>

            <div
                style={{
                    height: '100px',
                    padding: '18px 0 0 0'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '0 0 0 160px',
                        backgroundColor: '#303030',
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            color: 'white',
                            padding: '15px 0',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            if(history.location.pathname !== '/'){
                                history.push('/')
                            }
                        }}
                    >
                        Pizza Hotline
                    </h1>

                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            margin: '0 0 0 75px'
                        }}
                    >
                        <Menu
                            mode="horizontal"
                            theme="dark"
                            selectedKeys={[page, location]}
                        >
                            <Item
                                key="order-online"
                                style={{
                                    height: '74px'
                                }}
                                onClick={() => {
                                    if(history.location.pathname !== '/order-online'){
                                        history.push('/order-online')
                                    }
                                }}
                            >
                                <p
                                    style={{
                                        margin: '14px 0 0 0'
                                    }}
                                >
                                    ORDER ONLINE
                                </p>
                            </Item>

                            <SubMenu
                                key="menu"
                                title={
                                    <p
                                        style={{
                                            margin: '0 0 14px 0'
                                        }}
                                    >
                                        MENU
                                    </p>
                                }
                            >
                                <Menu.Item
                                    key="winnipeg"
                                    onClick={() => {
                                        if(history.location.pathname !== '/menu/winnipeg'){
                                            history.push('/menu/winnipeg')
                                        }
                                    }}
                                >
                                    WINNIPEG
                                </Menu.Item>
                                <Menu.Item
                                    key="brandon"
                                    onClick={() => {
                                        if(history.location.pathname !== '/menu/brandon'){
                                            history.push('/menu/brandon')
                                        }
                                    }}
                                >
                                    BRANDON
                                </Menu.Item>
                                <Menu.Item
                                    key="steinbach"
                                    onClick={() => {
                                        if(history.location.pathname !== '/menu/steinbach'){
                                            history.push('/menu/steinbach')
                                        }
                                    }}
                                >
                                    STEINBACH
                                </Menu.Item>
                                <Menu.Item
                                    key="winkler-and-morden"
                                    onClick={() => {
                                        if(history.location.pathname !== '/menu/winkler-and-morden'){
                                            history.push('/menu/winkler-and-morden')
                                        }
                                    }}
                                >
                                    {'WINKLER & MORDEN'}
                                </Menu.Item>
                                <Menu.Item
                                    key="portage-la-prairie"
                                    onClick={() => {
                                        if(history.location.pathname !== '/menu/portage-la-prairie'){
                                            history.push('/menu/portage-la-prairie')
                                        }
                                    }}
                                >
                                    PORTAGE la PRAIRIE
                                </Menu.Item>
                                <Menu.Item
                                    key="stonewall"
                                    onClick={() => {
                                        if(history.location.pathname !== '/menu/stonewall'){
                                            history.push('/menu/stonewall')
                                        }
                                    }}
                                >
                                    STONEWALL
                                </Menu.Item>
                            </SubMenu>

                            <Item
                                key="gift-cards"
                                style={{
                                    height: '74px'
                                }}
                                onClick={() => {
                                    if(history.location.pathname !== '/gift-cards'){
                                        history.push('/gift-cards')
                                    }
                                }}
                            >
                                <p
                                    style={{
                                        margin: '14px 0 0 0'
                                    }}
                                >
                                    GIFT CARDS
                                </p>
                            </Item>

                            <Item
                                key="contact"
                                style={{
                                    height: '74px'
                                }}
                                onClick={() => {
                                    if(history.location.pathname !== '/contact'){
                                        history.push('/contact')
                                    }
                                }}
                            >
                                <p
                                    style={{
                                        margin: '14px 0 0 0'
                                    }}
                                >
                                    CONTACT
                                </p>
                            </Item>
                        </Menu>
                    </div>

                    <Button
                        content={<><UserOutlined /> SIGN IN</>}
                        type="link"
                    />
                </div>

            </div>
        </div>
    );
}