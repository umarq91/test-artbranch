import { feedPostsPerPage } from "../constants";
import { supabase } from "../services/supabase";
export const fetchSearchProfiles = async (
  query: string,
  state: string,
  suburb: string,
  postalCode: string,
  category: string,
  offset: number,
) => {
  let queryBuilder = supabase
    .from("profiles")
    .select("*")
    .eq("role", "Artist")
    .range(offset, offset + feedPostsPerPage - 1);

  queryBuilder = queryBuilder
    .order("full_name", { ascending: true })
    .order("username", { ascending: true });

  if (query) {
    queryBuilder = queryBuilder.or(
      `and(show_name.eq.true,or(username.ilike.%${query}%,full_name.ilike.%${query}%)),` +
        `and(show_name.eq.false,username.ilike.%${query}%),` +
        `tags.cs.{${query}}`,
    );
  }

  if (state) {
    queryBuilder = queryBuilder.eq("state", `${state}`);
  }
  if (suburb) {
    queryBuilder = queryBuilder.ilike("suburb", `%${suburb}%`);
  }
  if (postalCode) {
    queryBuilder = queryBuilder.ilike("postal", `%${postalCode}%`);
  }
  if (category) {
    console.log(category);

    queryBuilder = queryBuilder.contains("categories", [category]);
  }

  // Execute the query
  const { data, error } = await queryBuilder;

  if (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }

  return data;
};

export const fetchSearchPortfolios = async (
  query: string,
  state: string,
  suburb: string,
  postal: string,
  offset: number,
) => {
  try {
    let queryBuilder = supabase
      .from("portfolio")
      .select(
        `   *,
                media(*),
               profiles!inner(state,suburb,postal)
            `,
      )
      .eq("is_story", true)
      .eq("is_deleted", false)
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .range(offset, offset + feedPostsPerPage - 1)

    // Apply filters conditionally based on provided values
    if (query) {
      queryBuilder = queryBuilder.ilike("title", `%${query}%`);
    }

    if (state) {
      queryBuilder = queryBuilder.eq("profiles.state", state);
    }

    if (suburb) {
      queryBuilder = queryBuilder.ilike("profiles.suburb", `%${suburb}%`);
    }

    if (postal) {
      queryBuilder = queryBuilder.ilike("profiles.postal", `%${postal}%`);
    }

    // Execute the query
    const { data, error } = await queryBuilder;

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error("Error searching portfolios:", error);
    return null;
  }
};
