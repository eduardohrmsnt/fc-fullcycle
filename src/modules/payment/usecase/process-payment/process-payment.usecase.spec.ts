import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved"
})

const MockRepository = () =>{
    return{
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
}

const transaction2 = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "1",
    status: "declined"
})

const MockRepository2 = () =>{
    return{
        save: jest.fn().mockReturnValue(Promise.resolve(transaction2))
    }
}
describe("ProcessPaymentUseCase unit test", () =>{


    it("should process payment",  async () =>{
        const paymentRepository = MockRepository();

        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 100
        }

        const result = await useCase.execute(input);


        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.amount).toBe(100);
        expect(result.status).toBe("approved")
        expect(result.orderId).toBe("1")
    })

    it("should decline a transaction", async() =>{
        const paymentRepository = MockRepository2();

        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 50
        }

        const result = await useCase.execute(input);


        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.amount).toBe(50);
        expect(result.status).toBe("declined")
        expect(result.orderId).toBe("1")
    })
})