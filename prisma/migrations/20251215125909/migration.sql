-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "userEmail" DROP NOT NULL,
ALTER COLUMN "postalCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "sizeId" TEXT;

-- CreateTable
CREATE TABLE "OrderProductExtras" (
    "id" TEXT NOT NULL,
    "orderProductId" TEXT NOT NULL,
    "extraId" TEXT NOT NULL,

    CONSTRAINT "OrderProductExtras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProductExtras" ADD CONSTRAINT "OrderProductExtras_orderProductId_fkey" FOREIGN KEY ("orderProductId") REFERENCES "OrderProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProductExtras" ADD CONSTRAINT "OrderProductExtras_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
