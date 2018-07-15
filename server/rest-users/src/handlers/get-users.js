import Joi          from 'joi';
import { omit }     from 'lodash';
import { Router }   from 'express';

import { user }             from '../../../module-schemas';
import { validateRequest }  from '../../../module-middlewares';
import { verifyToken }      from '../../../module-jwt';

const router        = new Router();
const {User}        = user;
const fieldsToOmit  = [
	'password',
	'facebook',
	'google'
];

const getUsers = (req, res, next) => {

	User.find({}, null, {sort: {dateCreated: -1 }}, function (err, result) {
		if(err) return next(err);
		res.status(200).send(result);
	});
};


router.get('/api/users', verifyToken, getUsers);

export default router;