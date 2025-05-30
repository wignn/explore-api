import { Injectable } from "@nestjs/common";
import { ZodType } from "zod";

@Injectable()
export class ValidationService {
    validate<T>(zodType: ZodType<T>,data: T){
        return zodType.parse(data);
    }
}