'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData): Promise<string | undefined> {
  console.log(formData)
  const supabase = createClient()

  const email = formData.email as string;
  const password = formData.password as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.log(error)
    return error.message
  }

  // revalidatePath('/', 'layout')
  // redirect('/account')
}

export async function signup(formData: FormData): Promise<string | undefined> {
  const supabase = createClient()

  const email = formData.email as string;
  const password = formData.password as string;
  // Additional data can be passed during sign up if needed (e.g., name)
  const name = formData.name as string;

  const { user, error } = await supabase.auth.signUp({ name, email, password });

  if (error) {
    return error.message
  }

  // revalidatePath('/', 'layout')
  redirect('/account')
}