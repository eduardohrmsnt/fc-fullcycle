import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface StoreCatalogFacadeProps{
    findAll: UseCaseInterface,
    find: UseCaseInterface
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface{
    private _findUseCase: UseCaseInterface;
    private _findAllUseCase: UseCaseInterface;

    constructor(storeCatalogFacadeProps: StoreCatalogFacadeProps) {
        this._findAllUseCase = storeCatalogFacadeProps.findAll;
        this._findUseCase = storeCatalogFacadeProps.find;
    }

    async find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute({productId: input.id});
    }
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute({});
    }
    
}