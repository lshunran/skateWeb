var express = require('express');
var router = express.Router();
var Methods = require('./methods');
//创建或者修改表单
router.post('/get/action', Methods.getActionName);

module.exports = router;