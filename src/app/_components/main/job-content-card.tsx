import { Button, Card } from "@tremor/react";
import Image from "next/image";

const JobContentCard = () => {
  return (
    <Card className="!rounded-none">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            src="https://media.licdn.com/dms/image/v2/C560BAQGGH7CuU1zQfA/company-logo_100_100/company-logo_100_100/0/1661992454394?e=1732147200&v=beta&t=xiSriyjCXC45Xs7SJIs8dIIVteDzw9OldEIGpujCddA"
            alt="job-content-card"
            width={30}
            height={30}
          />
          <h1 className="text-sm font-semibold">Hill-Smith Family Estates</h1>
        </div>
        <div>
          <h1 className="cursor-pointer text-2xl font-medium hover:underline">
            Executive Director Sales ANZ
          </h1>
        </div>
        <div>
          <p className="text-xs text-gray-500">
            Adelaide, South Australia, Australia
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="rounded-full hover:bg-blue-600">Easy Apply</Button>
          <Button className="rounded-full bg-white text-blue-500 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600">
            Save
          </Button>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            About the job Executive Director – Sales ANZ About Us Hill-Smith
            Family Estates (HSFE) is a global wine company integrated through
            vine cultivation, wine growing, wine making and distribution, with a
            rich and diverse portfolio of leading fine wine brands. We have
            evolved from a single brand at Yalumba to a family of wine brands
            including Jansz Tasmania, Pewsey Vale Vineyard, Nautilus Estate and
            Oxford Landing. Our distribution businesses Samuel Smith & Son and
            Negociants represent some of the most revered family-owned wineries
            from around the globe including Champagne Pol Roger, Vasse Felix,
            Jim Barry, Wirra Wirra, Antinori, Guigal, Domaine William Fevre and
            Riedel. We pride ourselves on our family heritage and our connection
            to people, but above all the burning desire to remain a sustainable
            and successful family-owned business for generations to come. About
            the role Based in Adelaide and reporting to the Chief Executive
            Officer, the Executive Director -Sales ANZ will lead the Samuel
            Smith & Son, Negociants Australia and Negociants New Zealand sales
            teams to deliver sales aspirations, ensuring delivery of effective
            long and short-term business plans that encompass the long-term
            vision of HSFE. Samuel Smith & Son and Negociants Australia
            established by the Hill-Smith family represent a portfolio of the
            world’s finest family-owned wineries from Australia and abroad,
            servicing the Australian national retail, on-premise and independent
            retail channels. The role also leads the Negociants New Zealand
            business, a leading fine wine merchant with a portfolio of fine
            wine. Established in 1985, Negociants New Zealand proudly represents
            many of New Zealand’s most celebrated wine producers, as well as
            prestigious imported brands from Australia and around the world. As
            a member of the Executive Board of Management, the Executive
            Director – Sales ANZ contributes to business strategy development
            and implementation by staying abreast of key industry trends, risks
            and opportunities. Key tasks include. · Lead the sales and
            distribution of equity and agency wines across Australia and New
            Zealand, providing leadership and setting and delivering on strategy
            across Independent Retail, On Premise and Fine Wine Retail,
            Chains/Grocery and Customer Marketing. · Formulate and direct sales
            and customer marketing strategies to achieve HSFE portfolio/brand
            aspirations along with Principal&apos;s business and profitability
            goals aligned to the strategic direction of HSFE. · Represent the
            Australian and New Zealand distribution businesses within the
            market, the principal community and internally, in a manner
            consistent with the HSFE Charter. · Manage the distribution and
            contract negotiations of both equity and agency brands represented
            by Samuel Smith & Son, Negociants Australia, and Negociants New
            Zealand. · Develop sustainable trading partnerships to ensure strong
            sales attainment across all channels. · Lead the planning process,
            provide meaningful forecasts, and appropriate, timely responses to
            changing conditions. · Collaborate closely with leaders across the
            business to ensure sales plans and profitability targets are
            achieved. About you Tertiary qualifications in business, commerce,
            or related discipline with at least 10 years of senior executive
            sales management experience within the food, beverage or FMCG
            industries. Strategic management, leadership, mentoring, business,
            and reporting capabilities along with expert product and industry
            knowledge and the ability to deal with customers at all levels and
            translate customer needs into a complete solution. Evidence of
            strong business partnering and collaboration ability including
            outstanding negotiation skills and persuasive ability. Analytical
            interpretation and advanced problem-solving abilities and experience
            leading a strong cohesive team culture and promoting an environment
            of collaborating across teams. What is in it for you? · Competitive
            remuneration package and wine allowance. · Work with a respectful,
            collaborative, transparent and inclusive leadership team. · A
            family-owned business with a culture focused on teamwork,
            innovation, and growth. How to apply Please forward your cover
            letter and resume to Reilly Logan, Executive Director – People via
            the Apply Now function. Applications will close on 29th August 2024.
            Confidential inquiries can be directed to Reilly Logan, on 08 8561
            3206 or rlogan@hsfe.com.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default JobContentCard;
