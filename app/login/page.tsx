import { AuthForm } from "@/components/AuthForm";
import Header from "@/components/Header";
// import AuthForm from "@/components/auth-form";
import { createClient } from "@/prismicio";
import { getAuthContent } from "@/utils/getAuthContent";
import { Content } from "@prismicio/client";

export default async function Page() {
  const client = createClient();
  const navigation =
    await client.getSingle<Content.NavigationDocument>("navigation");
  const AuthContent = await getAuthContent();
  return (
    <>
      <Header navigation={navigation} />
      <div className="mx-auto max-w-screen-sm my-16 flex flex-col">
        <div className=" my-10">
          <h1 className="header">Supabase Auth + Storage</h1>
          <p>
            Experience our Auth and Storage through a simple profile management
            example. Create a user profile and upload an avatar image. Fast,
            simple, secure.
          </p>
        </div>
        <div>
          <AuthForm data={AuthContent} />
        </div>
      </div>
    </>
  );
}
