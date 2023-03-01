import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface{
    private _clientRepository: any;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }
    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props ={
            id: new Id(input.id),
            name: input.name,
            address: input.address,
            email: input.email
        };

        const client = new Client(props);

        this._clientRepository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            address: client.address,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }

}