import express              from 'express';
import path                 from 'path';
import cors                 from 'cors';
import morgan               from 'morgan';
import bodyParser           from 'body-parser';
import {errorHandler}       from './module-middlewares';
import restIdentity         from './rest-identity';
import restUsers            from './rest-users';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

restIdentity(app);
restUsers(app);

// app.use(express.static(path.join(__dirname, '../dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

app.use(errorHandler);

export default app;
