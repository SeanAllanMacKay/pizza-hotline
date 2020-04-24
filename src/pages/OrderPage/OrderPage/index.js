import React, { useState } from 'react';

import { Form, Field as FormField, FormSpy } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

import { Input, InputNumber, Checkbox, Radio, Drawer } from 'antd'

import Field from '../../../components/Field'
import Button from '../../../components/Button'

import AddPizza from './AddPizza'

const required = (value) => value ? undefined : 'Required'

export default ({ stepBack, stepForward, orderInfo, setOrderInfo }) => {
    const [current, setCurrent] = useState('pizzas')

    const onSubmit = async (values) => {
        setOrderInfo(values)
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{
                orderInfo: {
                    pizzas: []
                }
            }}
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

                    <Radio.Group
                        value={current}
                        buttonStyle="solid"
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '20px 15px'
                        }}
                        onChange={({ target: { value } }) => setCurrent(value)}
                    >
                        <Radio.Button
                            value="pizzas"
                            style={{
                                flex: 1,
                                textAlign: 'center'
                            }}
                        >
                            Pizzas
                        </Radio.Button>
                        <Radio.Button
                            value="drinks"
                            style={{
                                flex: 1,
                                textAlign: 'center'
                            }}
                        >
                            Drinks
                        </Radio.Button>
                        <Radio.Button
                            value="sides"
                            style={{
                                flex: 1,
                                textAlign: 'center'
                            }}
                        >
                            Sides
                        </Radio.Button>
                        <Radio.Button
                            value="wings"
                            style={{
                                flex: 1,
                                textAlign: 'center'
                            }}
                        >
                            Wings
                        </Radio.Button>
                        <Radio.Button
                            value="Salads"
                            style={{
                                flex: 1,
                                textAlign: 'center'
                            }}
                        >
                            Salads
                        </Radio.Button>
                        <Radio.Button
                            value="desserts"
                            style={{
                                flex: 1,
                                textAlign: 'center'
                            }}
                        >
                            Desserts
                        </Radio.Button>
                    </Radio.Group>

                    <div
                        style={{
                            padding: '15px'
                        }}
                    >

                        { current === 'pizzas' ?
                            <AddPizza
                                updateOrder={(newPizza) => {
                                    values.orderInfo.pizzas.push(newPizza)
                                    setOrderInfo(values)
                                }}
                            />
                            :
                            null
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
                            content="Next"
                            type="primary"
                            disabled={!(orderInfo && orderInfo.pizzas && orderInfo.pizzas.length > 0)}
                            onClick={() => stepForward()}
                        />
                    </div>
                </>
            )}
        />

    );
}