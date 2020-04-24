import React, { useState } from 'react';

import notification from '../../../hooks/useNotification'

import { Form, Field as FormField } from 'react-final-form'
import { Input, Select, Modal, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import Field from '../../Field'
import Button from '../../Button'
import FileUpload from '../../FileUpload'

import { getToken } from '../../../hooks/useCookies'



const { Option, OptGroup } = Select

const required = (value) => value ? undefined : 'Required'

export default ({ type, upsert, tags, pizzaSizes }) => {
    const [open, setOpen] = useState(false)

    const onSubmit = async ({ image: { file }, ...rest }) => {
        const response = await upsert({
            ...rest,
            image: file
        })

        if(response.success){
            window.location.reload(false)
            setOpen(false)
        } else {
            notification({
                title: 'Error',
                type: 'error',
                message: `There was an error adding this ${type}`
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

                            {pizzaSizes.length ?
                                <FormField
                                    name="sizes"
                                    validate={required}
                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                        <>
                                            <Field
                                                title="Sizes"
                                                error={touched && error}
                                            >
                                                <Select
                                                    value={value ? value.filter(tag => tag !== '') : []}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    mode="multiple"
                                                    tokenSeparators={[',']}
                                                >
                                                    {pizzaSizes && pizzaSizes.map(({ id, name }) => (
                                                        <Option value={id}>{name}</Option>
                                                    ))}
                                                </Select>
                                            </Field>
                                        </>
                                    )}
                                />
                                :
                                null
                            }


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
                                                {tags && tags.map(({ id, name }) => (
                                                    <Option value={id}>{name}</Option>
                                                ))}
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

                            <FormField
                                name="image"
                                validate={required}
                                render={({ input: { value, onChange }, meta: { error, touched } }) => (
                                    <>
                                        <Field
                                            title="Image"
                                            error={touched && error}
                                        >
                                            <FileUpload
                                                onChange={async (file) => onChange(file)}
                                                value={value.base64}
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