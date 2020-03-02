import React, { useState } from 'react';

import { Form, Field as FormField } from 'react-final-form'

import { Input, InputNumber, Checkbox } from 'antd'
import Field from '../../../components/Field'
import Button from '../../../components/Button'

const onSubmit = async (values) => {
    console.log(values)
}

const required = (value) => value ? undefined : 'Required'

export default ({ stepBack, stepForward }) => {
    const [type, setType] = useState('delivery')
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                maxWidth: '1000px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px'
            }}
        >
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
                    ORDER INFO
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
                    justifyContent: 'space-between',
                    margin: '10px 0 0 0'
                }}
            >
                <Button
                    content="Back"
                    onClick={() => stepBack()}
                />

                <Button
                    content="Next"
                    type="primary"
                    onClick={() => stepForward()}
                />
            </div>
        </div>
    );
}