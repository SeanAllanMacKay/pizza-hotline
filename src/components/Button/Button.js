import React from 'react';

import { Button, Tooltip } from 'antd'

export default ({ content, disabled, type, tooltip, onClick, style, shape }) => {
    return (
        <Tooltip
            title={tooltip}
        >
            <Button
                disabled={disabled || ! onClick}
                type={type}
                shape={shape}
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