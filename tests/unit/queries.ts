export const QUERY_WITH_ONE_VARIABLE = ` subscription getCaptionsSince($locale: String!) {
  caption_history(where: { locale: { _eq: $locale } }) {
    captionText
  }
}
`;

export const QUERY_WITH_TWO_VARIABLES = ` subscription getCaptionsSince($locale: String!, $since: timestamptz!) {
  caption_history(
    where: { locale: { _eq: $locale }, createdAt: { _gt: $since } }
  ) {
    captionText
  }
}
`;

export const EN_VARIABLES = { locale: 'en' };
export const PT_BR_VARIABLES = { locale: 'pt-BR' };
