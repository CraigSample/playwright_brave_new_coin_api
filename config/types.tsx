export type AccessTokenRequest = {
  grant_type: string;
  client_id: string;
  client_secret?: string;
  audience: string;
};

export type AccessTokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export type AppsResponseEntry = {
  uuid: string;
  name: string;
  temporaryTokenRoles: string[];
};

export type ListAssetsEntry = {
  id: string;
  name: string;
  symbol: string;
  slugName?: string;
  status: string;
  type: string;
  url?: string;
  contractAddress?: string;
};

export type ListAssetsResponse = {
  content: ListAssetsEntry[];
};
