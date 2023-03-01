import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () =>{
    let sequelize: Sequelize;

    beforeEach(async () =>{
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description:" Product 1 description",
            purchasePrice: 100,
            stock: 10
        })
        const result = await productRepository.add(product)

        const productFind = await ProductModel.findOne({ where: { id: product.id.id }});
        
        expect(productFind.id).toEqual(product.id.id);
        expect(productFind.name).toEqual(product.name);
        expect(productFind.description).toEqual(product.description);
        expect(productFind.purchasePrice).toEqual(product.purchasePrice);
        expect(productFind.stock).toEqual(product.stock);
    })


    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product({
            id: new Id("1"),
            name: "Product 1",
            description:" Product 1 description",
            purchasePrice: 100,
            stock: 10,
        })
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date()
        }) 

        const productFind = await productRepository.find(product.id.id);
        
        expect(productFind.id.id).toEqual(product.id.id);
        expect(productFind.name).toEqual(product.name);
        expect(productFind.description).toEqual(product.description);
        expect(productFind.purchasePrice).toEqual(product.purchasePrice);
        expect(productFind.stock).toEqual(product.stock);
    })
})