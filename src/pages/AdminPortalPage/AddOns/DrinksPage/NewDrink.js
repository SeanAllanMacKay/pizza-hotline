import React, { useState } from 'react';

import notification from '../../../../hooks/useNotification'

import { Form, Field as FormField } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { Input, Select, Modal, InputNumber } from 'antd';

import Field from '../../../../components/Field'
import Button from '../../../../components/Button'

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
                mutators={{
                    ...arrayMutators
                }}
                initialValues={{
                    sizes: [
                        undefined
                    ]
                }}
                render={({
                    handleSubmit,
                    values,
                    form: {
                        mutators: { push, pop }
                    },
                }) => (
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
                                <FieldArray
                                    name="sizes"
                                >
                                    {({ fields }) => (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            {fields.map((size, index) => (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row'
                                                    }}
                                                >
                                                    <FormField
                                                        name={`${size}.name`}
                                                        validate={required}
                                                        render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                                            <>
                                                                <div
                                                                    style={{
                                                                        flex: 1
                                                                    }}
                                                                >
                                                                    <Field
                                                                        title={index === 0 ? "Size" : null}
                                                                        error={touched && error}
                                                                    >
                                                                        <Select
                                                                            onChange={onChange}
                                                                            onBlur={onBlur}
                                                                        >
                                                                            <Option value="2L">2L</Option>
                                                                            <Option value="591mL">591mL</Option>
                                                                            <Option value="Can">Can</Option>
                                                                            <Option value="547mL">547mL</Option>
                                                                        </Select>
                                                                    </Field>
                                                                </div>
                                                            </>
                                                        )}
                                                    />

                                                    <FormField
                                                        name={`${size}.code`}
                                                        render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                                            <>
                                                                <div
                                                                    style={{
                                                                        flex: 1,
                                                                        margin: '0 0 0 10px'
                                                                    }}
                                                                >
                                                                    <Field
                                                                        title={index === 0 ? "Code" : null}
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
                                                        name={`${size}.price`}
                                                        validate={required}
                                                        initialValue={0}
                                                        render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                                            <>
                                                                <div
                                                                    style={{
                                                                        flex: 1,
                                                                        margin: '0 0 0 10px'
                                                                    }}
                                                                >
                                                                    <Field
                                                                        title={index === 0 ? "Price" : null}
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
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>

                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <Button
                                    content="+ Add Size"
                                    type="link"
                                    onClick={() => push('sizes', undefined)}
                                    style={{
                                        margin: '0 10px 0 0'
                                    }}
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
                                                <Option value="Diet">Diet</Option>
                                                <Option value="Zero Sugar">Zero Sugar</Option>
                                                <Option value="Caffeine Free">Caffeine Free</Option>
                                            </Select>
                                        </Field>
                                    </>
                                )}
                            />

                            <FormField
                                name="description"
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