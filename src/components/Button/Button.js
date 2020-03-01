import React from 'react';

import { Button, Tooltip } from 'antd'

export default ({ content, disabled, type, tooltip, onClick, style }) => {
    return (
        <Tooltip
            title={tooltip}
        >
            <Button
                disabled={disabled || ! onClick}
                type={type}
                onClick={onClick}
                style={{
                    ...style
                }}
            >
                {content}
            </Button>
        </Tooltip>
    );
}