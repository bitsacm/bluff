const mongoose = require('mongoose');
const ttl = require('mongoose-ttl');

const roomSchema = new mongoose.Schema({
    Roomname :{ type:String, unique:true},
});
roomSchema.plugin(ttl, { ttl: '2m' });
const Room = mongoose.model('room', roomSchema,);
module.exports = Room