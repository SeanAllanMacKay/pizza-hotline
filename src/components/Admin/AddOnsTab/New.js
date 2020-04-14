import React, { useState } from 'react';

import notification from '../../../hooks/useNotification'

import { Form, Field as FormField } from 'react-final-form'
import { Input, Select, Modal, InputNumber } from 'antd';

import Field from '../../Field'
import Button from '../../Button'

const { Option, OptGroup } = Select

const required = (value) => value ? undefined : 'Required'

export default ({ type, upsert }) => {
    const [open, setOpen] = useState(false)

    const onSubmit = async (values) => {
        const response = await upsert(values)

        if(response.success){
            window.location.reload(false)
            setOpen(false)
        } else {
            notification({
                title: 'Error',
                type: 'error',
                message: 'There was an error adding this side'
            })
        }
    }
    return (
        <>
            <Button
                content={`New ${type}`}
                type="primary"
                onClick={() => setOpen(true)}
            />
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, values }) => (
                    <Modal
                        title={`New ${type}`}
                        visible={open}
                        okText={`Add ${type}`}
                        onOk={handleSubmit}
                        onCancel={() => setOpen(false)}
                        destroyOnClose
                    >

                        <div
                            style={{
                                width: '100%',
                                borderRadius: '5px',
                                padding: '10px 20px'
                            }}
                        >
                            <FormField
                                name="name"
                                validate={required}
                                render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                    <>
                                        <Field
                                            title="Name"
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

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                            >
                                <FormField
                                    name="code"
                                    validate={required}
                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                        <>
                                            <div
                                                style={{
                                                    flex: 1
                                                }}
                                            >
                                                <Field
                                                    title="Code"
                                                    error={touched && error}

                                                >
                                                    <Input
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}

                                                    />
                                                </Field>
                                            </div>

                                        </>
                                    )}
                                />

                                <FormField
                                    name="price"
                                    validate={required}
                                    initialValue={0}
                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                        <>
                                            <div
                                                style={{
                                                    flex: 1,
                                                    margin: '0 0 0 20px'
                                                }}
                                            >
                                                <Field
                                                    title="Price"
                                                    error={touched && error}
                                                >
                                                    <InputNumber
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        min={0}
                                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                        step={0.25}
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    />
                                                </Field>
                                            </div>

                                        </>
                                    )}
                                />
                            </div>

                            <FormField
                                name="tags"
                                render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                    <>
                                        <Field
                                            title="Tags"
                                            error={touched && error}
                                        >
                                            <Select
                                                value={value ? value.filter(tag => tag !== '') : []}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                mode="multiple"
                                                tokenSeparators={[',']}
                                            >
                                                <OptGroup label="Type">
                                                    <Option value="Meat">Meat</Option>
                                                    <Option value="Vegetable">Vegetable</Option>
                                                    <Option value="Cheese">Cheese</Option>
                                                    <Option value="Seafood">Seafood</Option>
                                                </OptGroup>

                                                <OptGroup label="Characteristics">
                                                    <Option value="Gluten Free">Gluten Free</Option>
                                                    <Option value="Vegetarian">Vegetarian</Option>
                                                    <Option value="Vegan">Vegan</Option>
                                                </OptGroup>
                                            </Select>
                                        </Field>
                                    </>
                                )}
                            />

                            <FormField
                                name="description"
                                validate={required}
                                render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                    <>
                                        <Field
                                            title="Description"
                                            error={touched && error}
                                        >
                                            <Input.TextArea
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                            />
                                        </Field>
                                    </>
                                )}
                            />
                        </div>
                    </Modal>
                )}
            />
        </>
    );
}