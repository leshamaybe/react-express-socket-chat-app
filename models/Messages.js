import { Schema, model } from 'mongoose';

const Message = new Schema(
    {
        messageId: {
            type: String,
            required: true,
            unique: true,
        },
        textOrPathToFile: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        senderName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default model('Message', Message);
