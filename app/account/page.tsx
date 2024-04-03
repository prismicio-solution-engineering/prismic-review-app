// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { Database } from '../database.types'
// import AccountForm from '@/components/account-form'

import { createClient } from "@/utils/supabase/server";
import AccountForm from "@/components/AccountForm";

export default async function Account() {
  //   const supabase = createServerComponentClient<Database>({ cookies })
  // const supabase = createServerComponentClient({ cookies })

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  const supabase = createClient();

  const { data: { user }, } = await supabase.auth.getUser();

  return (
    <>
      <h1>Account page</h1>
      {/* <AccountForm user={user} /> */}
      <AccountForm user={user} />
    </>
  );
}
