import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";


describe("Product Repository teste", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })


    it("should find all product", async () => {

        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description: " Product 1 description",
            salesPrice: 100
        })
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        })

        const product2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            description: " Product 2 description",
            salesPrice: 100
        })
        await ProductModel.create({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice
        })

        const productRepository = new ProductRepository();

        const productsFind = await productRepository.findAll();

        expect(productsFind[0].id.id).toEqual(product.id.id);
        expect(productsFind[0].name).toEqual(product.name);
        expect(productsFind[0].description).toEqual(product.description);
        expect(productsFind[0].salesPrice).toEqual(product.salesPrice);
        expect(productsFind[1].id.id).toEqual(product2.id.id);
        expect(productsFind[1].name).toEqual(product2.name);
        expect(productsFind[1].description).toEqual(product2.description);
        expect(productsFind[1].salesPrice).toEqual(product2.salesPrice);
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description:" Product 1 description",
            salesPrice: 100
        })
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }) 

        const productFind = await productRepository.find(product.id.id);
        
        expect(productFind.id.id).toEqual(product.id.id);
        expect(productFind.name).toEqual(product.name);
        expect(productFind.description).toEqual(product.description);
        expect(productFind.salesPrice).toEqual(product.salesPrice);
    })
})