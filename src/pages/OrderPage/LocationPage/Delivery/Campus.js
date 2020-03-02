import React from 'react';

import { Field as FormField } from 'react-final-form'

import { Input } from 'antd'
import Field from '../../../../components/Field'

const required = (value) => value ? undefined : 'Required'

export default () => {
    return (
        <>
            <FormField
                name="campus_name"
                validate={required}
                render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                    <>
                        <Field
                            title="Campus Name"
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
                name="building"
                validate={required}
                render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                    <>
                        <Field
                            title="Building"
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
        </>
    );
}