import React,{createContext,useState} from "react";

export const UserContext = createContext({ username: '', auth: false });
export const  UserProvider = ({ children }) => {
    // User is the username of the "data" that gets stored in context
   
    let localuser=JSON.parse(localStorage.getItem("user"))??{ username: '',user_type:"",token:"",auth: false }
    const [user, setUser] = useState(localuser);
  
    // Login updates the user data with a username parameter
    const login = (user) => {
      let tempUser={
        username: user.data.username,
        user_type:user.data.user_type,
        token:user.data.token,
        auth: true,
      }
      setUser((user) => (tempUser));
      localStorage.setItem("user",JSON.stringify(tempUser) )    
    };
  
    // Logout updates the user data to default
    const logout = () => {
      let tempUser={
        username: '',
        user_type:'',
        token:'',
        auth: false,
      }
      setUser((user) => (tempUser));
      localStorage.setItem("user",JSON.stringify(tempUser) )  
    };
  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  }