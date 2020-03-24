import React, { useState } from 'react';

import notification from '../../../../hooks/useNotification'

import upsertCrust from '../../../../actions/crusts/upsert-crust'

import { Form, Field as FormField } from 'react-final-form'
import { Input, Select, Modal } from 'antd';

import Field from '../../../../components/Field'
import Button from '../../../../components/Button'

const { Option, OptGroup } = Select

const required = (value) => value ? undefined : 'Required'

export default ({ setData }) => {
    const [open, setOpen] = useState(false)

    const onSubmit = async (values) => {
        const response = await upsertCrust(values)

        if(response.success){
            window.location.reload(false)
            setOpen(false)
        } else {
            notification({
                title: 'Error',
                type: 'error',
                message: 'There was an error adding this crust'
            })
        }
    }
    return (
        <>
            <Button
                content="New Crust"
                type="primary"
                onClick={() => setOpen(true)}
            />
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, values }) => (
                    <Modal
                        title="New Crust"
                        visible={open}
                        okText="Add Crust"
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
                                                <OptGroup label="Characteristics">
                                                    <Option value="Gluten Free">Gluten Free</Option>
                                                    <Option value="Vegetarian">Vegetarian</Option>
                                                    <Option value="Vegan">Vegan</Option>
                                                    <Option value="Whole Wheat">Whole Wheat</Option>
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