/*
  Warnings:

  - You are about to drop the column `title` on the `movies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[movieName,category]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movieName` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "movies_title_category_key";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "title",
ADD COLUMN     "movieName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movies_movieName_category_key" ON "movies"("movieName", "category");
