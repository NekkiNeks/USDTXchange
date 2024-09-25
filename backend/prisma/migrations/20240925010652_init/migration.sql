/*
  Warnings:

  - You are about to drop the `request_files` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('CREATED', 'PAID', 'FULFILLED');

-- DropForeignKey
ALTER TABLE "request_files" DROP CONSTRAINT "request_files_request_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "order_status" NOT NULL;

-- DropTable
DROP TABLE "request_files";

-- DropEnum
DROP TYPE "request_status";

-- CreateTable
CREATE TABLE "order_files" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "order_id" UUID NOT NULL,
    "type" "file_type" NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,

    CONSTRAINT "order_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_files" ADD CONSTRAINT "order_files_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
