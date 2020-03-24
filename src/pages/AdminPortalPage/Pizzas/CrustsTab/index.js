import React, { useEffect, useState } from 'react';

import getCrusts from '../../../../actions/crusts/get-crusts'
import notification from '../../../../hooks/useNotification'

import { Table, Tag } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

import NewCrust from './NewCrust'
import Button from '../../../../components/Button'

const colors = {
    Vegetable: 'green',
    Vegan: 'lime',
    Vegetarian: 'green',
    "Gluten Free": 'blue',
    Meat: 'volcano',
    Cheese: 'gold',
    Seafood: 'blue',
    "Whole Wheat": 'orange'
}

export default () => {
    const [data, setData] = useState([])
    const [filters, setFilters] = useState(null)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 250,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 150,
            filters: [
                {
                    text: 'Characteristics',
                    value: 'Characteristics',
                    children: [
                        {
                            text: 'Gluten Free',
                            value: 'Gluten Free',
                        },
                        {
                            text: 'Vegetarian',
                            value: 'Vegetarian',
                        },
                        {
                            text: 'Vegan',
                            value: 'Vegan',
                        },
                        {
                            text: 'Whole Wheat',
                            value: 'Whole Wheat',
                        },
                    ],
                },
            ],
            render: (tags) => (
                <>
                    {tags.map(tag => (
                        <Tag color={`${colors[tag.name]}`}>{tag.name}</Tag>
                    ))}
                </>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300
        },
        {
            title: 'Actions',
            render: () => (
                <span>
                    <Button
                        type="link"
                        content={<EditFilled />}
                        tooltip="Edit"
                    />
                    <Button
                        type="link"
                        content={<DeleteFilled />}
                        tooltip="Delete"
                    />
                </span>
            ),
            width: 150
        },
    ]

    useEffect(() => {
        (async () => {
            const response = await getCrusts()

            if(response.success){
                setData(response.crusts)
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: 'There was an error fetching the crusts'
                })
            }
        })()
    }, [])

    return (
        <>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    padding: '0 30px 0 0'
                }}
            >
                <NewCrust
                    setData={setData}
                />
            </div>
            <Table
                columns={columns}
                dataSource={
                    filters === null || filters.tags === null ?
                        data
                        :
                        data.filter((row) => {
                            return filters.tags.every(tag => {
                                return row.tags.filter(rowTag => rowTag.name === tag).length > 0
                            })
                        })
                    }
                pagination={false}
                onChange={async (pagination, newFilters) => { setFilters(newFilters) }}
            />
        </>
    );
}