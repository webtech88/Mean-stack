import {Schema} from 'mongoose';
import {emailRegex, transform} from './utils';

const userStatuses = ['active', 'inactive'];

const userDefinition = {
    name: {
        type: String
    },

    businessName: {
        type: String
    },

    email: {
        type: String,
        match: emailRegex
    },

    password: {
        type: String
    },

    status: {
        type: String,
        required: true,
        enum: userStatuses,
        default: 'active'
    },

    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
};

const userSchema = new Schema(userDefinition);

if(!userSchema.options.toObject)
    userSchema.options.toObject = {};

userSchema.options.toObject.transform = transform;

export {userSchema, userStatuses};