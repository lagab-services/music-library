export interface AuthTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface PlatformServiceInterface {
  getAccessToken(code: string): Promise<AuthTokenResponse>;

  refreshAccessToken(refreshToken: string): Promise<AuthTokenResponse>;

  getAuthUrl(): string;

  getFavorites(accessToken: string): Promise<any>;

  getPlaylists(accessToken: string): Promise<any>;
}
