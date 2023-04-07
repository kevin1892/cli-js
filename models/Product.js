const {Schema, model} =require('mongoose');
const productSchema = new Schema({
    SKU : {type: String, unique: true},
    name: {type: String},
    stock: {type: Number},
    entry_date: [{type: String}],
    output_date: [{type: String}],
    entry_qty: [{type: Number}],
    output_qty: [{type: Number}],
},{
    timestamps : true, //sirve para guardar automaticamente la fecha de creacion
    versionKey: false,
},
)
var Product = model('Product',productSchema)
module.exports=Product;