const db = require('./db.js')

const orderSchema = new db.mongoose.Schema({
    "userName": { type: String },
    "password": { type: String },
    "age": { type: Number },
    "phone": { type: Number },

})


module.exports = db.mongoose.model("order", orderSchema)