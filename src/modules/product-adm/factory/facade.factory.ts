import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmFacadeInterface from "../facade/product-adm.facade.interface";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory{
    static create() : ProductAdmFacadeInterface {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const stockUseCase = new CheckStockUseCase(productRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: stockUseCase
        })

        return productFacade;
    }
}