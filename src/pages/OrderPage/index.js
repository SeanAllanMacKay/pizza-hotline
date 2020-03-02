import React, { useState, useContext } from 'react';
import AccountContext from '../../context/AccountContext'

import ContactPage from './ContactPage'
import LocationPage from './LocationPage'
import OrderPage from './OrderPage'
import PaymentPage from './PaymentPage'

import { Steps } from 'antd'

const { Step } = Steps

export default () => {
    const { account } = useContext(AccountContext)

    const [stepCount, setStepCount] = useState(0)
    const [contactInfo, setContactInfo] = useState(null)
    const [locationInfo, setLocationInfo] = useState(null)

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                { stepCount === 0 &&
                    <ContactPage
                        stepForward={() => setStepCount(1)}
                        contactInfo={contactInfo}
                        setContactInfo={setContactInfo}
                        account={account}
                    />
                }

                { stepCount === 1 &&
                    <LocationPage
                        stepBack={() => setStepCount(0)}
                        stepForward={() => setStepCount(2)}
                        locationInfo={locationInfo}
                        setLocationInfo={setLocationInfo}
                    />
                }

                { stepCount === 2 &&
                    <OrderPage
                        stepBack={() => setStepCount(1)}
                        stepForward={() => setStepCount(3)}
                        account={account}
                    />
                }

                { stepCount === 3 &&
                    <PaymentPage
                        stepBack={() => setStepCount(2)}
                    />
                }
            </div>


            <div
                style={{
                    margin: '40px 0 0 0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <Steps
                    current={stepCount}
                    style={{
                        maxWidth: '1000px',
                    }}
                >
                    <Step
                        title="Contact Info"
                        description="Who are you?"
                    />

                    <Step
                        title="Location Info"
                        description="Where are you?"
                    />

                    <Step
                        title="Order Info"
                        description="What do you want?"
                    />

                    <Step
                        title="Payment Info"
                        description="How do you want to pay?"
                    />
                </Steps>
            </div>

        </div>

    );
}