const database = require("./database");
const express = require("express");

const cors = require("cors");
const app =  express();
const {Op, json} = require("sequelize");
const {readFile} = require("node:fs/promises");

app.use(express.json());
app.use(cors());

// import database 

const {Product} = require("./database/Product");
const {Category} = require("./database/Category");
const {User} = require("./database/User");
const {Role} = require("./database/Role");
const {Order} = require("./database/Order");
const {Cart} = require("./database/Cart");
const {ProductCart} = require("./database/ProductCart");

// Route

// Product

app.post("/product", async(request, response)=>{

    const productbody = request.body;

    const product = {
        name : productbody.name,
        description : productbody.description,
        price : productbody.price,
        CategoryId : productbody.categoryId
    };

    const category = await Category.findByPk(productbody.categoryId)
    if(category) {
       await Product.create(product);
       response.status(200).json(product);
    }
});

// Category

app.post("/category", async (request, response)=>{
    const categorybody = request.body;
    const category = await Category.create({
       name : categorybody.name
    });
    response.status(200).json(category);
});

app.get("/categories", async (request, response)=>{
    const categories = await Category.findAll();
    response.status(200).json(categories);
});

app.delete("/product/:id", async (request, response)=>{
    const productId = request.params.id;
    try {
        const deleteProduct =  await Product.destroy({
            where : {
              id : productId,
            }
        });

        response.status(200).json({
            message : "Produits supprimés", 
            deleteProduct
        });
    }
    catch (error) { 
        response.status(500).json({error: "Erreur"});
    }
});

// User 

app.post("/user", async(request, response)=>{
    const userBody = request.body;
    const user = await User.create ({
        name : userBody.name,
        password  : userBody.password,
        email : userBody.email,
        roleId : userBody.roleId
    });
    
    await Cart.create ({
        UserId : user.id
    })

    response.status(200).json(user)
});


// Role

app.post("/role", async (request, response)=>{
    const roleBody = request.body;
    const role = await Role.create ({
        name : roleBody.name,
        importance : roleBody.importance
    })
    response.status(200).json(role);
})

// Cart


app.post("/cart/:userid/:productid/:quantity", async (request, response)=>{
    const userId = request.params.userid;
    const productId = request.params.productid;
    const quantity = request.params.quantity;

    try { 
        const cart = await Cart.findOne({
            where : {
                UserId : userId
            }
        });
        console.log(cart);

        if (cart == null) {
            response.status(400).json("cart not found");
        }

        const productCart = await ProductCart.create({
            quantity : quantity,
            ProductId : productId,
            CartId : cart.id
        })

        response.status(200).json(productCart);
    }

    catch (error){
        console.log(error)
        response.status(500).json({error : "Erreur"});
    }
});

app.put("/cart/:userid/:productid/:quantity", async (request, response)=>{
    const userId = request.params.userid;
    const productId = request.params.productid;
    const quantity = request.params.quantity;

    try { 
        const cart = await Cart.findOne({
            where : {
                UserId : userId
            }
        });
        console.log(cart);

        if (cart == null) {
            response.status(400).json("cart not found");
        }
        
        await ProductCart.update({
            quantity : quantity
        },{
            where : {
                ProductId : productId,
                CartId : cart.id
            }
        })

        response.status(200).json("updated")
    }

    catch (error){
        console.log(error)
        response.status(500).json({error : "Erreur"});
    }
});


//Order

// Order = validation d'un productCart 

app.post("/order", async (request, response)=>{

});

// user avec un roleId user paiement

// user avec un roleId admin update la validation 0/1 

app.put("/order/:roleId/:cartId", async (request, response)=>{
    const auto = request.params.roleId;
    const cartId = request.params.cartId;
    const validation = request.body.validation;
    
    if (auto == 1)
    try {
        const order = await Cart.findByPk(cartId)
        if (order == null){
            console.log("not found");
            response.status(400).json("order not found");
        }
        else {
            await Order.update({
                validation : validation 
            })
            response.status(200).json(order)
        }
    }
catch(error){
    {response.status(500).json({error: "Erreur"})}
}});


// user avec un roleId admin get all order

app.get("/order/:roleId", async (request, response)=>{
    const auto = request.params.roleId;

    if (auto == 1){
        console.log("employe access")
        const order = await Order.findAll();
        response.status(200).json(order)
    }
})


// App listen 

app.listen(3030,()=>{
    console.log("Serveur lancé sur localhost:3030");
});



