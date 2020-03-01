import React from 'react';

import SignUp from './SignUp'

export default () => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}
        >
            <SignUp />
        </div>

    );
}