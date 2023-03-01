import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";

export interface UseCasesProps{
    processUseCase: UseCaseInterface;
}

export default class PaymentFacade implements PaymentFacadeInterface{
    private _processUseCase: any;
    
    constructor(useCasesProps: UseCasesProps){
        this._processUseCase = useCasesProps.processUseCase;
    }

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this._processUseCase.execute(input);
    }

}