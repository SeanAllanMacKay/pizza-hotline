import React, { useState } from 'react';

import { Form } from 'react-final-form'

import Button from '../../../components/Button'

import Delivery from './Delivery'
import PickUp from './PickUp'

export default ({ stepBack, stepForward, locationInfo, setLocationInfo }) => {
    const [type, setType] = useState('delivery')

    const onSubmit = async (values) => {
        setLocationInfo({ type, ...values })
        stepForward()
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                maxWidth: '1000px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px'
            }}
        >
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
                    LOCATION INFO
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
                initialValues={locationInfo && locationInfo}
                render={({ handleSubmit, values, form }) => (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    padding: '20px 15px',
                                }}
                            >
                                <Button
                                    content="Delivery"
                                    type={type === 'delivery' ? "primary" : 'default'}
                                    onClick={() => {
                                        if(type !== 'delivery'){
                                            form.reset()
                                            setType('delivery')
                                        }
                                    }}
                                    style={{
                                        flex: 1
                                    }}
                                />

                                <Button
                                    content="Pick-up"
                                    type={type === 'pick-up' ? "primary" : 'default'}
                                    onClick={() => {
                                        if(type !== 'pick-up'){
                                            form.reset()
                                            setType('pick-up')
                                        }
                                    }}
                                    style={{
                                        flex: 1
                                    }}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                padding: '15px'
                            }}
                        >
                            {type === 'delivery' &&
                                <Delivery
                                    values={values}
                                />
                            }

                            {type === 'pick-up' &&
                                <PickUp
                                    values={values}
                                />
                            }

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    margin: '10px 0 0 0'
                                }}
                            >
                                <Button
                                    content="Back"
                                    onClick={() => stepBack()}
                                />

                                <Button
                                    content="Next"
                                    type="primary"
                                    onClick={() => handleSubmit()}
                                />
                            </div>
                        </div>
                    </>
                )}
            />
        </div>
    );
}