import React from 'react';

export default ({ title, children, error, style, actions }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                ...style
            }}
        >
            <h4>{title}</h4>
            {children}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <p
                    style={{
                        color: 'red'
                    }}
                >
                    {error}
                </p>

                {actions ?
                    <>
                        {actions}
                    </>
                    :
                    null
                }
            </div>
        </div>
    );
}