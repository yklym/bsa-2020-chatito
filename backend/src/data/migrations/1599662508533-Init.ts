import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1599662508533 implements MigrationInterface {
    name = 'Init1599662508533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workspace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(150) NOT NULL, "imageUrl" character varying, "hash" character varying(7) NOT NULL, "createdByUserId" uuid, CONSTRAINT "UQ_406f56fc2a42ad5f541973cdbee" UNIQUE ("name"), CONSTRAINT "UQ_4c5a170807e6a12fdfd8c91f345" UNIQUE ("hash"), CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "createdByUserId" uuid, "postId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" bigint NOT NULL, "userId" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reaction" character varying NOT NULL, "postId" uuid, "userId" uuid, CONSTRAINT "PK_72c5fe23f6a0f35b8c2ba78945f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reminder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "note" character varying NOT NULL, "createdByUserId" uuid, "chatId" uuid, CONSTRAINT "PK_9ec029d17cb8dece186b9221ede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "draft_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "createdByUserId" uuid NOT NULL, "chatId" uuid NOT NULL, CONSTRAINT "UQ_8b81ae3983c2fd3a80e23f321c1" UNIQUE ("createdByUserId", "chatId"), CONSTRAINT "PK_542b7b541f23bc0c63e8de38b73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "draft_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "createdByUserId" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "UQ_b25f34dcce73e1e5bdc62203789" UNIQUE ("createdByUserId", "postId"), CONSTRAINT "PK_0f0f0a50906028687677d5a7f49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(100) NOT NULL, "displayName" character varying(100) NOT NULL, "githubUsername" character varying(100), "email" character varying NOT NULL, "password" character varying, "imageUrl" character varying, "title" character varying(100), "status" character varying(103), "incomingSoundOptions" "user_incomingsoundoptions_enum" NOT NULL DEFAULT 'AllowCustom', "audio" character varying NOT NULL DEFAULT 'https://bsa-chatito-storage.s3.amazonaws.com/audios/Tuturu.mp3', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "integration" "post_integration_enum" NOT NULL DEFAULT 'None', "createdByUserId" uuid, "chatId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(150) NOT NULL, "type" "chat_type_enum" NOT NULL, "description" character varying(200), "hash" character varying(7) NOT NULL, "isPrivate" boolean NOT NULL, "createdByUserId" uuid, "workspaceId" uuid, CONSTRAINT "UQ_49aa74145a400372135c0e7961c" UNIQUE ("hash"), CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_workspaces_workspace" ("userId" uuid NOT NULL, "workspaceId" uuid NOT NULL, CONSTRAINT "PK_a25759bde9cc94e49a72a04316a" PRIMARY KEY ("userId", "workspaceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2bca1ee291822fa1a508d06237" ON "user_workspaces_workspace" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6eb5f27dd1f2b98ad5855180c1" ON "user_workspaces_workspace" ("workspaceId") `);
        await queryRunner.query(`CREATE TABLE "user_chats_chat" ("userId" uuid NOT NULL, "chatId" uuid NOT NULL, CONSTRAINT "PK_73a8d5df1ca4814192e41235296" PRIMARY KEY ("userId", "chatId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd5ddfeacb967a4e33d639ee49" ON "user_chats_chat" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e190c52d44e72db13647dfb745" ON "user_chats_chat" ("chatId") `);
        await queryRunner.query(`CREATE TABLE "user_unread_posts_post" ("userId" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "PK_ffea8f441d36cdfe360e69bf20d" PRIMARY KEY ("userId", "postId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72aa66075d5b84b8ad5385371f" ON "user_unread_posts_post" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6d090e7723c468e720cbeed5f2" ON "user_unread_posts_post" ("postId") `);
        await queryRunner.query(`CREATE TABLE "user_unread_comments_comment" ("userId" uuid NOT NULL, "commentId" uuid NOT NULL, CONSTRAINT "PK_286adf7e4dc2787377429606e64" PRIMARY KEY ("userId", "commentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d5286b208159bfb977c0bddfde" ON "user_unread_comments_comment" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f878c342a3d0b6ce7cef26b685" ON "user_unread_comments_comment" ("commentId") `);
        await queryRunner.query(`CREATE TABLE "user_muted_chats_chat" ("userId" uuid NOT NULL, "chatId" uuid NOT NULL, CONSTRAINT "PK_f1f98af050d79de9e3d29f77063" PRIMARY KEY ("userId", "chatId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1186a7d1051bc257663a5be92e" ON "user_muted_chats_chat" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_136f9ef6a18c710363380bfde5" ON "user_muted_chats_chat" ("chatId") `);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_7045cbcb907692b231140d7444b" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c05bb6dfa077f32115b9d5265bb" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5e7b98f3cea583c73a0bbbe0de1" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5019c594c963270ac7a6bfafbec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reminder" ADD CONSTRAINT "FK_a203c89575b504a6c51040658df" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reminder" ADD CONSTRAINT "FK_86cd7233f4ecb768ac6a61ff6dd" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draft_post" ADD CONSTRAINT "FK_0da4f4473018911b228a0659c3e" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draft_post" ADD CONSTRAINT "FK_de7a6cf8a9d40b9eea3c72de37e" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_df88c69827aba0264e95f50af90" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_ec4ec378a6d3a3007db2eddb398" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_3512a8a50050cd0041683a01528" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_076310128b7a66e7591db1822a1" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_c14457d74f1e687c7389ed3bba0" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_workspaces_workspace" ADD CONSTRAINT "FK_2bca1ee291822fa1a508d06237d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_workspaces_workspace" ADD CONSTRAINT "FK_6eb5f27dd1f2b98ad5855180c1d" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_chats_chat" ADD CONSTRAINT "FK_cd5ddfeacb967a4e33d639ee499" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_chats_chat" ADD CONSTRAINT "FK_e190c52d44e72db13647dfb745b" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_unread_posts_post" ADD CONSTRAINT "FK_72aa66075d5b84b8ad5385371fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_unread_posts_post" ADD CONSTRAINT "FK_6d090e7723c468e720cbeed5f29" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_unread_comments_comment" ADD CONSTRAINT "FK_d5286b208159bfb977c0bddfde2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_unread_comments_comment" ADD CONSTRAINT "FK_f878c342a3d0b6ce7cef26b685c" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_muted_chats_chat" ADD CONSTRAINT "FK_1186a7d1051bc257663a5be92e3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_muted_chats_chat" ADD CONSTRAINT "FK_136f9ef6a18c710363380bfde58" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_muted_chats_chat" DROP CONSTRAINT "FK_136f9ef6a18c710363380bfde58"`);
        await queryRunner.query(`ALTER TABLE "user_muted_chats_chat" DROP CONSTRAINT "FK_1186a7d1051bc257663a5be92e3"`);
        await queryRunner.query(`ALTER TABLE "user_unread_comments_comment" DROP CONSTRAINT "FK_f878c342a3d0b6ce7cef26b685c"`);
        await queryRunner.query(`ALTER TABLE "user_unread_comments_comment" DROP CONSTRAINT "FK_d5286b208159bfb977c0bddfde2"`);
        await queryRunner.query(`ALTER TABLE "user_unread_posts_post" DROP CONSTRAINT "FK_6d090e7723c468e720cbeed5f29"`);
        await queryRunner.query(`ALTER TABLE "user_unread_posts_post" DROP CONSTRAINT "FK_72aa66075d5b84b8ad5385371fc"`);
        await queryRunner.query(`ALTER TABLE "user_chats_chat" DROP CONSTRAINT "FK_e190c52d44e72db13647dfb745b"`);
        await queryRunner.query(`ALTER TABLE "user_chats_chat" DROP CONSTRAINT "FK_cd5ddfeacb967a4e33d639ee499"`);
        await queryRunner.query(`ALTER TABLE "user_workspaces_workspace" DROP CONSTRAINT "FK_6eb5f27dd1f2b98ad5855180c1d"`);
        await queryRunner.query(`ALTER TABLE "user_workspaces_workspace" DROP CONSTRAINT "FK_2bca1ee291822fa1a508d06237d"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_c14457d74f1e687c7389ed3bba0"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_076310128b7a66e7591db1822a1"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_3512a8a50050cd0041683a01528"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_ec4ec378a6d3a3007db2eddb398"`);
        await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_df88c69827aba0264e95f50af90"`);
        await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5"`);
        await queryRunner.query(`ALTER TABLE "draft_post" DROP CONSTRAINT "FK_de7a6cf8a9d40b9eea3c72de37e"`);
        await queryRunner.query(`ALTER TABLE "draft_post" DROP CONSTRAINT "FK_0da4f4473018911b228a0659c3e"`);
        await queryRunner.query(`ALTER TABLE "reminder" DROP CONSTRAINT "FK_86cd7233f4ecb768ac6a61ff6dd"`);
        await queryRunner.query(`ALTER TABLE "reminder" DROP CONSTRAINT "FK_a203c89575b504a6c51040658df"`);
        await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5019c594c963270ac7a6bfafbec"`);
        await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5e7b98f3cea583c73a0bbbe0de1"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c05bb6dfa077f32115b9d5265bb"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_7045cbcb907692b231140d7444b"`);
        await queryRunner.query(`DROP INDEX "IDX_136f9ef6a18c710363380bfde5"`);
        await queryRunner.query(`DROP INDEX "IDX_1186a7d1051bc257663a5be92e"`);
        await queryRunner.query(`DROP TABLE "user_muted_chats_chat"`);
        await queryRunner.query(`DROP INDEX "IDX_f878c342a3d0b6ce7cef26b685"`);
        await queryRunner.query(`DROP INDEX "IDX_d5286b208159bfb977c0bddfde"`);
        await queryRunner.query(`DROP TABLE "user_unread_comments_comment"`);
        await queryRunner.query(`DROP INDEX "IDX_6d090e7723c468e720cbeed5f2"`);
        await queryRunner.query(`DROP INDEX "IDX_72aa66075d5b84b8ad5385371f"`);
        await queryRunner.query(`DROP TABLE "user_unread_posts_post"`);
        await queryRunner.query(`DROP INDEX "IDX_e190c52d44e72db13647dfb745"`);
        await queryRunner.query(`DROP INDEX "IDX_cd5ddfeacb967a4e33d639ee49"`);
        await queryRunner.query(`DROP TABLE "user_chats_chat"`);
        await queryRunner.query(`DROP INDEX "IDX_6eb5f27dd1f2b98ad5855180c1"`);
        await queryRunner.query(`DROP INDEX "IDX_2bca1ee291822fa1a508d06237"`);
        await queryRunner.query(`DROP TABLE "user_workspaces_workspace"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "draft_comment"`);
        await queryRunner.query(`DROP TABLE "draft_post"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
        await queryRunner.query(`DROP TABLE "post_reaction"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
    }

}
