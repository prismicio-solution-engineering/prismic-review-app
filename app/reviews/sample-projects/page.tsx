import { createClient } from "@/prismicio";
import Header from "@/components/Header";
import { Content } from "@prismicio/client";
import { AgenciesList } from "@/components/Agencies/AgenciesList";
import { ReviewsList } from "@/components/Reviews/ReviewsList";
import { getReviewsChecklist } from "@/utils/getReviewsChecklist";
import { Button } from "@/components/Button";

export default async function Page() {
  const client = createClient();
  const navigation =
    await client.getSingle<Content.NavigationDocument>("navigation");
  const checklist = await getReviewsChecklist();

  return (
    <>
      <Header navigation={navigation} />
      <div className="max-w-screen-2xl mx-auto">
        {/* Add edit to be able to edit the reviews, criterias and agencies */}
        <AgenciesList />
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-row gap-6">
            <Button color="black" href="/reviews/app/sample-project">
              New Sample Project
            </Button>
          </div>
          <ReviewsList prismicCriteria={checklist.data.criteria} />
        </div>
      </div>
    </>
  );
}
