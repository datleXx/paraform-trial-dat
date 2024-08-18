-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_job_id_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationQuestionAnswer" DROP CONSTRAINT "ApplicationQuestionAnswer_application_id_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationQuestionAnswer" DROP CONSTRAINT "ApplicationQuestionAnswer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_application_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_job_id_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("remote_job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("remote_job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationQuestionAnswer" ADD CONSTRAINT "ApplicationQuestionAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationQuestionAnswer" ADD CONSTRAINT "ApplicationQuestionAnswer_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
