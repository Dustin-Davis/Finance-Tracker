set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL default now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "transactions" (
    "transactionId" serial NOT NULL,
    "amount" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "categoryId" integer NOT NULL,
    "userId" integer NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL default now(),
    CONSTRAINT "transactions_pk" PRIMARY KEY ("transactionId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "categories" (
    "categoryId" serial NOT NULL,
    "category" TEXT NOT NULL,
    CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
