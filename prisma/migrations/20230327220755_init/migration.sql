-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zestawy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Zestawy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "woId" INTEGER NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WartosciOdzywcze" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alergeny" TEXT,
    "kcal100g" DECIMAL(5,2),
    "kcalPorcja" DECIMAL(5,2) NOT NULL,
    "kcalRI" DECIMAL(5,2) NOT NULL,
    "tluszcze100g" DECIMAL(5,2),
    "tluszczePorcja" DECIMAL(5,2) NOT NULL,
    "tluszczeRI" DECIMAL(5,2) NOT NULL,
    "tluszczeNasycone100g" DECIMAL(5,2),
    "tluszczeNasyconePorcja" DECIMAL(5,2) NOT NULL,
    "tluszczeNasyconeRI" DECIMAL(5,2) NOT NULL,
    "weglowodany100g" DECIMAL(5,2),
    "weglowodanyPorcja" DECIMAL(5,2) NOT NULL,
    "weglowodanyRI" DECIMAL(5,2) NOT NULL,
    "cukry100g" DECIMAL(5,2),
    "cukryPorcja" DECIMAL(5,2) NOT NULL,
    "cukryRI" DECIMAL(5,2) NOT NULL,
    "blonnik100g" DECIMAL(5,2),
    "blonnikPorcja" DECIMAL(5,2) NOT NULL,
    "bialko100g" DECIMAL(5,2),
    "bialkoPorcja" DECIMAL(5,2) NOT NULL,
    "bialkoRI" DECIMAL(5,2) NOT NULL,
    "sol100g" DECIMAL(5,2),
    "solPorcja" DECIMAL(5,2) NOT NULL,
    "solRI" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "WartosciOdzywcze_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FoodToZestawy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Zestawy_name_key" ON "Zestawy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_woId_key" ON "Food"("woId");

-- CreateIndex
CREATE UNIQUE INDEX "WartosciOdzywcze_name_key" ON "WartosciOdzywcze"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToZestawy_AB_unique" ON "_FoodToZestawy"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToZestawy_B_index" ON "_FoodToZestawy"("B");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_woId_fkey" FOREIGN KEY ("woId") REFERENCES "WartosciOdzywcze"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToZestawy" ADD CONSTRAINT "_FoodToZestawy_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToZestawy" ADD CONSTRAINT "_FoodToZestawy_B_fkey" FOREIGN KEY ("B") REFERENCES "Zestawy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
