import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Add client unit test", () => {

    it("Should add a client", async () => {
        const clientRepository = MockRepository();

        const usecase = new AddClientUseCase(clientRepository);


        const input = {
            id: "1",
            name:"Eduardo",
            email: "eduardohermesneto@gmail.com",
            address: "Address 1"
        }

        const result = await usecase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe("Eduardo")
        expect(result.email).toBe("eduardohermesneto@gmail.com")
        expect(result.address).toBe("Address 1")
    })
})