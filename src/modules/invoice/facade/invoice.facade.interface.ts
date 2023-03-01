import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.dto";

export default interface InvoiceFacadeInterface{
    generate(invoice: GenerateInvoiceFacadeInputDto) : Promise<GenerateInvoiceFacadeOutputDto>
    find(id: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
}