import Message from '../models/Messages';

const messageHandler = (io, socket) => {
    const getMessage = () => {
        const messages = Message.find();
    };
};
