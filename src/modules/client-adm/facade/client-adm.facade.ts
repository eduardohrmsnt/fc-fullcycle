import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UseCasesProps{
    addClientUseCase: UseCaseInterface;
    findClientUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface{
    private _addClientUseCase: any;
    private _findClientUsecase: any;
    
    constructor(useCasesProps: UseCasesProps){
        this._addClientUseCase = useCasesProps.addClientUseCase;
        this._findClientUsecase = useCasesProps.findClientUseCase;
    }
    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addClientUseCase.execute(input);
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findClientUsecase.execute(input);
    }

}