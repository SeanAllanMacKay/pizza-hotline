import React, { useEffect, useState } from 'react';

import notification from '../../../hooks/useNotification'

import getPizzaSizes from '../../../actions/pizza-sizes/get-pizza-sizes'

import { Table, Tag, List, Input, Form, Select, Modal } from 'antd';
import { DeleteFilled, EditFilled, SaveFilled, CloseOutlined, ExclamationCircleOutlined, PlusOutlined, FileImageOutlined } from '@ant-design/icons';

import New from './New'
import Button from '../../Button'

const { Option } = Select
const { confirm } = Modal

const colors = {
    Vegetable: 'green',
    Vegan: 'lime',
    Vegetarian: 'green',
    "Gluten Free": 'blue',
    Meat: 'volcano',
    Cheese: 'gold',
    Seafood: 'blue',
    "Whole Wheat": 'geekblue'
}

export default ({ getData, getTags, type, upsert, deleteItem, upsertTag, description, withSizes, additionalFields }) => {
    const [data, setData] = useState([])
    const [tags, setTags] = useState([])
    const [pizzaSizes, setPizzaSizes] = useState([])
    const [newTag, setNewTag] = useState(null)
    const [filters, setFilters] = useState(null)
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState('');

    useEffect(() => {
        (async () => {
            const response = await getData()

            if(response.success){
                setData(response[`${type}`])
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: `There was an error fetching the ${type}`
                })
            }

            if(getTags){
                const response = await getTags()

                if(response.success){
                    setTags(response[`${type.slice(0, -1)}_tags`])
                } else {
                    notification({
                        title: 'Error',
                        type: 'error',
                        message: `There was an error fetching the ${type.slice(0, -1)} tags`
                    })
                }
            }

            if(withSizes){
                const response = await getPizzaSizes()

                if(response.success){
                    setPizzaSizes(response['pizza_sizes'])
                } else {
                    notification({
                        title: 'Error',
                        type: 'error',
                        message: `There was an error fetching the Pizza Sizes`
                    })
                }
            }
        })()
    }, [getData, getTags, type, withSizes])

    const isEditing = (record) => record.id === editingId;

    const edit = ({ tags: activeTags, ...rest }) => {
        form.setFieldsValue({ tags: activeTags && activeTags.map(tag => tag.id), ...rest });
        setEditingId(rest.id);
    };

    const cancel = () => {
        setEditingId('');
    };

    const save = async (id) => {
        const row = (await form.validateFields())
        console.log(row)
        const newData = [...data];
        const index = newData.findIndex(item => id === item.id);

        if (index > -1) {
            const item = newData[index];

            newData.splice(index, 1, {
              ...item,
              ...row,
            });

            const response = await upsert(newData[index])

            if(response.success){
                window.location.reload(false)
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: `There was an error adding this ${type}`
                })
            }
        }
    };

    function showDeleteConfirm(selected) {
        confirm({
          title: `Are you sure delete this ${type}?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This cannot be undone.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteItem(selected)
            window.location.reload(false)
          },
        });
      }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            editable: true
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 150,
            editable: true,
            render: (tags) => (
                <>
                    {tags && tags.map(tag => (
                        <Tag color={`${colors[tag.name]}`}>{tag.name}</Tag>
                    ))}
                </>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            editable: true,
            width: 300
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            render: (selected) => (
                <>
                    {selected ?
                        <a
                            href={`https://storage.googleapis.com/pizza-hotline/${selected}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                type="link"
                                content={ <FileImageOutlined />}
                                onClick={() => {}}
                            />
                        </a>
                        :
                        null
                    }
                </>
            )
        },
        {
            title: 'Actions',
            render: (selected) => {
                const editing = isEditing(selected)
                return editing ?
                    (
                        <span>
                            <Button
                                type="link"
                                content={<SaveFilled />}
                                tooltip="Save"
                                onClick={() => save(selected.id)}
                            />
                            <Button
                                type="link"
                                content={<CloseOutlined />}
                                tooltip="Cancel"
                                onClick={() => cancel()}
                            />
                        </span>
                    )
                    :
                    (
                        <span>
                            <Button
                                type="link"
                                content={<EditFilled />}
                                tooltip="Edit"
                                onClick={() => edit(selected)}
                            />
                            <Button
                                type="link"
                                content={<DeleteFilled />}
                                tooltip="Delete"
                                onClick={() => {
                                    showDeleteConfirm(selected)
                                }}
                            />
                        </span>
                    )
            },
            width: 150
        },
    ]

    if(withSizes){
        columns.splice(2, 0, {
            title: 'Sizes',
            dataIndex: 'sizes',
            key: 'sizes',
            width: 150,
            editable: true,
            render: (sizes) => (
                <>
                    {sizes && sizes.map(size => (
                        <Tag>{size.name}</Tag>
                    ))}
                </>
            )
        })
    }

    const mergedColumns = columns.map(col => {
        if(col){
            if (!col.editable) {
                return col;
              }
              return {
                ...col,
                onCell: (record) => ({
                  record,
                  dataIndex: col.dataIndex,
                  inputType: col.dataIndex === 'tags' ? 'tags' : col.dataIndex === 'sizes' ? 'sizes' : col.dataIndex === 'image' ? 'image' : 'text',
                  title: col.title,
                  editing: isEditing(record),
                }),
              };
        }
      });

      const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{ margin: 0 }}
                rules={dataIndex === 'name' ?
                    [
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]
                    :
                    []
                }
              >
                {inputType === 'tags' ?
                    <Select
                        mode="multiple"
                        tokenSeparators={[',']}
                    >
                        {tags && tags.map(({ id, name }) => (
                            <Option value={id}>{name}</Option>
                        ))}
                    </Select>
                    :
                    inputType === 'sizes' ?
                        <>
                            <Select
                                mode="multiple"
                                tokenSeparators={[',']}
                                defaultValue={record.sizes.map(size => size.id )}
                                onChange={(values) => {
                                    console.log(form.setFieldsValue)

                                    record.sizes = values
                                    console.log(record.sizes)
                                }}
                            >
                                {pizzaSizes && pizzaSizes.map(({ id, name }) => (
                                    <Option value={id}>{name}</Option>
                                ))}
                            </Select>
                        </>
                        :
                        inputType === 'image' ?
                            <>Test</>
                            :
                            <Input />
                }
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
      };

    return (
        <Form
            form={form}
            component={false}
            initialValues={[]}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0 0 30px 0'
                }}
            >
                <div
                    style={{
                        flex: 1.5,
                        margin: '0 45px 0 0'
                    }}
                >
                    <h3>{type.charAt(0).toUpperCase() + type.substring(1)}</h3>

                    <p>
                        {description}
                    </p>

                    {additionalFields}
                </div>

                {tags ?
                    <List
                        header={<b>Tags</b>}
                        itemLayout="horizontal"
                        dataSource={[
                            {
                                name:
                                    <Input
                                        placeholder="New Tag..."
                                        value={newTag}
                                        onChange={({ target: { value } }) => setNewTag(value)}
                                    />,
                                newEntry: true
                            },
                            ...tags
                        ]}
                        style={{
                            flex: 1
                        }}
                        renderItem={item => (
                            <List.Item
                                actions={
                                    item.newEntry ?
                                        [
                                            <Button
                                                type="link"
                                                content={<PlusOutlined />}
                                                tooltip="Add"
                                                onClick={async () => {
                                                    if(newTag){
                                                        const response = await upsertTag({ name: newTag })
                                                        if(response.success){
                                                            window.location.reload(false)
                                                        } else {
                                                            notification({
                                                                title: 'Error',
                                                                type: 'error',
                                                                message: `There was an error adding this Tag`
                                                            })
                                                        }
                                                    }
                                                }}
                                            />
                                        ]
                                        :
                                        [
                                            <Button
                                                type="link"
                                                content={<EditFilled />}
                                                tooltip="Edit"
                                            />,
                                            <Button
                                                type="link"
                                                content={<DeleteFilled />}
                                                tooltip="Delete"
                                            />
                                        ]
                                }
                            >
                                <List.Item.Meta
                                    title={item.name}
                                />
                            </List.Item>
                        )}
                    />
                    :
                    null
                }
            </div>

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    padding: '0 30px 0 0'
                }}
            >
                <New
                    type={`${type.charAt(0).toUpperCase()}${type.substring(1, type.length - 1)}`}
                    upsert={upsert}
                    tags={tags}
                    pizzaSizes={pizzaSizes}
                />
            </div>

            <Table
                columns={mergedColumns}
                components={{
                    body: {
                      cell: EditableCell,
                    },
                }}
                dataSource={
                    filters === null ?
                        data
                        :
                        filters.tags !== null &&
                            data.filter((row) => {
                                return filters.tags.every(tag => {
                                    return row.tags.filter(rowTag => rowTag.name === tag).length > 0
                                })
                            })
                    }
                pagination={false}
                onChange={async (pagination, newFilters) => { setFilters(newFilters) }}
            />
        </Form>
    );
}