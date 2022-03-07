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
  static async getUsers() {
    let localuser=JSON.parse(localStorage.getItem("user"))??{ username: '',user_type:"",token:"",auth: false }
    const requestOptions = {
      method: "GET",
      credentials: 'include',
      headers: { "Content-Type": "application/json","token":localuser.token}
    };

    const response = await fetch(process.env.REACT_APP_BACKEND + "/api/users", requestOptions);
    console.log(response)
    const data = await response.json();
    if (response.status == 200) {
      return {data,success:true}
    }
    return {message:data.message,success:false};
  }
  static async updateUser(user) {
    let localuser=JSON.parse(localStorage.getItem("user"))??{ username: '',user_type:"",token:"",auth: false }
    const requestOptions = {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json","token":localuser.token},
      body:user.data
    };

    const response = await fetch(process.env.REACT_APP_BACKEND + `/api/user/${user.id}`, requestOptions);
    const data = await response.json();
    if (response.status == 200) {
      return {data,success:true}
    }
    return {message:data.message,success:false};
  }
  static async add(user) {
    console.log(user.data)
    let localuser=JSON.parse(localStorage.getItem("user"))??{ username: '',user_type:"",token:"",auth: false }
    const requestOptions = {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json","token":localuser.token},
      body:user.data
    };

    const response = await fetch(process.env.REACT_APP_BACKEND + `/api/user/`, requestOptions);
    console.log(response)
    const data = await response.json();
    if (response.status == 200) {
      return {data,success:true}
    }
    return {message:data.message,success:false};
  }
  static async delete({id}) {
    let localuser=JSON.parse(localStorage.getItem("user"))??{ username: '',user_type:"",token:"",auth: false }
    const requestOptions = {
      method: "GET",
      credentials: 'include',
      headers: { "Content-Type": "application/json","token":localuser.token}
    };

    const response = await fetch(process.env.REACT_APP_BACKEND + `/api/user/${id}`, requestOptions);
    const data = await response.json();
    if (response.status == 200) {
      return {data,success:true}
    }
    return {message:data.message,success:false};
  }

}