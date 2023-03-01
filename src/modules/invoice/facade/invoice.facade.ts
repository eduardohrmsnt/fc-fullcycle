import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto, FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO } from "./invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";


export interface FacadeProps {
    generate: UseCaseInterface,
    find: UseCaseInterface
}
export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateUseCase: UseCaseInterface;
    private _findUseCase: UseCaseInterface;
    constructor(props: FacadeProps){
        this._generateUseCase = props.generate;
        this._findUseCase = props.find;
    }
    async generate(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUseCase.execute(invoice);
    }
    async find(id: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUseCase.execute(id);
    }

    
}