import Product from "../models/Product";


export const createProduct = async(req, res) => {
    const {name, category, price, imgUrl} = req.body;
    try {
        const newProduct = new Product({name, category, price, imgUrl});
        const productSaved = await newProduct.save();
        res.status(201).json(productSaved);
    } catch (error) {
        console.log('Err: crear producto');
        return res.status(500).json(error);
    }
    
}

export const getProducts = async(req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
}

export const getProductById = async(req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
}

export const updateProductById = async(req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(204).json(updateProduct);
}
export const deleteProductById = async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json(deletedProduct)
}