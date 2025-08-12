import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToPerson implements MigrationInterface {
    name = 'AddUserIdToPerson1754952159784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_e3ce87c26e26264026e0c0cb4f2" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_e3ce87c26e26264026e0c0cb4f2"`);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "userIdId"`);
    }

}
