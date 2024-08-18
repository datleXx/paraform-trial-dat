-- DropForeignKey
ALTER TABLE "CandidateToApplication" DROP CONSTRAINT "CandidateToApplication_application_id_fkey";

-- DropForeignKey
ALTER TABLE "CandidateToApplication" DROP CONSTRAINT "CandidateToApplication_candidate_id_fkey";

-- AddForeignKey
ALTER TABLE "CandidateToApplication" ADD CONSTRAINT "CandidateToApplication_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateToApplication" ADD CONSTRAINT "CandidateToApplication_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
