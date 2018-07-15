import db from './db';
import {userSchema, userStatuses} from './user';

const user = {
    schema: userSchema,
    statuses: userStatuses,
    User: db.model('User', userSchema, 'users')
};

export {
    db,
    user
};