import React, { useMemo, useState, useContext } from 'react';
import { matchPath } from 'react-router'
import { useHistory } from 'react-router-dom'
import login from '../../actions/account/login'

import AccountContext from '../../context/AccountContext'

import { Form, Field as FormField } from 'react-final-form'
import { Menu, Popover, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import notification from '../../hooks/useNotification'
import { setToken, removeToken } from '../../hooks/useCookies'

import Logo from '../Logo'
import Button from '../Button'
import Field from '../Field'

const { SubMenu, Item } = Menu

const required = (value) => value ? undefined : 'Required'

const onSubmit = async (values) => {
    const response = await login(values)

    if(!response.error){
        setToken(response.token)
        window.location.reload()
    } else {
        notification({
            title: 'Error',
            type: 'error',
            message: `${response.error}`
        })
    }
}

export default () => {
    const { account } = useContext(AccountContext)

    const [passwordVisible, setPasswordVisible] = useState(false)

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

                    {
                        account ?
                            <Popover
                                trigger="click"
                                placement="bottomRight"
                                title={`${account.first_name} ${account.last_name}`}
                                content={
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <div
                                            style={{
                                                margin: '0 0 10px 0',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {account && account.admin &&
                                                <Button
                                                    content="Admin Portal"
                                                    type="link"
                                                    onClick={() => {
                                                        if(history.location.pathname !== '/admin-portal'){
                                                            history.push('/admin-portal')
                                                        }
                                                    }}
                                                />
                                            }

                                        </div>
                                        <Button
                                            content="Log Out"
                                            type="primary"
                                            onClick={() => {
                                                removeToken()
                                                window.location.reload()
                                            }}
                                        />
                                    </div>
                                }
                            >
                                <Button
                                    content={<UserOutlined style={{ fontSize: '20px' }} />}
                                    type="link"
                                />
                            </Popover>
                            :
                            <Popover
                                content={
                                    <Form
                                        onSubmit={onSubmit}
                                        render={({ handleSubmit }) => (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    padding: '15px',
                                                    width: '300px'
                                                }}
                                            >
                                                <FormField
                                                    name="email"
                                                    validate={required}
                                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                                        <>
                                                            <Field
                                                                title="Email"
                                                                error={touched && error}
                                                            >
                                                                <Input
                                                                    value={value}
                                                                    onChange={onChange}
                                                                    onBlur={onBlur}
                                                                />
                                                            </Field>
                                                        </>
                                                    )}
                                                />

                                                <FormField
                                                    name="password"
                                                    validate={required}
                                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                                        <>
                                                            <Field
                                                                title="Password"
                                                                error={touched && error}
                                                                actions={
                                                                    <Button
                                                                        content={passwordVisible ? "Hide" : "Show"}
                                                                        type='link'
                                                                        onClick={() => value && setPasswordVisible(!passwordVisible)}
                                                                        style={{
                                                                            color: 'black'
                                                                        }}
                                                                    />
                                                                }
                                                            >
                                                                <Input
                                                                    value={value}
                                                                    onChange={onChange}
                                                                    onBlur={onBlur}
                                                                    type={passwordVisible ? "" : "password"}
                                                                />
                                                            </Field>
                                                        </>
                                                    )}
                                                />

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-end',
                                                        margin: '10px 0 0 0'
                                                    }}
                                                >
                                                    <Button
                                                        content="Log In"
                                                        type="primary"
                                                        onClick={() => handleSubmit()}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    />
                                }
                                title="Log in"
                                trigger="click"
                                placement="bottomRight"
                            >
                                <Button
                                    content="LOG IN"
                                    type="link"
                                />
                            </Popover>
                    }



                </div>

            </div>
        </div>
    );
}
