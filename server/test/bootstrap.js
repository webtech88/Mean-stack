import {waterfall}      from 'async';
import {get}            from '../module-config';
import {db, user}       from '../module-schemas';
import {generateUser}   from '../module-testhelpers';
import {issueToken}     from '../module-jwt';

const {User} = user;

before(function(done) {
    this.timeout(20000);

    const tasks = [
        function (cb) {
            process.env.ENV = 'test';
            const mongodbUri = get('mongodb_uri');

            db.open(mongodbUri, cb);
        },
        function (cb) {
            let doc = generateUser();

            User.create(doc, function(err, result){
                if(err) return cb(err);
                global.user = result.toObject();
                cb();
            });
        },
        function (cb) {
            const {_id, type} = global.user;
            issueToken({_id, type}, function (err, token) {
                if(err) return cb(err);
                global.authToken = token;
                cb();
            });
        }
    ];

    waterfall(tasks, function (err) {
        if(err) console.log(err);
        done();
    });
});

after(function(done) {
    const tasks = [
        function (cb) {
            if(!global.user) return cb();
            User.findByIdAndRemove(global.user._id, cb);
        }
    ];

    waterfall(tasks, function (err) {
        if(err) console.log(err);
        db.close(done);
    });
});