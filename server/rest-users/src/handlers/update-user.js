import Joi                  from 'joi';
import { pick, omit, each } from 'lodash';
import { Router }           from 'express';

import { user }             from '../../../module-schemas';
import { validateRequest }  from '../../../module-middlewares';
import { verifyToken }      from '../../../module-jwt';


const router        = new Router();
const {User}        = user;
const allowedFields = [
	'name',
	'businessName',
	'email'
];
const fieldsToOmit  = [
	'password',
	'facebook',
	'google'
];

const schema = {
	userId      : Joi.string().required(),
    name: Joi.string().required(),
    businessName: Joi.string().required(),
    email: Joi.string().email().required()
};

const updateUser = (req, res, next) => {
	const {userId}  = req.params;
	const payload   = pick(req.body, allowedFields);

	let update  = {$set: {}};
	let options = {new: true};

	each(payload, function (value, key) {
		update.$set[key] = value;
	});

	User.findByIdAndUpdate(userId, update, options, function (err, result) {
		if(err) return next(err);
		result = omit(result.toObject(), fieldsToOmit);
		res.status(200).send(result);
	});
};





router.put('/api/users/:userId', verifyToken, validateRequest(schema), updateUser);





export default router;
