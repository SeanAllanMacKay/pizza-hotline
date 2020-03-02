import React from 'react';

import { Field as FormField } from 'react-final-form'

import { Input, InputNumber } from 'antd'
import Field from '../../../../components/Field'

const required = (value) => value ? undefined : 'Required'

export default () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <FormField
                    name="dormitory_name"
                    validate={required}
                    render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                        <>
                            <Field
                                title="Dormitory Name"
                                error={touched && error}
                                style={{
                                    flex: 7
                                }}
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
                    name="room"
                    validate={required}
                    render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                        <>
                            <Field
                                title="Room #"
                                error={touched && error}
                                style={{
                                    margin: '0 0 0 20px',
                                    flex: 1
                                }}
                            >
                                <InputNumber
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </Field>
                        </>
                    )}
                />
            </div>
        </>
    );
}