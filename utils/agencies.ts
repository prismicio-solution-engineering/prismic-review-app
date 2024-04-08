import { createClient } from "./supabase/client";

interface Agency {
  id: number;
  name: string;
}

const supabase = createClient();

export const addAgency = async (name: string): Promise<Agency | null> => {
  const { data, error } = await supabase
    .from("agencies")
    .insert([{ name }])
    .single();

  if (error) {
    console.error("Error adding agency:", error);
    return null;
  }

  console.log("Added agency:", data);
  // return true;
  return data as Agency;
};

export const updateAgency = async (id: number, updateData: Partial<Agency>) => {
  const { data: updatedAgency, error } = await supabase
    .from("agencies")
    .update(updateData)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error editing agency:", error);
    return null;
  }

  return true;
};

export const getAgencies = async () => {
  const { data: agencies, error } = await supabase
    .from("agencies")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching agencies:", error);
    return [];
  }

  return agencies;
};

export const getAgency = async (id: number) => {
  const { data: agencies, error } = await supabase
    .from("agencies")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error(`Error fetching agency ID ${id}`, error);
    return [];
  }

  return agencies;
};