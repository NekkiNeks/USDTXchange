CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE Role AS ENUM(
    'ADMIN',
    'SENIOR_MANAGER',
    'MANAGER'
);

CREATE TYPE Network AS ENUM('TRC20', 'ERC20', 'BEP20');

CREATE TYPE Request_status AS ENUM(
    'CREATED',
    'PAID',
    'FULFILLED'
);

CREATE TYPE File_type AS ENUM(
    'PICTURE',
    'DOCUMENT',
    'OTHER'
);

CREATE TABLE "currencies" (
    "id" uuid PRIMARY KEY DEFAULT(uuid_generate_v4 ()),
    "name" varchar NOT NULL,
    "exchange_rate" int NOT NULL
);

CREATE TABLE "users" (
    "id" uuid PRIMARY KEY DEFAULT(uuid_generate_v4 ()),
    "name" varchar NOT NULL,
    "surname" varchar DEFAULT null,
    "createdAt" Date NOT NULL DEFAULT(now()),
    "updatedAt" Date DEFAULT null,
    "telegram" varchar DEFAULT null,
    "email" varchar NOT NULL
);

CREATE TABLE "employees" (
    "id" uuid PRIMARY KEY DEFAULT(uuid_generate_v4 ()),
    "role" Role NOT NULL,
    "name" varchar NOT NULL,
    "surname" varchar NOT NULL,
    "createdAt" Date NOT NULL DEFAULT(now()),
    "updatedAt" Date DEFAULT null,
    "telegram" varchar NOT NULL,
    "phone" varchar DEFAULT null,
    "email" varchar NOT NULL
);

CREATE TABLE "requests" (
    "id" uuid PRIMARY KEY DEFAULT(uuid_generate_v4 ()),
    "user_id" uuid NOT NULL,
    "manager_id" uuid NOT NULL,
    "network" Network NOT NULL,
    "currency" uuid NOT NULL,
    "amount" int NOT NULL,
    "status" Request_status NOT NULL,
    "createdAt" Date NOT NULL DEFAULT(now()),
    "updatedAt" Date DEFAULT null
);

CREATE TABLE "request_files" (
    "id" uuid PRIMARY KEY DEFAULT(uuid_generate_v4 ()),
    "request_id" uuid NOT NULL,
    "type" File_type NOT NULL,
    "createdAt" Date NOT NULL DEFAULT(now()),
    "updatedAt" Date DEFAULT null
);

CREATE TABLE "wallets" (
    "id" uuid PRIMARY KEY DEFAULT(uuid_generate_v4 ()),
    "network" Network NOT NULL,
    "address" varchar NOT NULL
);

ALTER TABLE "requests"
ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "requests"
ADD FOREIGN KEY ("manager_id") REFERENCES "employees" ("id");

ALTER TABLE "requests"
ADD FOREIGN KEY ("currency") REFERENCES "currencies" ("id");

ALTER TABLE "request_files"
ADD FOREIGN KEY ("request_id") REFERENCES "requests" ("id");