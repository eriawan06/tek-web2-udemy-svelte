import Cookies from 'js-cookie';

export const get = (value) => {
    const c = Cookies.get('logged_in');
    console.log("COOKIES : ", c);
    console.log(value.request.headers.cookie);
  
    return {
      status: 302,
      headers: {
        location: `http://localhost:9000`
      }
    };
};
  