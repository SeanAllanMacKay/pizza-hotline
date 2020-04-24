import React, { useState, useContext } from 'react';
import AccountContext from '../../context/AccountContext'
import CurrentOrderContext from '../../context/CurrentOrderContext'
import useCurrentOrder from '../../hooks/useCurrentOrder'

import { Form, Field as FormField } from 'react-final-form'
import arrayMutators from 'final-form-arrays'

import notification from '../../hooks/useNotification'

import ContactPage from './ContactPage'
import LocationPage from './LocationPage'
import OrderPage from './OrderPage'
import PaymentPage from './PaymentPage'

import { Steps, Drawer } from 'antd'
import { ShoppingCartOutlined, CloseCircleFilled } from '@ant-design/icons';

import Button from '../../components/Button'

const { Step } = Steps

const onSubmit = (values) => {
    console.log(values)
}

export default () => {
    const { account } = useContext(AccountContext)
    const { currentOrder } = useContext(CurrentOrderContext)

    const { setCurrentOrder } = useCurrentOrder()

    const [stepCount, setStepCount] = useState(0)
    const [orderOpen, setOrderOpen] = useState(false)

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={currentOrder}
            mutators={{
                ...arrayMutators
            }}
            render={({
                handleSubmit,
                values,
                form: {
                    mutators: { push, pop }
                },
            }) => (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                maxWidth: '1000px',
                                padding: '20px 35px 20px 20px',
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            { stepCount === 0 &&
                                <ContactPage
                                    stepForward={() => setStepCount(1)}
                                    contactInfo={values.contactInfo}
                                    setContactInfo={(newContactInfo) => {
                                        values.contactInfo = newContactInfo
                                        setCurrentOrder(values)
                                    }}
                                    account={account}
                                />
                            }

                            { stepCount === 1 &&
                                <LocationPage
                                    stepBack={() => setStepCount(0)}
                                    stepForward={() => {setStepCount(2)}}
                                    locationInfo={values.locationInfo}
                                    setLocationInfo={(newLocationInfo) => {
                                        values.locationInfo = newLocationInfo
                                        setCurrentOrder(values)
                                    }}
                                />
                            }

                            { stepCount === 2 &&
                                <OrderPage
                                    stepBack={() => setStepCount(1)}
                                    stepForward={() => setStepCount(3)}
                                    account={account}
                                    orderInfo={values.orderInfo}
                                    setOrderInfo={({ orderInfo }) => {
                                        values.orderInfo = orderInfo
                                        setCurrentOrder(values)
                                        notification({
                                            title: 'Pizza Added to Order',
                                            type: 'success',
                                            message: <>You can view the order by clicking the <ShoppingCartOutlined /> button</>
                                        })
                                    }}
                                />
                            }

                            { stepCount === 3 &&
                                <PaymentPage
                                    stepBack={() => setStepCount(2)}
                                    updatePaymentInfo={(type) => { values.paymentInfo = { paid: type === 'door' ? false : true } }}
                                    submit={handleSubmit}
                                />
                            }

                            { values.contactInfo &&
                                <Button
                                    content={<ShoppingCartOutlined style={{ fontSize: '20px' }}/>}
                                    type="primary"
                                    onClick={() => setOrderOpen(true)}
                                    style={{
                                        position: 'absolute',
                                        right: '0',
                                        top: '40%',
                                        height: '100px',
                                        width: '30px',
                                        padding: '0'
                                    }}
                                    tooltip="View Order"
                                />
                            }

                            <Drawer
                                title="Your Order"
                                placement="right"
                                closable={true}
                                visible={orderOpen}
                                onClose={() => setOrderOpen(false)}
                                getContainer={false}
                                width={350}
                                style={{
                                    position: 'absolute',
                                }}
                            >
                                {values.orderInfo &&
                                    <div
                                        style={{
                                            margin: '0 0 15px 0'
                                        }}
                                    >
                                        <h4
                                            style={{
                                                borderBottom: '1px solid lightgrey'
                                            }}
                                        >
                                            Order Info
                                        </h4>

                                        {values.orderInfo.pizzas &&
                                            <>
                                                {values.orderInfo.pizzas.map(({ size, crust, sauce, toppings }, index) => (
                                                    <>
                                                        <Button
                                                            type="link"
                                                            content={<CloseCircleFilled />}
                                                            onClick={() => {
                                                                values.orderInfo.pizzas.splice(index, 1)
                                                            }}
                                                        />
                                                        {size.name} {crust.name} crust on {sauce.name}
                                                        {toppings && toppings.map(({ topping: { name }, extra }) => (
                                                            <p
                                                                style={{
                                                                    margin: 0,
                                                                    padding: '0 0 0 35px'
                                                                }}
                                                            >
                                                                {extra ? 'Extra ' : ''}{name}
                                                            </p>
                                                        ))}
                                                    </>
                                                ))}
                                            </>
                                        }
                                    </div>
                                }

                                {values.locationInfo &&
                                    <div
                                        style={{
                                            margin: '0 0 15px 0'
                                        }}
                                    >
                                        <h4
                                            style={{
                                                borderBottom: '1px solid lightgrey'
                                            }}
                                        >
                                            Location Info
                                        </h4>
                                        {Object.entries(values.locationInfo).map(([key, value]) => (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                {key}
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        borderBottom: '1px dashed lightgrey',
                                                        height: '17px',
                                                        margin: '0 5px'
                                                    }}
                                                />
                                                {value}
                                            </div>
                                        ))}
                                    </div>
                                }

                                {values.contactInfo &&
                                    <div
                                        style={{
                                            margin: '0 0 15px 0'
                                        }}
                                    >
                                        <h4
                                            style={{
                                                borderBottom: '1px solid lightgrey'
                                            }}
                                        >
                                            Contact Info
                                        </h4>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            Name:
                                            <div
                                                style={{
                                                    flex: 1,
                                                    borderBottom: '1px dashed lightgrey',
                                                    height: '17px',
                                                    margin: '0 5px'
                                                }}
                                            />
                                            {`${values.contactInfo.first_name} ${values.contactInfo.last_name}`}
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            Email:
                                            <div
                                                style={{
                                                    flex: 1,
                                                    borderBottom: '1px dashed lightgrey',
                                                    height: '17px',
                                                    margin: '0 5px'
                                                }}
                                            />
                                            {values.contactInfo.email}
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            Phone Number:
                                            <div
                                                style={{
                                                    flex: 1,
                                                    borderBottom: '1px dashed lightgrey',
                                                    height: '17px',
                                                    margin: '0 5px'
                                                }}
                                            />
                                            {values.contactInfo.phone_number}
                                        </div>
                                    </div>
                                }
                            </Drawer>
                        </div>
                    </div>

                    <div
                        style={{
                            margin: '40px 0 0 0',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <Steps
                            current={stepCount}
                            style={{
                                maxWidth: '1000px',
                            }}
                        >
                            <Step
                                title="Contact Info"
                                description="Who are you?"
                            />

                            <Step
                                title="Location Info"
                                description="Where are you?"
                            />

                            <Step
                                title="Order Info"
                                description="What do you want?"
                            />

                            <Step
                                title="Payment Info"
                                description="How do you want to pay?"
                            />
                        </Steps>
                    </div>

                </div>
            )}
        />


    );
}