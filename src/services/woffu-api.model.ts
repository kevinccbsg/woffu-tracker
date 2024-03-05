export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  userName: string;
  '.issued': string;
  '.expires': string;
}

export interface TrackTimeResponse {
  signEventId: string;
}
