import React from 'react';

import { Button, Tooltip } from 'antd'

export default ({ content, disabled, type, tooltip }) => {
    return (
        <Tooltip
            title={tooltip}
        >
            <Button
                disabled={disabled}
                type={type}
            >
                {content}
            </Button>
        </Tooltip>
    );
}