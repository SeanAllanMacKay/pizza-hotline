import React from 'react';

import { Field as FormField } from 'react-final-form'

import { Input, Select} from 'antd'
import Field from '../../../components/Field'

const { Option } = Select

const required = (value) => value ? undefined : 'Required'

export default ({ values }) => {
    return (
        <>
            <FormField
                name="city"
                validate={required}
                render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                    <>
                        <Field
                            title="City"
                            error={touched && error}
                            style={{
                                margin: '0 20px 0 0'
                            }}
                        >
                            <Select
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            >
                                <Option value="winnipeg">Winnipeg</Option>
                                <Option value="brandon">Brandon</Option>
                                <Option value="steinbach">Steinbach</Option>
                                <Option value="winkler">Winkler</Option>
                                <Option value="portage_la_prairie">Portage la Prairie</Option>
                                <Option value="stonewall">Stonewall</Option>
                            </Select>
                        </Field>
                    </>
                )}
            />
        </>
    );
}