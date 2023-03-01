import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";

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

    it("should find a product", async () => {
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: "1",
            name: "Product name",
            description: "Description 1",
            salesPrice: 10
        })

        const result = await facade.find({ id: "1" } );


        expect(result.id).toBe("1");
        expect(result.name).toBe("Product name");
        expect(result.description).toBe("Description 1");
        expect(result.salesPrice).toBe(10);
    })

    it("should find a product", async () => {
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: "1",
            name: "Product name",
            description: "Description 1",
            salesPrice: 10
        })

        await ProductModel.create({
            id: "2",
            name: "Product name2",
            description: "Description 2",
            salesPrice: 10
        })

        const result = await facade.findAll();


        expect(result.products[0].id).toBe("1");
        expect(result.products[0].name).toBe("Product name");
        expect(result.products[0].description).toBe("Description 1");
        expect(result.products[0].salesPrice).toBe(10);
        expect(result.products[1].id).toBe("2");
        expect(result.products[1].name).toBe("Product name2");
        expect(result.products[1].description).toBe("Description 2");
        expect(result.products[1].salesPrice).toBe(10);
    })
})
