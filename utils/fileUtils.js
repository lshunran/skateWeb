var xlsx = require("node-xlsx");
var fs = require('fs');
var Mongo = require('./mongoUtils');
// var async = require("async");
// var Methods = require('../routes/store/methods');
var fileStoragePath = './uploads/';
var latestList = null;
module.exports = File;

/**
 * 构造函数
 */
function File(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}


File.saveQuestions = function(list, token) {
    Methods.saveQuestions(list, token);
}

File.saveFormTemplate = function(list) {
    Methods.saveFormTemplate(list);
}

//参数 fileName:文件名
//将xlsx文件转化为list形式并存在latestList中,格式如下所示(可用循环遍历):
//[{"name":"工作表1","data":[["id","name","age"],[1,"tom",20],[2,"jack",21],[3,"mary",22]]}]
File.parseXlsxToList = function(fileName) {

    var list = xlsx.parse("./uploads/" + fileName);

    // latestList = list;


    var data = list[0].data;
    console.log(data);
    var obj = {};
    for (var i in data) {
        obj.name = data[i][0];
        obj.feature_1 = data[i][1];
        obj.feature_2 = data[i][2];
        obj.feature_3 = data[i][3];
        obj.feature_4 = data[i][4];
        obj.feature_5 = data[i][5];
        obj.feature_6 = data[i][6];
        obj.slide = data[i][7];
        obj.grind = data[i][8];
        obj.blunt = data[i][9];
        obj.score = data[i][10];
        // console.log(obj)
        Mongo.insertQuestion('action3', obj).done(function(data) {
            // console.log(data);
        });

        obj = {};
    }

    // fs.unlink("./uploads/" + fileName, function(err) {
    //     if (!err) {
    //         console.log("文件已经读取解析完毕并且已自动删除.");
    //         // console.log(fileName);
    //         // if (tag == '1') {

    //         //     File.saveQuestions(list, token); //保存至数据库
    //         // } else if (tag == '2') {
    //         //     //TODO upload template
    //         //     File.saveFormTemplate(list);
    //         // }
    //     } else {
    //         console.log("删除失败: " + err);
    //     }
    // });
    return list;
}