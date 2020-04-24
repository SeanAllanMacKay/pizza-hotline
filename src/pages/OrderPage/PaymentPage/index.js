import React, { useState } from 'react';

import { Form, Field as FormField } from 'react-final-form'

import { Input, InputNumber, Checkbox } from 'antd'
import Field from '../../../components/Field'
import Button from '../../../components/Button'

import {Elements} from '@stripe/react-stripe-js';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const required = (value) => value ? undefined : 'Required'

const stripePromise = loadStripe('pk_test_iRre6f6KBziQCb3bhrZsrnMG00Ioq5RPE1');

export default ({ stepBack, updatePaymentInfo, submit }) => {
    const [type, setType] = useState('online')
    const stripe = useStripe();
    const elements = useElements();
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <h2
                    style={{
                        margin: '0 15px 0 0'
                    }}
                >
                    PAYMENT INFO
                </h2>
                <div
                    style={{
                        flex: 1,
                    }}
                >
                    <div
                        style={{
                            height: '50%',
                            width: '100%',
                            borderBottom: '1px solid black'
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    padding: '20px 15px',
                }}
            >
                <Button
                    content="Pay Online"
                    type={type === 'online' ? "primary" : 'default'}
                    onClick={() => {
                        setType('online')
                    }}
                    style={{
                        flex: 1
                    }}
                />

                <Button
                    content="Pay at the Door"
                    type={type === 'door' ? "primary" : 'default'}
                    onClick={() => {
                        setType('door')
                    }}
                    style={{
                        flex: 1
                    }}
                />
            </div>

            <div
                style={{
                    padding: '20px 15px',
                    minHeight: '200px'
                }}
            >
                {type === 'online' &&
                    <Elements
                        stripe={stripePromise}
                    >
                        <CardElement />
                    </Elements>
                }

                {type === 'door' &&
                    <h3>You're good to go!</h3>
                }
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: '10px 0 0 0'
                }}
            >
                <Button
                    content="Back"
                    onClick={() => stepBack()}
                />

                <Button
                    content="Submit"
                    type="primary"
                    disabled={type !== 'door'}
                    onClick={() => {
                        updatePaymentInfo(type)
                        submit()
                    }}
                />
            </div>
        </>
    );
}