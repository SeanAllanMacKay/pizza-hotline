import React, { useState, useEffect } from 'react';

import { Form, Field as FormField } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

import notification from '../../../hooks/useNotification'
import getCrusts from '../../../actions/crusts/get-crusts'
import getSauces from '../../../actions/sauces/get-sauces'
import getToppings from '../../../actions/toppings/get-toppings'

import { Input, InputNumber, Checkbox, Select, Radio } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons';
import Field from '../../../components/Field'
import Button from '../../../components/Button'

const { Option } = Select

const required = (value) => value ? undefined : 'Required'

export default ({ updateOrder }) => {
    const [crusts, setCrusts] = useState(null)
    const [sauces, setSauces] = useState(null)
    const [toppings, setToppings] = useState(null)

    const onSubmit = ({ size, sauce, crust, ...rest }) => {
        const chosenSauce = sauces.find((item) => item.id === sauce)
        const chosenSize = crust.sizes.find((item) => item.id === size)
        updateOrder({
            size: chosenSize,
            sauce: chosenSauce,
            crust,
            ...rest
        })
    }

    useEffect(() => {
        (async () => {
            const crustResponse = await getCrusts()
            const saucesResponse = await getSauces()
            const toppingsResponse = await getToppings()

            if(crustResponse.success){
                setCrusts(crustResponse.crusts)
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: `There was an error fetching the crusts`
                })
            }

            if(saucesResponse.success){
                setSauces(saucesResponse.sauces)
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: `There was an error fetching the sauces`
                })
            }

            if(toppingsResponse.success){
                setToppings(toppingsResponse.toppings)
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: `There was an error fetching the toppings`
                })
            }
        })()
    }, [])

    return (
        <Form
            onSubmit={onSubmit}
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
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <div
                        style={{
                            height: '300px',
                            width: '300px',
                            backgroundColor: 'lightgrey',
                            margin: '0 30px 0 0'
                        }}
                    >
                        { values.crust &&
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundImage: `url(${values.crust.image})`
                                }}
                            >
                                Test
                            </div>
                        }

                    </div>

                    <div
                        style={{
                            flex: '1'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <FormField
                                name="crust"
                                validate={required}
                                render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                    <>
                                        <Field
                                            title="Crust"
                                            error={touched && error}
                                            style={{
                                                margin: '0 15px 0 0'
                                            }}
                                        >
                                            <Select
                                                value={value.id}
                                                onChange={(newValue) => {
                                                    const crust = crusts.find(crust => crust.id === newValue)
                                                    if(crust.sizes.length === 1){
                                                        values.size = crust.sizes[0].id
                                                    } else {
                                                        values.size = null
                                                    }
                                                    onChange(crust)
                                                }}
                                            >
                                                {crusts && crusts.map(({ name, id }) => (
                                                    <Option value={id}>{name}</Option>
                                                ))}
                                            </Select>
                                        </Field>
                                    </>
                                )}
                            />

                            <FormField
                                name="size"
                                validate={required}
                                render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                    <>
                                        <Field
                                            title="Size"
                                            error={touched && error}
                                            style={{
                                                width: '200px'
                                            }}
                                        >
                                            <Select
                                                value={value}
                                                onChange={onChange}
                                            >
                                                {values.crust && values.crust.sizes.map(({ name, id, size }) => (
                                                    <Option value={id}>{values.crust.sizes.length > 1 ? `${name}` : `${size}"`}</Option>
                                                ))}
                                            </Select>
                                        </Field>
                                    </>
                                )}
                            />

                        </div>


                        <FormField
                            name="sauce"
                            validate={required}
                            render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                <>
                                    <Field
                                        title="Sauce"
                                        error={touched && error}
                                    >
                                        <Select
                                            value={value}
                                            onChange={onChange}
                                        >
                                            {sauces && sauces.map(({ name, id }) => (
                                                <Option value={id}>{name}</Option>
                                            ))}
                                        </Select>
                                    </Field>
                                </>
                            )}
                        />

                        <FieldArray
                            name="toppings"
                        >
                            {({ fields }) => (
                                <>
                                    <Field
                                        title={
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                Toppings

                                                <Button
                                                    content={'Add Topping'}
                                                    type="link"
                                                    onClick={() => fields.push({ topping: null, coverage: 'full', extra: false })}
                                                />
                                            </div>
                                        }
                                    >
                                        {fields.map((topping, index) => (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <FormField
                                                    name={`${topping}.topping`}
                                                    validate={required}
                                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                                        <Field
                                                            error={touched && error}
                                                            style={{
                                                                flex: 3,
                                                                margin: '0 15px 0 0'
                                                            }}
                                                        >
                                                            <Select
                                                                showSearch
                                                                filterOption={(input, option) =>
                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                                value={value.id}
                                                                onChange={(newValue) => {
                                                                    const topping = toppings.find(topping => topping.id === newValue)
                                                                    onChange(topping)
                                                                }}
                                                            >
                                                                {toppings && toppings.map(({ name, id }) => (
                                                                    <Option value={id}>{name}</Option>
                                                                ))}
                                                            </Select>
                                                        </Field>
                                                    )}
                                                />

                                                <FormField
                                                    name={`${topping}.coverage`}
                                                    validate={required}
                                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                                        <Field
                                                            error={touched && error}
                                                            style={{
                                                                width: '150px',
                                                                margin: '0 10px 0 0'
                                                            }}
                                                        >
                                                            <Radio.Group
                                                                value={value}
                                                                style={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                }}
                                                                onChange={({ target: { value } }) => onChange(value)}
                                                            >
                                                                <Radio.Button
                                                                    value="left"
                                                                    style={{
                                                                        flex: 1,
                                                                        textAlign: 'center'
                                                                    }}
                                                                >
                                                                    <svg height="30" width="15">
                                                                        <circle cx="15" cy="15" r="8" fill='red' />
                                                                    </svg>
                                                                </Radio.Button>
                                                                <Radio.Button
                                                                    value="full"
                                                                    style={{
                                                                        flex: 1,
                                                                        textAlign: 'center'
                                                                    }}
                                                                >
                                                                    <svg height="30" width="30">
                                                                        <circle cx="15" cy="15" r="8" fill='red' />
                                                                    </svg>
                                                                </Radio.Button>
                                                                <Radio.Button
                                                                    value="right"
                                                                    style={{
                                                                        flex: 1,
                                                                        textAlign: 'center'
                                                                    }}
                                                                >
                                                                    <svg height="30" width="15">
                                                                        <circle cx="0" cy="15" r="8" fill='red' />
                                                                    </svg>
                                                                </Radio.Button>
                                                            </Radio.Group>
                                                        </Field>
                                                    )}
                                                />
                                                <Field
                                                    style={{
                                                        width: '40px'
                                                    }}
                                                >
                                                    <Button
                                                        content={<CloseCircleFilled />}
                                                        type="link"
                                                        onClick={() => fields.remove(index)}
                                                    />
                                                </Field>

                                            </div>
                                        ))}
                                    </Field>
                                </>
                            )}
                        </FieldArray>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                margin: '30px 0 0 0'
                            }}
                        >
                            <Button
                                content={'Add Pizza to Order'}
                                type="primary"
                                onClick={handleSubmit}
                                disabled={!values.crust || !values.size || !values.sauce}
                                style={{
                                    minWidth: '250px'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        />

    );
}