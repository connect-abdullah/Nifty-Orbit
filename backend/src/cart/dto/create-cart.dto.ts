import { IsIn, IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateCartDto {
    @IsNotEmpty()
    product_id: number;

    @Min(1)
    @IsInt()
    quantity: number;
}
