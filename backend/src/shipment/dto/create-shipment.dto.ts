import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";

export class CreateShipmentDto {
     address: string;
     city: string;
     state: string;
     company: string;
     tracking_number: string;
     order : Order;
     user : User;    
}
