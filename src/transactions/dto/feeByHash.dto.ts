import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeeByHashRequest {
  @IsNotEmpty()
  @IsNumber()
  assetId: number;

  @IsNotEmpty()
  @IsString()
  hash: string;
}
