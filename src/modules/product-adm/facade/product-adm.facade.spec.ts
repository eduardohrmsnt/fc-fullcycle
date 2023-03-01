import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";

describe("ProductAdmFacade test", () => {

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
        const productFacade = ProductAdmFacadeFactory.create();


        const input = {
            id: "1",
            name: "Product 1",
            purchasePrice: 10,
            stock: 10,
            description: "Product 1 description"
        }

        await productFacade.addProduct(input);

        const productFind = await ProductModel.findOne({ where: { id: input.id }});
        
        expect(productFind.id).toEqual(input.id);
        expect(productFind.name).toEqual(input.name);
        expect(productFind.description).toEqual(input.description);
        expect(productFind.purchasePrice).toEqual(input.purchasePrice);
        expect(productFind.stock).toEqual(input.stock);
    })

    it("should check stock of a product", async () => {
        const productFacade = ProductAdmFacadeFactory.create();


        const input = {
            id: "1",
            name: "Product 1",
            purchasePrice: 10,
            stock: 10,
            description: "Product 1 description"
        }

        await productFacade.addProduct(input);

        const productFind = await productFacade.checkStock({ productId: input.id});
        
        expect(productFind.productId).toEqual(input.id);
        expect(productFind.stock).toEqual(input.stock);
    })
})