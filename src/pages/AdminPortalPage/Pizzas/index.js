import React, { useMemo, useState, useEffect } from 'react';
import { matchPath } from 'react-router'
import { useHistory } from 'react-router-dom'

import notification from '../../../hooks/useNotification'

import getPizzaSizes from '../../../actions/pizza-sizes/get-pizza-sizes'
import upsertPizzaSize from '../../../actions/pizza-sizes/upsert-pizza-size'

// Toppings
import getToppings from '../../../actions/toppings/get-toppings'
import upsertTopping from '../../../actions/toppings/upsert-topping'
import deleteTopping from '../../../actions/toppings/delete-topping'
import getToppingTags from '../../../actions/toppings/get-topping-tags'
import upsertToppingTag from '../../../actions/toppings/upsert-topping-tag'
import deleteToppingTag from '../../../actions/toppings/delete-topping-tag'

// Sauces
import getSauces from '../../../actions/sauces/get-sauces'
import upsertSauce from '../../../actions/sauces/upsert-sauce'
import deleteSauce from '../../../actions/sauces/delete-sauce'
import getSauceTags from '../../../actions/sauces/get-sauce-tags'
import upsertSauceTag from '../../../actions/sauces/upsert-sauce-tag'
import deleteSauceTag from '../../../actions/sauces/delete-sauce-tag'


// Crusts
import getCrusts from '../../../actions/crusts/get-crusts'
import upsertCrust from '../../../actions/crusts/upsert-crust'
import deleteCrust from '../../../actions/crusts/delete-crust'
import getCrustTags from '../../../actions/crusts/get-crust-tags'
import upsertCrustTag from '../../../actions/crusts/upsert-crust-tag'
import deleteCrustTag from '../../../actions/crusts/delete-crust-tag'

import { Tabs, Input, InputNumber, List } from 'antd';
import { DeleteFilled, EditFilled, SaveFilled, CloseOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Button from '../../../components/Button'
import Field from '../../../components/Field'

import { Form, Field as FormField } from 'react-final-form'

import PizzaTab from '../../../components/Admin/PizzasTab'

const { TabPane } = Tabs;

const required = (value) => value ? undefined : 'Required'

const AdditionalToppingInfo = () => {
    const [pizzaSizes, setPizzaSizes] = useState([])
    const [editing, setEditing] = useState(null)
    const [newValue, setNewValue] = useState(null)

    useEffect(() => {
        (async () => {
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
        })()
    }, [])

    return(
        <List
            header={
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <b
                        style={{
                            flex: 1
                        }}
                    >
                        Size
                    </b>
                    <b
                        style={{
                            flex: 1
                        }}
                    >
                        Price / Topping
                    </b>

                    <div
                        style={{
                            width: '105px'
                        }}
                    />
                </div>
            }
            itemLayout="horizontal"
            dataSource={pizzaSizes}
            style={{
                flex: 1
            }}
            renderItem={(item, index) => (
                <List.Item
                    actions={
                        [
                            <Button
                                type="link"
                                content={editing === index ? <SaveFilled /> : <EditFilled />}
                                tooltip="Edit"
                                onClick={async () => {
                                    if(editing === index){
                                        const {
                                            topping_price,
                                            ...rest
                                        } = item

                                        const response = await upsertPizzaSize({
                                            ...rest,
                                            topping_price: newValue
                                        })

                                        if(response.success){
                                            window.location.reload(false)
                                        } else {
                                            notification({
                                                title: 'Error',
                                                type: 'error',
                                                message: `There was an error adding this Tag`
                                            })
                                        }
                                    } else {
                                        setNewValue(null)
                                        setEditing(index)
                                    }
                                }}
                            />
                        ]
                    }
                >
                    <List.Item.Meta
                        title={
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                            >
                                <p
                                    style={{
                                        flex: 1,
                                        margin: 0
                                    }}
                                >
                                    {item.name}
                                </p>
                                <p
                                    style={{
                                        flex: 1,
                                        margin: 0
                                    }}
                                >
                                    {editing === index ?
                                        <>
                                            <InputNumber
                                                defaultValue={item.topping_price}
                                                min={0}
                                                step={0.25}
                                                onChange={(value) => setNewValue(value)}
                                            />
                                        </>
                                        :
                                        <>
                                            ${item.topping_price}
                                        </>
                                    }
                                </p>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

const AdditionalCrustInfo = () => {
    const [pizzaSizes, setPizzaSizes] = useState([])

    useEffect(() => {
        (async () => {
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
        })()
    }, [])

    const onSubmit = async (values) => {
        const response = await upsertPizzaSize(values)

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

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, values }) => (
                <>
                    <h3>Sizes</h3>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <FormField
                            name="name"
                            validate={required}
                            render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                <>
                                    <Field
                                        title="Name"
                                        error={touched && error}
                                        style={{
                                            flex: 1.75,
                                            margin: '0 10px 0 0'
                                        }}
                                    >
                                        <Input
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    </Field>
                                </>
                            )}
                        />

                        <FormField
                            name="code"
                            validate={required}
                            render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                <>
                                    <Field
                                        title="Code"
                                        error={touched && error}
                                        style={{
                                            flex: 1,
                                            margin: '0 10px 0 0'
                                        }}
                                    >
                                        <Input
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    </Field>
                                </>
                            )}
                        />

                        <FormField
                            name="size"
                            render={({ input: { value, onChange, onBlur  }, meta: { error, touched } }) => (
                                <>
                                    <Field
                                        title="Size"
                                        error={touched && error}
                                        style={{
                                            flex: 1,
                                            margin: '0 10px 0 0'
                                        }}
                                    >
                                        <InputNumber
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            style={{
                                                width: '100%'
                                            }}
                                        />
                                    </Field>
                                </>
                            )}
                        />


                        <Field
                            title="Actions"
                            style={{
                                flex: 1,
                            }}
                        >
                            <Button
                                type="link"
                                content={<PlusOutlined />}
                                tooltip="Add"
                                onClick={() => handleSubmit()}
                                style={{
                                    maxWidth: '50px'
                                }}
                            />
                        </Field>
                    </div>

                    {pizzaSizes.map(({ id, name, code, size }) => (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <div
                                style={{
                                    flex: 1.75,
                                    margin: '0 10px 0 0'
                                }}
                            >
                                {name}
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    margin: '0 10px 0 0'
                                }}
                            >
                                {code}
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    margin: '0 10px 0 0'
                                }}
                            >
                                {size ? `${size}"` : null}
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                }}
                            >
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
                            </div>
                        </div>
                    ))}
                </>
            )}/>
    )
}

