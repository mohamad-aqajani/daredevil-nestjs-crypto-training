import { assets, test_assets } from '@shared/contracts/constants/assets.constant';
import { Asset } from '@shared/entities/asset-entity';
import { AssetType } from 'enums/assets.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class assets1653471616750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const assetList: Partial<Asset>[] = +process.env.IS_TESTNET ? test_assets : assets;
    assetList.forEach(async (asset, index) => {
      console.log(index, asset);
      await queryRunner.manager.save(Asset, asset);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
