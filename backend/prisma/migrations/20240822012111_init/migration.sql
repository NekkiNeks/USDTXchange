CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "file_type" AS ENUM( 'PICTURE', 'DOCUMENT', 'OTHER' );

-- CreateEnum
CREATE TYPE "network" AS ENUM('TRC20', 'ERC20', 'BEP20');

-- CreateEnum
CREATE TYPE "request_status" AS ENUM(
    'CREATED',
    'PAID',
    'FULFILLED'
);

-- CreateEnum
CREATE TYPE "role" AS ENUM( 'ADMIN', 'SENIOR_MANAGER', 'MANAGER' );

-- CreateTable
CREATE TABLE "currencies" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "exchange_rate" INTEGER NOT NULL,


CONSTRAINT "currencies_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "role" "role" NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "telegram" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "email" VARCHAR NOT NULL,


CONSTRAINT "employees_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "request_files" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "request_id" UUID NOT NULL,
    "type" "file_type" NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,


CONSTRAINT "request_files_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "requests" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "manager_id" UUID NOT NULL,
    "network" "network" NOT NULL,
    "currency_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "request_status" NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,


CONSTRAINT "requests_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "telegram" VARCHAR,
    "email" VARCHAR NOT NULL,


CONSTRAINT "users_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "wallets" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "network" "network" NOT NULL,
    "address" VARCHAR NOT NULL,


CONSTRAINT "wallets_pkey" PRIMARY KEY ("id") );

-- CreateIndex
CREATE UNIQUE INDEX "currencies_name_key" ON "currencies" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "employees_username_key" ON "employees" ("username");

-- CreateIndex
CREATE UNIQUE INDEX "employees_telegram_key" ON "employees" ("telegram");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users" ("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_key" ON "users" ("telegram");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_address_key" ON "wallets" ("address");

-- AddForeignKey
ALTER TABLE "request_files"
ADD CONSTRAINT "request_files_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests"
ADD CONSTRAINT "requests_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests"
ADD CONSTRAINT "requests_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "employees" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "requests"
ADD CONSTRAINT "requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;