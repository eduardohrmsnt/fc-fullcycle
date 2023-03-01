import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../domain/value-objects/address.value-object";
import InvoiceGateway from "../../repository/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const result = await this._invoiceRepository.save(new Invoice({
            name: input.name,
            document: input.document,
            address: new Address({
                city: input.city,
                state: input.state,
                street: input.street,
                zip: input.zipCode,
                complement: input.complement,
                number: input.number
            }),
            items: input.items.map((product) => { return new Product({ price: product.price, name: product.name }) })
        }))

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            city: result.address.city,
            state: result.address.state,
            street: result.address.street,
            zipCode: result.address.zip,
            complement: result.address.complement,
            number: result.address.number,
            items: result.items.map((product) => { return { id: product.id.id, price: product.price, name: product.name }}),
            total: result.total()
        };
    }
}