export default class UserApi {
  

static async login(username, password) {
    var query = {
      username: username,
      password: password
    };
    const requestOptions = {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };
    const response = await fetch(process.env.REACT_APP_BACKEND + "/api/user/login", requestOptions);
    const data = await response.json();
    if (response.status == 200) {
      return {data,success:true}
    }
    return {message:data.message,success:false};
  }

}