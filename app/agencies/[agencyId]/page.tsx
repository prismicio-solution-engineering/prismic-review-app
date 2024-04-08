import { createClient } from "@/prismicio";
import Header from "@/components/Header";
import { Content } from "@prismicio/client";
import { getAgency } from "@/utils/agencies";
import { AgencyDashboard } from "@/components/Agencies/AgencyDashboard";
import { getReviewsChecklist } from "@/utils/getReviewsChecklist";

export default async function Page({
  params,
}: {
  params: { agencyId: number };
}) {
  const client = createClient();
  const navigation =
    await client.getSingle<Content.NavigationDocument>("navigation");
  const agencyData = await getAgency(params.agencyId);
  const checklist = await getReviewsChecklist();

  return (
    <>
      <Header navigation={navigation} />
      <div className="max-w-screen-2xl mx-auto">
        <AgencyDashboard
          agencyData={agencyData}
          prismicCriteria={checklist.data.criteria}
        />
      </div>
    </>
  );
}
