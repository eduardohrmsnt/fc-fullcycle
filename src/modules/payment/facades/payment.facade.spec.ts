import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import PaymentFacadeFactory from "../factory/facade.factory";
import TransactionModel from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "./payment.facade";

describe("Payment facade test", () =>{
    let sequelize: Sequelize;

    beforeEach(async () =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([TransactionModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a transaction", async() => {

        const facade = PaymentFacadeFactory.create();

        const input = {
            orderId: "order-1",
            amount: 100
        }

        const result = await facade.process(input)

        expect(result.transactionId).toBeDefined();
        expect(result.amount).toBe(input.amount);
        expect(result.orderId).toBe(input.orderId);
        expect(result.status).toBe("approved");
    })
})
