import { Button, Card } from "@tremor/react";
import Image from "next/image";
import {
  RiArrowGoBackFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHeart2Line,
  RiHeartLine,
} from "@remixicon/react";

const JobContentCard = ({
  totalJobs,
  activeJob,
  setActiveJob,
}: {
  totalJobs: number;
  activeJob: number;
  setActiveJob: (index: number | null) => void;
}) => {
  return (
    <Card className="!rounded-none">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {activeJob !== null && (
            <div className="mr-3 md:hidden">
              <RiArrowLeftSLine
                className="cursor-pointer"
                onClick={() => setActiveJob(null)}
                size={20}
              />
            </div>
          )}
          <Image
            src="https://media.licdn.com/dms/image/v2/C560BAQGGH7CuU1zQfA/company-logo_100_100/company-logo_100_100/0/1661992454394?e=1732147200&v=beta&t=xiSriyjCXC45Xs7SJIs8dIIVteDzw9OldEIGpujCddA"
            alt="job-content-card"
            width={30}
            height={30}
            className="rounded-md border border-gray-200"
          />
          <h1 className="text-sm font-semibold transition-all hover:underline">
            Hill-Smith Family Estates
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="items-center justify-center rounded-full p-2 text-gray-500 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
              disabled={activeJob === 0}
            >
              <RiArrowLeftSLine
                className="h-4 w-4"
                onClick={() => setActiveJob(activeJob - 1)}
              />
            </button>
            <button
              className="items-center justify-center rounded-full p-2 text-gray-500 transition-all hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              disabled={activeJob === totalJobs - 1}
            >
              <RiArrowRightSLine
                className="h-4 w-4"
                onClick={() => setActiveJob(activeJob + 1)}
              />
            </button>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-start gap-2">
            <h1 className="cursor-pointer text-2xl font-medium transition-all hover:underline">
              {activeJob + 1}. Executive Director Sales ANZ{" "}
            </h1>
            <button className="rounded-full p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-red-600">
              <RiHeartLine className="h-6 w-6" />
            </button>
            <div className="ml-auto flex items-center gap-2">
              <Button className="rounded-full hover:bg-blue-600">
                Easy Apply
              </Button>
            </div>
          </div>
          <p className="text-sm font-light text-gray-500">
            Adelaide, South Australia, Australia
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <div className="text-base font-medium">Skills</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <div className="rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-black/75">
                Sales
              </div>
              <div className="rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-black/75">
                Sales
              </div>{" "}
              <div className="rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-black/75">
                Sales
              </div>{" "}
              <div className="rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-black/75">
                Sales
              </div>{" "}
              <div className="rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-black/75">
                Sales
              </div>
            </div>
          </div>
          <div>
            <div className="text-base font-medium">Salary Range</div>
            <div className="mt-1 text-sm font-light text-gray-500">
              $100,000 - $150,000
            </div>
          </div>
          <div>
            <div className="text-base font-medium">Equity</div>
            <div className="mt-1 text-sm font-light text-gray-500">1-2%</div>
          </div>

          <div>
            <div className="text-base font-medium">Location</div>
            <div className="mt-1 text-sm font-light text-gray-500">
              Adelaide, South Australia, Australia (Hybrid)
            </div>
          </div>
          <div>
            <div className="text-base font-medium">Application Deadline</div>
            <div className="mt-1 text-sm font-light text-gray-500">
              29th August 2024
            </div>
          </div>
          <div>
            <div className="text-base font-medium">About the job</div>
            <p className="mt-1 text-sm font-light text-gray-500">
              About the job Executive Director – Sales ANZ About Us Hill-Smith
              Family Estates (HSFE) is a global wine company integrated through
              vine cultivation, wine growing, wine making and distribution, with
              a rich and diverse portfolio of leading fine wine brands. We have
              evolved from a single brand at Yalumba to a family of wine brands
              including Jansz Tasmania, Pewsey Vale Vineyard, Nautilus Estate
              and Oxford Landing. Our distribution businesses Samuel Smith & Son
              and Negociants represent some of the most revered family-owned
              wineries from around the globe including Champagne Pol Roger,
              Vasse Felix, Jim Barry, Wirra Wirra, Antinori, Guigal, Domaine
              William Fevre and Riedel. We pride ourselves on our family
              heritage and our connection to people, but above all the burning
              desire to remain a sustainable and successful family-owned
              business for generations to come. About the role Based in Adelaide
              and reporting to the Chief Executive Officer, the Executive
              Director -Sales ANZ will lead the Samuel Smith & Son, Negociants
              Australia and Negociants New Zealand sales teams to deliver sales
              aspirations, ensuring delivery of effective long and short-term
              business plans that encompass the long-term vision of HSFE. Samuel
              Smith & Son and Negociants Australia established by the Hill-Smith
              family represent a portfolio of the world’s finest family-owned
              wineries from Australia and abroad, servicing the Australian
              national retail, on-premise and independent retail channels. The
              role also leads the Negociants New Zealand business, a leading
              fine wine merchant with a portfolio of fine wine. Established in
              1985, Negociants New Zealand proudly represents many of New
              Zealand’s most celebrated wine producers, as well as prestigious
              imported brands from Australia and around the world. As a member
              of the Executive Board of Management, the Executive Director –
              Sales ANZ contributes to business strategy development and
              implementation by staying abreast of key industry trends, risks
              and opportunities. Key tasks include. · Lead the sales and
              distribution of equity and agency wines across Australia and New
              Zealand, providing leadership and setting and delivering on
              strategy across Independent Retail, On Premise and Fine Wine
              Retail, Chains/Grocery and Customer Marketing. · Formulate and
              direct sales and customer marketing strategies to achieve HSFE
              portfolio/brand aspirations along with Principal&apos;s business
              and profitability goals aligned to the strategic direction of
              HSFE. · Represent the Australian and New Zealand distribution
              businesses within the market, the principal community and
              internally, in a manner consistent with the HSFE Charter. · Manage
              the distribution and contract negotiations of both equity and
              agency brands represented by Samuel Smith & Son, Negociants
              Australia, and Negociants New Zealand. · Develop sustainable
              trading partnerships to ensure strong sales attainment across all
              channels. · Lead the planning process, provide meaningful
              forecasts, and appropriate, timely responses to changing
              conditions. · Collaborate closely with leaders across the business
              to ensure sales plans and profitability targets are achieved.
              About you Tertiary qualifications in business, commerce, or
              related discipline with at least 10 years of senior executive
              sales management experience within the food, beverage or FMCG
              industries. Strategic management, leadership, mentoring, business,
              and reporting capabilities along with expert product and industry
              knowledge and the ability to deal with customers at all levels and
              translate customer needs into a complete solution. Evidence of
              strong business partnering and collaboration ability including
              outstanding negotiation skills and persuasive ability. Analytical
              interpretation and advanced problem-solving abilities and
              experience leading a strong cohesive team culture and promoting an
              environment of collaborating across teams. What is in it for you?
              · Competitive remuneration package and wine allowance. · Work with
              a respectful, collaborative, transparent and inclusive leadership
              team. · A family-owned business with a culture focused on
              teamwork, innovation, and growth. How to apply Please forward your
              cover letter and resume to Reilly Logan, Executive Director –
              People via the Apply Now function. Applications will close on 29th
              August 2024. Confidential inquiries can be directed to Reilly
              Logan, on 08 8561 3206 or rlogan@hsfe.com.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobContentCard;
