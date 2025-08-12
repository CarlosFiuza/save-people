import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNaturalnessColumn implements MigrationInterface {
    name = 'AddNaturalnessColumn1754962980124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" ADD "naturalness" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "naturalness"`);
    }

}
