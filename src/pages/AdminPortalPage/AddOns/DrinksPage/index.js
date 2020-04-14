import React, { useEffect, useState } from 'react';

import getData from '../../../../actions/drinks/get-drinks'
import upsert from '../../../../actions/drinks/upsert-drink'
import notification from '../../../../hooks/useNotification'

import { Table, Tag } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

import NewDrink from './NewDrink'
import Button from '../../../../components/Button'

const colors = {
    Diet: 'green',
    Vegan: 'lime',
    Vegetarian: 'green',
    "Caffeine Free": 'blue',
    "2L": 'volcano',
    "529mL": 'gold',
    Can: 'orange',
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
            width: 200,
        },
        {
            title: 'Sizes',
            dataIndex: 'sizes',
            key: 'sizes',
            width: 200,
            filters: [
                {
                    text: '2L',
                    value: '2L',
                },
                {
                    text: '591mL',
                    value: '591mL',
                },
                {
                    text: 'Can',
                    value: 'Can',
                },
                {
                    text: '547mL',
                    value: '547mL',
                },
            ],
            render: (sizes) => (
                <>
                    {sizes.map(size => (
                        <Tag color={`${colors[size.name]}`}>{size.name}</Tag>
                    ))}
                </>
            )
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 200,
            filters: [
                {
                    text: 'Diet',
                    value: 'Diet',
                },
                {
                    text: 'Caffeine Free',
                    value: 'Caffeine Free',
                },
                {
                    text: 'Zero Sugar',
                    value: 'Zero Sugar',
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
            const response = await getData()

            if(response.success){
                setData(response.drinks)
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: `There was an error fetching the drinks`
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
                <NewDrink
                    type="Drink"
                    upsert={upsert}
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