import Joi from 'joi';
import {Router} from 'express';
import {omit, without, pick} from 'lodash';
import {user} from '../../../module-schemas';
import {hash} from '../../../module-crypto';
import {validateRequest} from '../../../module-middlewares';
import {UnprocessableEntityError} from '../../../module-errors';


const router = new Router();
const {User} = user;
const fieldsToOmit = ['password'];
const allowedFields = [
    'name',
    'businessName',
    'password',
    'email'
];


const schema = {
    name: Joi.string().required(),
    businessName: Joi.string().required(),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().required()
};


const addUser = (req, res, next) => {
    let payload = pick(req.body, allowedFields);
    const query = {email: payload.email};

    User.findOne(query, (err, result) => {
        if(err) return next(err);
        if(result)
            return next(new UnprocessableEntityError('User with this email already exists.'));

        payload.password = hash(payload.password);

        User.create(payload, (err, result) => {
            if(err) return next(err);
            result = result.toObject();
            result = omit(result, fieldsToOmit);
            res.status(201).send(result);
        });
    });
};

router.post('/api/users', validateRequest(schema), addUser);


export default router;
