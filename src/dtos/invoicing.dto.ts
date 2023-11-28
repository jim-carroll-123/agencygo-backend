import { IsBoolean, IsDate, IsDateString, IsMongoId, IsNumber, IsOptional, IsString ,IsUrl} from "class-validator";
import { isEmpty } from "rxjs";

export class CreateInvoicingDto {
    @IsString()
    public userName: string;

    @IsString()
    public userId: string;

    @IsString()
    public employeeId: string;

    @IsNumber()
    public amount: number;

    @IsBoolean()
    public status: Boolean;

   

    @IsBoolean()
    public delivery:Boolean

    @IsString()
    public description: string;

    @IsDateString()
    public date: Date;

    @IsString()
    public address: string;

    @IsString()
    public contactDetails: string;

    @IsString()
    public invoiceNo: string;

    @IsString()
    public paymentTerms: string;

    @IsString()
    public contactName: string;

    @IsString()
    public nameDept: string;

    @IsString()
    public clientCompanyName: string;

    @IsString()
    public phone: string;

    @IsString()
    public email: string;

    @IsNumber()
    public qty: number;

    @IsNumber()
    public unitPrice: number;

    @IsNumber()
    public total: number;

    @IsString()
    public paymentInstructions: string;

    @IsNumber()
    public subtotal: number;

    @IsNumber()
    public discount: number;

    @IsNumber()
    public subtotalLessDiscount: number;

    @IsString()
    public taxRate: string;

    @IsNumber()
    public totalTax: number;

    @IsNumber()
    public shippingHandling: number;

    @IsString()
    public balanceDue: string;

    @IsString()
    public addressShipTo: string;

    @IsString()
    public phoneShipTo: string;

    @IsUrl()
    @IsOptional()
    public pdfUrl?: string;

    @IsOptional()
    public createdAt?: Date;

    @IsOptional()
    public updatedAt?: Date;
}


export class UpdateInvoicingDto {
    @IsString()
    public userName: string;

    @IsString()
    public userId: string;

    @IsString()
    public employeeId: string;

    @IsNumber()
    public amount: number;

    @IsBoolean()
    public status: Boolean;

    @IsBoolean()
    public delivery:Boolean

    @IsString()
    public description: string;

    @IsDateString()
    public date: Date;

    @IsString()
    public address: string;

    @IsString()
    public contactDetails: string;

    @IsString()
    public invoiceNo: string;

    @IsString()
    public paymentTerms: string;

    @IsString()
    public contactName: string;

    @IsString()
    public nameDept: string;

    @IsString()
    public clientCompanyName: string;

    @IsString()
    public phone: string;

    @IsString()
    public email: string;

    @IsNumber()
    public qty: number;

    @IsNumber()
    public unitPrice: number;

    @IsNumber()
    public total: number;

    @IsString()
    public paymentInstructions: string;

    @IsNumber()
    public subtotal: number;

    @IsNumber()
    public discount: number;

    @IsNumber()
    public subtotalLessDiscount: number;

    @IsString()
    public taxRate: string;

    @IsNumber()
    public totalTax: number;

    @IsNumber()
    public shippingHandling: number;

    @IsString()
    public balanceDue: string;

    @IsString()
    public addressShipTo: string;

    @IsString()
    public phoneShipTo: string;

    @IsUrl()
    @IsOptional()
    public pdfUrl?: string;

    @IsOptional()
    public createdAt?: Date;

    @IsOptional()
    public updatedAt?: Date;
}
