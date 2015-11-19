var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Experience对象模型
var ExperienceSchema = new Schema({
    author: String,
    experienceTitle: String,
    experienceCompany: String,
    experienceCont: String,
    experienceTag: Number,
    experienceLink: String,
    cTime: { type: Date, default: Date.now },
    uTime: { type: Date, default: Date.now }
});

//访问User对象模型
mongoose.model('Experience', ExperienceSchema);
var Experience = mongoose.model('Experience');   
exports.Experience=Experience;

//添加功能
exports.create = function(obj,callback) {
    var newExperience = obj;
    newExperience.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    });
}

//根据用户名查找   
exports.findByUname = function(author,callback) {
    Experience.find({author:author},function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
}

//条件查找所有结果集
exports.findAll = function(object,callback) {
    Experience.find(object,function(err,result){
        if(err){
            callback(err);
        }else{
            callback(null,result);
        }
    });
}

//删除操作
exports.delete = function(object,callback) {
    Experience.remove(object,function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    });
}

//更新操作
exports.modify = function(conditions,updates,options,callback) {
    Experience.update(conditions,updates,options,function(err){
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    });
}