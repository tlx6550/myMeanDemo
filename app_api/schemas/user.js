var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    hash: String,
    salt: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    img: String,
    ip: String,
    mobile: String
});
//，randomBytes和pbkdf2Sync，前者会生成一个字符串，后者生成密码和salt的哈希值
//生成一个16位的随机字符串作为salt，然后调用pbkdf2Sync方法生成哈希值。
UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    //1000代表迭代次数 64代表长度
    this.hash = crypto.pbkdf2Sync(password, this.salt,1000,64).toString('hex');
};

//再增加一个验证方法：
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};
//这里我们调用了jwt的sign方法，并定义了一个密钥：ReadingClubSecret.
//更多资料https://gold.xitu.io/entry/577b7b56a3413100618c2938
UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp:parseInt(expiry.getTime()/1000)}, process.env.JWT_SECRET);
};
//把模式导出
module.exports = UserSchema