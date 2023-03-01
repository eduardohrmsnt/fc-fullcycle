import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("Client repository test", () =>{
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
        const clientRepository = new ClientRepository();

        const client = new Client({
            id: new Id("1"),
            name: "Eduardo Hermes Neto",
            email:" eduardohermesneto@gmail.com",
            address: "Rua 3 de janeiro"
        })
        const result = await clientRepository.add(client)

        const clientFind = await ClientModel.findOne({ where: { id: client.id.id }});
        
        expect(clientFind.id).toEqual(client.id.id);
        expect(clientFind.name).toEqual(client.name);
        expect(clientFind.email).toEqual(client.email);
        expect(clientFind.address).toEqual(client.address);
    })


    it("should find a client", async () => {
        const clientRepository = new ClientRepository();

        const client = new Client({
            id: new Id("1"),
            name: "Eduardo Hermes Neto",
            email:" eduardohermesneto@gmail.com",
            address: "Rua 3 de janeiro"
        })
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: new Date(),
            updatedAt: new Date()
        }) 

        const clientFind = await clientRepository.find(client.id.id);
        
        expect(clientFind.id.id).toEqual(client.id.id);
        expect(clientFind.name).toEqual(client.name);
        expect(clientFind.email).toEqual(client.email);
        expect(clientFind.address).toEqual(client.address);
    })
})