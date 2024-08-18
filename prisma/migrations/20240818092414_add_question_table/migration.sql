/*
  Warnings:

  - You are about to drop the column `applicantId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `recruiterId` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_recruiterId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "applicantId",
DROP COLUMN "jobId";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "recruiterId",
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "collectionEmail" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'short_text',
    "values" TEXT[],
    "description" TEXT,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
