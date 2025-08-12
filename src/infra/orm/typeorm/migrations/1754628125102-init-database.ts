import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase implements MigrationInterface {
    name = 'InitDatabase1754628125102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "password" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "zipCode" character varying(20) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "gender" character, "email" character varying(100), "dateOfBirth" date NOT NULL, "nationality" character varying(100), "naturalness" character varying(100), "cpf" character varying(14) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "addressId" integer, CONSTRAINT "UQ_d2d717efd90709ebd3cb26b936c" UNIQUE ("email"), CONSTRAINT "UQ_264b7cad2330569e0ef5b4c39c4" UNIQUE ("cpf"), CONSTRAINT "REL_a793ed25458ce9bc1584889cb1" UNIQUE ("addressId"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_83b775da14886d352de2a4cac01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_a793ed25458ce9bc1584889cb13" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_a793ed25458ce9bc1584889cb13"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_83b775da14886d352de2a4cac01"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
