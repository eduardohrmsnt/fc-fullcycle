export interface CheckStockInputDto{
    productId: string;
}

export interface ChekcStockOutputDto{
    productId: string;
    stock: number;
}