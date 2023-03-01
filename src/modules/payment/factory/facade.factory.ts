
import PaymentFacadeInterface from "../facades/facade.interface";
import PaymentFacade from "../facades/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory{
    static create() : PaymentFacadeInterface {
        const transactionRepository = new TransactionRepository();
        const processUseCase = new ProcessPaymentUseCase(transactionRepository);
        const transactionFacade = new PaymentFacade({
            processUseCase: processUseCase
        })

        return transactionFacade;
    }
}