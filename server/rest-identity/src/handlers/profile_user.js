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

const getUser = (req, res, next) => {

    const userId = req.token.payload._id;

	User.findById(userId, function (err, result) {
		if(err) return next(err);
		result = omit(result.toObject(), fieldsToOmit);
		res.status(200).send(result);
	});
};

router.get('/api/users/profile', verifyToken, getUser);

export default router;