import { environment } from '../environments/environment';

const BASE = environment.apiUrl+'/api';

export const ApiEndpoints = {
  Auth: {
    LOGIN: `${BASE}/auth/login`,
    REGISTER: `${BASE}/auth/register`,
    CHANGE_PASSWORD: `${BASE}/users/change-password`,
    RESET_PASSWORD: `${BASE}/auth/reset-password`,
    FORGOT_PASSWORD: `${BASE}/auth/forgot-password`

  },
  Robinhood: {
    POSITIONS: `${BASE}/robinhood/positions`,
    DOWNLOAD_POSITIONS: `${BASE}/robinhood/DownloadPositions`
  },
  Users: {
    UPLOAD_AVATAR: `${BASE}/users/upload-avatar`,
    AVATAR: `${environment.apiUrl}`,
    ME: `${BASE}/users/me`,
  },
  News: {
    GET_ALL: `${BASE}/news`
  }
};