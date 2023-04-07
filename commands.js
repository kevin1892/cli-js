const {program} = require('commander');
const {prompt} =require('inquirer');
const {addProduct,stockOp,removeProduct,findProdcut, listProducts,updateProduct} = require('./controllers/product_controllers');

const productQuestions =[
    {//0
        type: 'input',
        message: 'SKU name', // pregunta al usuario
        name: 'SKU' // nombre de la variable donde se guarda lo ingresado por el usuario
    },
    {//1
        type: 'input',
        message: 'Product name',
        name: 'name'
    },
    {//2
        type: 'input',
        message: 'Product stock',
        name: 'stock'
    },
    {//3
        type: 'input',
        message: 'Entry date',
        name: 'entry_date'
    },
    {//4
        type:'input',
        message:'output date',
        name:'output_date' 
    },
    {//5
        type:'input',
        message:'product entry',
        name:'entry_qty' 
    },
    {//6
        type:'input',
        message:'product output',
        name:'output_qty' 
    },
];
/*program.command('new-entry <sku>').alias('nent')
    .action(async (SKU)=>{
    const answers = await prompt(productQuestions[3]);
    addProductDate(SKU,answers);
});*/
program.command('new <op> <SKU>')
    .alias('ne')
    .action(async(op,SKU)=>{
            
            if(op=='entry'){
                const answer1 = await prompt(productQuestions[3]);
                const answer2 = await prompt(productQuestions[2]); //para actualizar el stock
                const answer3 = await prompt(productQuestions[5]); // para agregar el valor al array
                stockOp(SKU,answer1,answer2,answer3);
            }else if (op=='out'){
                const answer1 = await prompt(productQuestions[4]);
                const answer2 = await prompt(productQuestions[2]);
                const answer3 = await prompt(productQuestions[6]);
                stockOp(SKU,answer1,answer2,answer3);
            }
    }
    );

program.command('new-p').alias('n').action(async ()=>{
    const questions = [productQuestions[0],productQuestions[1],productQuestions[2]]
    const answers = await prompt(questions);
    addProduct(answers);
});
program.command('delete <SKU>')
    .alias('d')
    .action((SKU)=>{removeProduct();});
program.command('find <SKU>')
    .alias('f')
    .action((SKU) =>{findProdcut(SKU)});
program.command('update <SKU> <prop>')
    .alias('u')
    .action(async (SKU,prop) =>{
        if (prop =='SKU'){
            const answers = await prompt(productQuestions[0]);
            updateProduct(SKU,answers);
        }else if(prop =='name'){
            const answers = await prompt(productQuestions[1]);
            updateProduct(SKU,answers);
        }else if(prop =='stock'){
            const answers = await prompt(productQuestions[2]);
            updateProduct(SKU,answers);   
        }else if(prop =='entry_date'){
            const answers = await prompt(productQuestions[3]);
            updateProduct(SKU,answers);   
        }else if(prop =='output_date'){
            const answers = await prompt(productQuestions[4]);
            updateProduct(SKU,answers);   
        }else if(prop =='entry_qty'){
            const answers = await prompt(productQuestions[5]);
            updateProduct(SKU,answers);   
        }else if(prop =='output_qty'){
            const answers = await prompt(productQuestions[6]);
            updateProduct(SKU,answers);   
        }
    })
program.command('list')
    .alias('l')
    .action(()=>listProducts()); // nuevo comando para listar tareas
program.parse(process.argv);