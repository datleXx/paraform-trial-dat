/*
  Warnings:

  - A unique constraint covering the columns `[remote_job_id]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_job_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Job_remote_job_id_key" ON "Job"("remote_job_id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("remote_job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("remote_job_id") ON DELETE RESTRICT ON UPDATE CASCADE;
