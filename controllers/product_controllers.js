const Product = require('../models/Product');
const {connection} = require('../db');

const addProduct =async (product)=>{
    await Product.create(product);
    console.log('New Product added');
    await connection.close();
};

const updateProduct =async(SKU,property)=>{
    await Product.updateOne({SKU}, property)
    console.log('Product property Updated')
    await connection.close();
};



const removeProduct = async(SKU)=>{
    await Product.deleteOne(SKU);
    console.log('Product Deleted');
    await connection.close();
};
const stockOp= async(SKU,productQuestion1,productQuestion2,producQuestion3)=>{ //es para ingresar/sacar stock
    //producQuestion2 corresponde al input/output de stock
    //productQuestion1 corresponde a la fecha de ingreso/salida ingresado en consola
        await Product.updateOne(
            {SKU},
            {$push: productQuestion1} //fecha de ingreso
        );
        await Product.updateOne(
            {SKU},
            {$push: producQuestion3} //agrega stock al array entry_qty
        );
        await Product.updateOne(
            {SKU},
            {$inc: productQuestion2} //valor incrementeado ingreso de stock
        );
        
    console.log('product stock changed');
    await connection.close();
};
const stockOutput= async(SKU,productQuestion1,productQuestion2,producQuestion3)=>{ //es para ingresar/sacar stock
    //producQuestion2 corresponde al input/output de stock
    //productQuestion1 corresponde a la fecha de ingreso/salida ingresado en consola
        await Product.updateOne(
            {SKU},
            {$push: productQuestion1} //fecha de ingreso
        );
        await Product.updateOne(
            {SKU},
            {$push: producQuestion3} //agrega stock al array entry_qty
        );
        await Product.updateOne(
            {SKU},
            {$inc: productQuestion2} //valor incrementeado ingreso de stock
        );
        
    console.log('product stock changed');
    await connection.close();
};

const findProdcut = async(text)=>{
    const search = new RegExp(text,'i');
    const products = await Product.find({
        $or: [{SKU: search},{name: search}]
    })

    if (products.length ===0){
        console.log('no products found');
        await connection.close();
        process.exit(0);
    }
    console.table(
        {
            //id: products[0].id.toString(),
            //por ahora solo devuelve el primer elemento encontrado a partir de la palabra clave
            SKU: products[0].SKU,
            name: products[0].name,
            stock: products[0].stock,
            //entry_date: products[0].entry_date
        }
    );
    await connection.close();
    process.exit(0);
};

const listProducts = async()=>{
    const products = await Product.find().lean();//lean es para convertir los objetos de mongodb a objetos de js
    console.table(products.map(products =>({
        SKU: products.SKU,/*.toString()*/
        name: products.name,
        stock: products.stock,
    })));
    await connection.close(); //para cerrar la conexion a mongodb
    process.exit(0); //para finalizar el proceso de node y volver a la consola
};


module.exports={
    addProduct,
    stockOp,
    removeProduct,
    findProdcut,
    listProducts,
    updateProduct,
}