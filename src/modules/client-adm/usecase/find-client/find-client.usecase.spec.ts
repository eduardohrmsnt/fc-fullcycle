import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const client = new Client({id: new Id("1"), name: "Cliente", email: "eduardohermesneto@gmail.com", address: "rua 3 de janeiro"})
const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}
describe("Add client unit test", () => {

    it("Should find a client", async () => {
        const clientRepository = MockRepository();

        const usecase = new FindClientUseCase(clientRepository);

        const input = {
            id: "1"
        }

        const result = await usecase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(client.name)
        expect(result.email).toBe(client.email)
        expect(result.address).toBe(client.address)
        expect(result.createdAt).toBe(client.createdAt)
        expect(result.updatedAt).toBe(client.updatedAt)
    })
})