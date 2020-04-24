import React, { useState, useContext } from 'react';

import { Form, Field as FormField } from 'react-final-form'

import { setToken } from '../../../hooks/useCookies'
import createAccount from '../../../actions/account/create-account'

import notification from '../../../hooks/useNotification'

import { Input, InputNumber, Checkbox } from 'antd'
import Field from '../../../components/Field'
import Button from '../../../components/Button'

const required = (value) => value ? undefined : 'Required'

const emailValidation = (value) => {
    if(value){
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? undefined : 'Must be a valid email address'
    } else {
        return 'Required'
    }
}

const phoneValidation = (value) => {
    if(!value){
        return 'Required'
    } else if (!/^\d+$/.test(value)){
        return 'Must only contain numbers'
    } else if (value.toString().length !== 10){
        return 'Must be a valid 10-digit phone number'
    }
}

const passwordValidation = (value) => {
    const errors = {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false
    }

    if(!/[0-9a-zA-Z-+_!@#$%^&*.,?]{8,}/.test(value)) errors.length = true
    if(!/.*[a-z]/.test(value)) errors.lowercase = true
    if(!/.*[A-Z]/.test(value)) errors.uppercase = true
    if(!/.*\d/.test(value)) errors.number = true

    if(value && Object.values(errors).filter(error => error === true).length) {
        return (
            <>
                Passwords must contain:
                <ul>
                    {errors.length && <li>Minimum 8 characters</li>}
                    {errors.lowercase && <li>One lowercase letter</li>}
                    {errors.uppercase && <li>One uppercase letter</li>}
                    {errors.number && <li>One number</li>}
                </ul>
            </>
        )
    } else if(!value) {
        return 'Required'
    }
}

const confirmPasswordValidation = (value, allValues) => {
    if(value !== allValues.password){
        return 'Passwords must match'
    } else if (!value){
        return 'Required'
    }
}

export default ({ stepForward, contactInfo, setContactInfo, account }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const onSubmit = async (values) => {
        const {
            password_confirm,
            ...rest
        } = values

        if(account){
            setContactInfo(rest)

            stepForward()
        } else {
            const response = await createAccount(rest)

            if(!response.error){
                notification({
                    title: 'Account Created',
                    type: 'success',
                    message: 'Your account has been created!'
                })

                setToken(response.token)

                setContactInfo(rest)

                stepForward()
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: `${response.error}`
                })
            }
        }
    }

    return (
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
                    {account ? 'CONTACT INFO' : 'SIGN UP'}
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

            <Form
                onSubmit={onSubmit}
                initialValues={contactInfo ? contactInfo : account}
                render={({ handleSubmit, values }) => (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '15px'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    margin: '0 20px 0 0'
                                }}
                            >
                                <FormField
                                    name="first_name"
                                    validate={required}
                                    render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                                        <>
                                            <Field
                                                title="First Name"
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
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                }}
                            >
                                <FormField
                                    name="last_name"
                                    validate={required}
                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                        <>
                                            <Field
                                                title="Last Name"
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
                            </div>
                        </div>

                        <FormField
                            name="email"
                            validate={emailValidation}
                            render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                <>
                                    <Field
                                        title="Email"
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
                            name="phone_number"
                            validate={phoneValidation}
                            render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => {
                                return(
                                    <>
                                        <Field
                                            title="Phone Number"
                                            error={touched && error}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding: '0 10px',
                                                        backgroundColor: 'whitesmoke',
                                                        borderRadius: '5px 0 0 5px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            margin: 0,

                                                        }}
                                                    >
                                                        +1
                                                    </p>
                                                </div>


                                                <InputNumber
                                                    value={value}
                                                    formatter={(eventValue) => {
                                                        const areaCode = eventValue.length > 0 ? `(${eventValue.substring(0, 3)})` : ''
                                                        const three = eventValue.length > 3 ? ` ${eventValue.substring(3, 6)}` : ''
                                                        const four = eventValue.length > 6 ? ` - ${eventValue.substring(6, 10)}` : ''

                                                        return `${areaCode}${three}${four}`
                                                    }}
                                                    parser={(eventValue) => {
                                                        return eventValue.replace(/[()\s-]/g, '')
                                                    }}
                                                    onChange={(eventValue) => {
                                                        if(/^\d+$/.test(eventValue) && eventValue.toString().length < 11){
                                                            onChange(eventValue)
                                                        }
                                                    }}
                                                    onBlur={onBlur}
                                                    style={{
                                                        flex: 1
                                                    }}
                                                />
                                            </div>

                                        </Field>
                                    </>
                                )
                            }}
                        />

                        {!account &&
                            <>
                                <FormField
                                    name="password"
                                    validate={passwordValidation}
                                    render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                        <>
                                            <Field
                                                title="Password"
                                                error={touched && error}
                                                actions={
                                                    <Button
                                                        content={passwordVisible ? "Hide" : "Show"}
                                                        type='link'
                                                        onClick={() => value && setPasswordVisible(!passwordVisible)}
                                                        style={{
                                                            color: 'black'
                                                        }}
                                                    />
                                                }
                                            >
                                                <Input
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    type={passwordVisible ? "" : "password"}
                                                />
                                            </Field>
                                        </>
                                    )}
                                />

                                <FormField
                                    name="password_confirm"
                                    validate={confirmPasswordValidation}
                                    render={({ input: { value, onChange, onBlur }, meta: { error, touched } }) => (
                                        <>
                                            <Field
                                                title="Confirm Password"
                                                error={touched && error}
                                                actions={
                                                    <Button
                                                        content={confirmPasswordVisible ? "Hide" : "Show"}
                                                        type='link'
                                                        onClick={() => value && setConfirmPasswordVisible(!confirmPasswordVisible)}
                                                        style={{
                                                            color: 'black'
                                                        }}
                                                    />
                                                }
                                            >
                                                <Input
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    type={confirmPasswordVisible ? "" : "password"}
                                                />
                                            </Field>
                                        </>
                                    )}
                                />

                                <FormField
                                    name="recieve_promos"
                                    type="checkbox"
                                    render={({ input: { value, onChange }, meta: { error } }) => (
                                        <>
                                            <Checkbox
                                                onClick={onChange}
                                                checked={value}
                                            >
                                                Recieve promos by email
                                            </Checkbox>
                                        </>
                                    )}
                                />
                            </>
                        }

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                margin: '10px 0 0 0'
                            }}
                        >
                            {!account &&
                                <Button
                                    content="Continue as guest"
                                    type="link"
                                    onClick={() => console.log('continue as gueast')}
                                />
                            }

                            {!account ?
                                <>
                                    <Button
                                        content="Sign Up"
                                        type="primary"
                                        onClick={() => handleSubmit()}
                                    />
                                </>
                                :
                                <>
                                    <Button
                                        content="Next"
                                        type="primary"
                                        onClick={() => handleSubmit('test')}
                                    />
                                </>
                            }
                        </div>
                    </div>
                )}
            />
        </>
    );
}