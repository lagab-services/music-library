import {AuthTokenResponse, PlatformServiceInterface} from "#interfaces/playlist/platform.interface";
import axios from "axios";
import Env from "#start/env";
import * as querystring from "querystring";

export class SpotifySerice implements PlatformServiceInterface {


  /**
   * Refreshes the Spotify access token using the provided refresh token.
   * @param refreshToken The Spotify refresh token.
   * @returns A promise resolving to the new access token.
   */
  async refreshAccessToken(refreshToken: string): Promise<AuthTokenResponse> {

    try {
      const response = await axios.post(`${Env.get('SPOTIFY_AUTH_URL')}/api/token`, querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: Env.get('SPOTIFY_CLIENT_ID'),
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      };
    } catch (error) {
      console.error('Error getting Spotify refresh token:', error.response.data);
      throw new Error('Failed to retrieve Spotify refresh token.');
    }

  }

  /**
   * Returns the Spotify authorization URL.
   */
  getAuthUrl(): string {
    return `${Env.get('SPOTIFY_AUTH_URL')}/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: Env.get('SPOTIFY_CLIENT_ID'),
      scope: Env.get('SPOTIFY_AUTH_SCOPES'),
      redirect_uri: Env.get('SPOTIFY_REDIRECT_URI'),
    })}`;
  }

  /**
   * Fetches the user's favorite items from Spotify.
   * @param accessToken The Spotify access token.
   * @throws Error for unimplemented method.
   */
  getFavorites(accessToken: string): Promise<any> {
    throw new Error("Method not implemented. Access token provided: "
      + accessToken);
  }

  /**
   * Retrieves the Spotify access token using the authorization code.
   * @param code The authorization code received from Spotify.
   * @returns The access token as a string.
   */
  async getAccessToken(code: string): Promise<AuthTokenResponse> {

    try {
      const response = await axios.post(`${Env.get('SPOTIFY_AUTH_URL')}/api/token`, querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: Env.get('SPOTIFY_REDIRECT_URI'),
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (Buffer.from(`${Env.get('SPOTIFY_CLIENT_ID')}:${Env.get('SPOTIFY_CLIENT_SECRET')}`).toString('base64'))
        },
      });
      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      };
    } catch (error) {
      console.error('Error getting Spotify access token:', error.response.data);
      throw new Error('Failed to retrieve Spotify access token.');
    }

  }

  /**
   * Retrieves the user's playlists from Spotify.
   * @param accessToken The Spotify access token.
   * @returns A promise resolving to the list of playlists.
   */
  public async getPlaylists(accessToken: string): Promise<any> {
    const SPOTIFY_URL = Env.get('SPOTIFY_URL')
    const response = await axios.get(`${SPOTIFY_URL}/me/playlists`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });
    return response.data.items;
  }

}
