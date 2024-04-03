import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { getReviewsChecklist } from "@/utils/getReviewsChecklist";
import Header from "@/components/Header";
import { Feedback } from "@/components/Reviews/Feedback";

export default async function Page() {
  const client = createClient();
  const checklist = await getReviewsChecklist();
  const navigation =
    await client.getSingle<Content.NavigationDocument>("navigation");

  return (
    <>
      <Header navigation={navigation} />
      <Feedback criteria={checklist?.data?.criteria} reviewType="sample" />
    </>
  );
}
