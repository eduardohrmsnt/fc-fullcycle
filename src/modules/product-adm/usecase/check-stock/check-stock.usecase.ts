import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, ChekcStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface {

    private readonly _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway){
        this._productRepository = productRepository;
    }

    async execute(input: CheckStockInputDto): Promise<ChekcStockOutputDto> {
        const product = await this._productRepository.find(input.productId);

        return {
            productId: product.id.id,
            stock: product.stock
        }
    }


}