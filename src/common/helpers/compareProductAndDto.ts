import { CreateProductDto, Product, UpdateProductDto } from "../../products/interfaces";

export const compareProductAndUpdateDto = ({id, last_update, ...product}:Product, dto:UpdateProductDto):boolean => JSON.stringify(product) === JSON.stringify(dto);

export const compareObjects = (object1:any, object2:CreateProductDto):boolean => JSON.stringify(object1) === JSON.stringify(object2);
