var Q = require('q');
var Mongo = require('../../utils/mongoUtils');

// app.use('/session', session) 方法集合
module.exports = Methods;
// [POST]: /

/**
 * 构造函数
 */
function Methods(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}


//取所有question文档
Methods.getActionName = function(req, res, nextf) {
    var data = req.body;
    Mongo.findQuestion('action', data).done(function(data) {
        console.log(data);
        if (data.length > 0) {
            res.json({
                status: true,
                data: data[0]
            });
        } else {
            res.json({
                status: false,
                name: 'no this action name'
            });
        }
    }, function(err) {
        if (err) {
            res.json({
                status: false,
                err: err
            });
        }
    });
}