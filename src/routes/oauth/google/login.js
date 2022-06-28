export const get = (from) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: import.meta.env.VITE_CLIENT_APP_GOOGLE_OAUTH_REDIRECT,
    client_id: import.meta.env.VITE_CLIENT_APP_GOOGLE_OAUTH_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: '71dc3accb7ebcab8a322d85d88b0a6ae123a4ed6a788ea6d',
  };

  const qs = new URLSearchParams(options);
  console.log(qs.toString());

  return {
    status: 302,
    headers: {
      location: `${rootUrl}?${qs.toString()}`
    }
  };
};