export default () => {
    const history = useHistory()

    const selected = useMemo(() => {
        const match = matchPath(history.location.pathname, {
                path: `/admin-portal/pizzas/:selected`,
                exact: true,
                strict: false
            })
        return match && match.params && match.params.selected
    }, [history.location.pathname])

    return (
        <div
            style={{
                flex: 1,
                padding: '10px 20px 0 20px'
            }}
        >
            <Tabs
                defaultActiveKey={selected}
                onTabClick={(key) => history.push(`/admin-portal/pizzas/${key}`)}
            >
                <TabPane
                    tab='Toppings'
                    key="toppings"
                >
                    <PizzaTab
                        type="toppings"
                        getData={getToppings}
                        upsert={upsertTopping}
                        deleteItem={deleteTopping}
                        getTags={getToppingTags}
                        upsertTag={upsertToppingTag}
                        description="This is where you can update all of the toppings available. You must add new toppings here before customers are able to add that topping to a pizza, or you can use that topping in a specialty pizza."
                        additionalFields={<AdditionalToppingInfo />}
                    />
                </TabPane>

                <TabPane
                    tab='Sauces'
                    key="sauces"
                >
                    <PizzaTab
                        type="sauces"
                        getData={getSauces}
                        upsert={upsertSauce}
                        deleteItem={deleteSauce}
                        getTags={getSauceTags}
                        upsertTag={upsertSauceTag}
                        description="This is where you can update all of the sauces available. You must add new sauces here before customers are able to add that sauce to a pizza, or you can use that sauce in a specialty pizza."
                    />
                </TabPane>

                <TabPane
                    tab='Crusts'
                    key="crusts"
                >
                    <PizzaTab
                        type="crusts"
                        getData={getCrusts}
                        upsert={upsertCrust}
                        deleteItem={deleteCrust}
                        getTags={getCrustTags}
                        upsertTag={upsertCrustTag}
                        description="This is where you can update all of the crusts available. You must add new crust here before customers are able to add that crust to a pizza, or you can use that crust in a specialty pizza."
                        withSizes
                        additionalFields={<AdditionalCrustInfo />}
                    />
                </TabPane>

                <TabPane
                    tab='Specialty Pizzas'
                    key="specialty-pizzas"
                />
            </Tabs>
        </div>
    );
}