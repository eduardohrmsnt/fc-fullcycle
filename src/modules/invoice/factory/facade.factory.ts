import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invocie.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";


export default class InvoiceFacadeFactory{
    static create(): InvoiceFacadeInterface{
        const invoiceRepository = new InvoiceRepository();
        const findInvoicesUseCase = new FindInvoiceUseCase(invoiceRepository);
        const generateInvoice = new GenerateInvoiceUseCase(invoiceRepository);

        return new InvoiceFacade({ find: findInvoicesUseCase, generate: generateInvoice });
    }
}