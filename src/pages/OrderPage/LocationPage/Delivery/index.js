import React from 'react';

import { Field as FormField } from 'react-final-form'

import { Input, Select} from 'antd'
import Field from '../../../../components/Field'

import House from './House'
import Apartment from './Apartment'
import Business from './Business'
import Hotel from './Hotel'
import Campus from './Campus'
import Dormitory from './Dormitory'
import Base from './Base'

const { Option } = Select

const required = (value) => value ? undefined : 'Required'

export default ({ values }) => {
    return (
        <>
            <FormField
                name="city"
                validate={required}
                initialValue="winnipeg"
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

            <FormField
                name="address_type"
                validate={required}
                initialValue="apartment"
                render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                    <>
                        <Field
                            title="Type"
                            error={touched && error}
                        >
                            <Select
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            >
                                <Option value="house">House</Option>
                                <Option value="apartment">Apartment</Option>
                                <Option value="business">Business</Option>
                                <Option value="hotel">Hotel</Option>
                                <Option value="campus">Campus</Option>
                                <Option value="dormitory">Dormitory</Option>
                                <Option value="base">Base</Option>
                            </Select>
                        </Field>
                    </>
                )}
            />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <FormField
                    name="address"
                    validate={required}
                    initialValue="232 Princess St"
                    render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                        <>
                            <Field
                                title="Address"
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

                {values.address_type === 'house' && <House />}
                {values.address_type === 'apartment' && <Apartment />}
                {values.address_type === 'hotel' && <Hotel />}
            </div>

            {values.address_type === 'business' && <Business />}
            {values.address_type === 'campus' && <Campus />}
            {values.address_type === 'dormitory' && <Dormitory />}
            {values.address_type === 'base' && <Base />}
        </>
    );
}