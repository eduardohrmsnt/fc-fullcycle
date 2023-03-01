import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import { ClientModel } from "../repository/client.model";

describe("ClientAdmFacade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ClientModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a client", async () => {
        const clientFacade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            address: "Rua 3 de Janeiro",
            email: "eduardohermesneto@gmail.com"
        }

        await clientFacade.add(input);

        const clientFind = await ClientModel.findOne({ where: { id: input.id }});
        
        expect(clientFind.id).toBeDefined();
        expect(clientFind.name).toEqual(input.name);
        expect(clientFind.email).toEqual(input.email);
        expect(clientFind.address).toEqual(input.address);
    })

    it("should find a client", async () => {
        const clientFacade = ClientAdmFacadeFactory.create();


        const input = {
            id: "1",
            name: "Client 1",
            email: "eduardohermesneto@gmail.com",
            address: "Rua 3 de Janeiro"
        }

        await clientFacade.add(input);

        const clientFind = await clientFacade.find({ id: input.id});
        
        expect(clientFind.id).toEqual(input.id);
    })
})