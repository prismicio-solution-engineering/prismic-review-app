import { createClient } from "@/prismicio";
import Header from "@/components/Header";
import { Content } from "@prismicio/client";
import { AgenciesList } from "@/components/Agencies/AgenciesList";
import { ReviewsList } from "@/components/Reviews/ReviewsList";
export default async function Page() {
  const client = createClient();
  const navigation =
    await client.getSingle<Content.NavigationDocument>("navigation");

  return (
    <>
      <Header navigation={navigation} />
      <div>
        {/* Add edit to be able to edit the reviews, criterias and agencies */}
        <AgenciesList />
        <ReviewsList /> 
      </div>
    </>
  );
}
