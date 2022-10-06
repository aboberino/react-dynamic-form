-- CreateTable
CREATE TABLE "BlocInputTypeOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "blocInputId" INTEGER,

    CONSTRAINT "BlocInputTypeOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlocInput" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "blocId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "BlocInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bloc" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Bloc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlocInputTypeOption" ADD CONSTRAINT "BlocInputTypeOption_blocInputId_fkey" FOREIGN KEY ("blocInputId") REFERENCES "BlocInput"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlocInput" ADD CONSTRAINT "BlocInput_blocId_fkey" FOREIGN KEY ("blocId") REFERENCES "Bloc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
