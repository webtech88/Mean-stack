import addUser      from './src/handlers/add-user';
import getUser      from './src/handlers/get-user';
import getUsers     from './src/handlers/get-users';
import updateUser   from './src/handlers/update-user';

export default function (app) {
	app.use(addUser);
	app.use(getUser);
	app.use(getUsers);
	app.use(updateUser);            
}