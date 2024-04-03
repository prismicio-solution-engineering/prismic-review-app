import * as prismic from "@prismicio/client";

export interface NavigationDocument extends prismic.PrismicDocument {
  data: {
    data: {
      sign_in_title: prismic.KeyTextField;
      email_field_label: prismic.KeyTextField;
      email_field_placeholder: prismic.KeyTextField;
      password_field_label: prismic.KeyTextField;
      password_field_placeholder: prismic.KeyTextField;
      sign_in_button_label: prismic.KeyTextField;
      switch_to_sign_up_text: prismic.KeyTextField;
      non_existing_account_error_message: prismic.KeyTextField;
      sign_up_title: prismic.KeyTextField;
      name_field_label: prismic.KeyTextField;
      name_field_placeholder: prismic.KeyTextField;
      sign_up_button_label: prismic.KeyTextField;
      switch_to_sign_in_text: prismic.KeyTextField;
      existing_account_error_message: prismic.KeyTextField;
    };
  };
}

const navigationQuery = `
{
  navigation {
    sign_in_title
    email_field_label
    email_field_placeholder
    password_field_label
    password_field_placeholder
    sign_in_button_label
    switch_to_sign_up_text
    non_existing_account_error_message
    sign_up_title
    name_field_label
    name_field_placeholder
    sign_up_button_label
    switch_to_sign_in_text
    existing_account_error_message
  }
}`;

const client = prismic.createClient<NavigationDocument>(
  "https://prismic-partners-web.cdn.prismic.io/api/v2"
);

export const getAuthContent = async () => {
  try {
    const AuthContent = await client.getSingle("navigation", {
      graphQuery: navigationQuery,
    });
    return AuthContent.data;
  } catch (error) {
    console.log("Error fetching the Auth content :", error);
    return [];
  }
};
