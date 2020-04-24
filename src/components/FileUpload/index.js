import React, { useRef, useEffect, useState } from 'react';

import { CloudUploadOutlined, DeleteFilled } from '@ant-design/icons';

import Button from '../Button'

export default ({ onChange, value = null }) => {
    const fileUploadRef = useRef(null)
    const [hovered, setHovered] = useState(false)
    const [currentValue, setCurrentValue] = useState(value)
    const [preview, setPreview] = useState(null)

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result)
            resolve(reader.result)
        };
        reader.onerror = error => reject(error);
    });

    useEffect(() => {
        if(!value){
            setPreview(null)
        }
        setCurrentValue(value)
        if(currentValue){
            setPreview(currentValue)
        }
    }, [currentValue, preview, value])

    return (
        <div
            style={{
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                flexDirection: 'column',
                height: '150px',
                overflow: 'hidden',
                ...(preview ? {
                    backgroundImage: `url(${preview})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                } : {
                    border: `1px dashed ${hovered ? '#cd0000' : 'grey'}`,
                    color: hovered ? '#cd0000' : 'grey',
                    padding: '20px'
                })
            }}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
                if(!preview){
                    fileUploadRef.current.click()
                }
            }}
            onDrop={(event) => {
                if(!preview){
                    event.preventDefault()
                    const file = event.dataTransfer.files[0]
                    if(['image/png'].includes(file.type) && ((file.size/1024)/1024) < .5){
                        onChange(file)
                    }
                }
            }}
            onDragOver={(event) => {
                if(!preview){
                    event.preventDefault()
                    setHovered(true)
                }

            }}
            onDragLeave={(event) => {
                if(!preview){
                    event.preventDefault()
                    setHovered(false)
                }
            }}
        >
            {preview ?
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: `rgba(0, 0, 0, ${hovered ? '0.5' : '0'})`,
                    }}
                >
                    {hovered &&
                        <Button
                            type='link'
                            content={<DeleteFilled />}
                            onClick={() => {
                                onChange(null)
                                setCurrentValue(null)
                                setPreview(null)
                            }}
                            style={{
                                fontSize: '1.5em',
                                color: 'white'
                            }}
                        />
                    }
                </div>
                :
                <>
                    <input
                        type="file"
                        accept=".png"
                        ref={fileUploadRef}
                        style={{
                            display: 'none'
                        }}
                        onChange={async ({ target: { files } }) => {
                            if(((files[0].size/1024)/1024) < 0.5){
                                const file = files[0]
                                onChange({
                                    file,
                                    base64: await toBase64(file)
                                })
                            }
                        }}
                    />
                    <CloudUploadOutlined
                        style={{
                            fontSize: '1.5em',
                        }}
                    />
                    <p
                        style={{
                            margin: 0,
                            fontSize: '10px',
                            textAlign: 'center'
                        }}
                    >
                        Upload Image
                    </p>
                </>
            }
        </div>
    );
}