export interface AddClientFacadeInputDto{
    id?: string;
    name: string;
    email: string;
    address: string;
}
export interface FindClientFacadeInputDto{
    id: string;
}

export interface FindClientFacadeOutputDto{
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export default interface ClientAdmFacadeInterface{
    add(input: AddClientFacadeInputDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}