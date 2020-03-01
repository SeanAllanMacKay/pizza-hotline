import { notification as antNotification } from 'antd'

const config = {
    placement: 'topRight',
    bottom: 50,
    duration: 4,
}

export default ({ type, title, message }) => {
    if(type){
        antNotification[type]({
            ...config,
            message: title ? title : type.replace(/^\w/, c => c.toUpperCase()),
            description: message,
        });
    } else {
        antNotification.open({
            ...config,
            message: title,
            description: message,
        });
    }
}
