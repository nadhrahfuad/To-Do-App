import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const dummyAccounts = [
  { id: 1, username: "admin", password: "password", name: "Admin" },
  { id: 2, username: "user", password: "password", name: "User" },
  { id: 3, username: "nadhrah", password: "password", name: "Nadhrah" }
];

const generateToken = () => {
  let token = "";
  const alphaNumerical =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tokenLength = alphaNumerical.length;
  //index to char, index base on random 
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * tokenLength)
    token += alphaNumerical[randomIndex]
  }
  return token;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialName = localStorage.getItem("name") || localStorage.setItem("name", "guest");
  const initialUserID = localStorage.getItem("userID") || "";

  const [token, setToken] = useState(initialToken);
  const [name, setName] = useState(initialName);
  const [userID, setUserID] = useState(initialUserID ? parseInt(initialUserID) : null);

  const location= useLocation();
  
// //TESTEST
  // useEffect(() => {
  //   console.log("Token updated:", token);
  // }, [token]);

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("name");
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   }
  // }, []);

  //initialize name on first open
  // useEffect(() => {
  //   const storedName= localStorage.getItem("name");
  //   if (storedName) {
  //     setName(storedName);
  //   }
  //   console.log(storedName)
  // }, []);


  // check token
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Current token:", token);
    }, 5000);

    return () => clearInterval(intervalId); 
  }, [token]);

  // useEffect(() => {
 
  //   console.log("Current token:", token);

  // }, [token]);

  //REMOVE if on LOGIN check path set username to guest
  
  //YELLOW FIX NAME GUEST ON GUEST NOT SHOWING
  useEffect(() => {
    if (location.pathname === '/login') {
      
      setUserID("");

      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      // localStorage.removeItem("name");
      localStorage.removeItem("username");

      setToken(null);
      setName("guest");
      localStorage.setItem("name", "guest");
    }
  }, [location.pathname]);
   


  const login = (enteredUsername, enteredPassword) => {
    const user = dummyAccounts.find(
      (dummyAccount) =>
        dummyAccount.username === enteredUsername && dummyAccount.password === enteredPassword
    );


//user exists, path is not login
    if(user !== "guest" || location.pathname !== "/login"){
      //generate token, store in local storage
      const newToken = generateToken();
      setToken(newToken);
      localStorage.setItem("token", newToken);
      
      //set user's name in local storage 
      setName(user.name);
      localStorage.setItem("name", user.name);
      localStorage.setItem("username", user.username);

      // set userID when logging in
      setUserID(user.id); 
      // store userID in localStorage
      localStorage.setItem("userID", user.id.toString()); 

      console.log("Token on login:"+token); 

      
    }
return true 
   
  };

  const logout = () => {
    console.log("Token before logout:"+token)
    setUserID("")

    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    // localStorage.removeItem("name");
    localStorage.removeItem("username");
    console.log("Token after logout:"+token)


    setToken(null);
    localStorage.setItem("name", "guest");

  };

 
  return (
    <AuthContext.Provider value={{ token, name, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const RequireAuth = ({ children }) => {
//   const { token } = useContext(AuthContext);

//   if (!token) {

//     console.log(token)
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

//RED
//FIXX========================================================== 
//compared generated token to the current token*** 

// import { createContext, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const dummyAccounts = [
//   { id: 1, username: "admin", password: "password", name: "Admin" },
//   { id: 2, username: "user", password: "password", name: "User" },
//   { id: 3, username: "nadhrah", password: "password", name: "Nadhrah" }
// ];

// const generateToken = () => {
//   let token = "";
//   const alphaNumerical =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const tokenLength = alphaNumerical.length;
//   for (let i = 0; i < 16; i++) {
//     const randomIndex = Math.floor(Math.random() * tokenLength)
//     token += alphaNumerical[randomIndex]
//   }
//   return token;
// };

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const initialToken = localStorage.getItem("token");
//   const initialName = localStorage.getItem("name") || localStorage.setItem("guest");
//   const initialUserID = localStorage.getItem("userID") || "";

//   const [token, setToken] = useState(initialToken);
//   const [name, setName] = useState(initialName);
//   const [userID, setUserID] = useState(initialUserID ? parseInt(initialUserID) : null);
//   const [generatedToken, setGeneratedToken] = useState("");

//   const location = useLocation();

//   useEffect(() => {
//     setGeneratedToken(generateToken());
//   }, []);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       console.log("Current token:", token);
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, [token]);

//   useEffect(() => {
//     if (location.pathname === '/login') {
//       setUserID("");
//       localStorage.removeItem("token");
//       localStorage.removeItem("userID");
//       localStorage.removeItem("username");
//       setToken(null);
//       setName("guest");
//       localStorage.setItem("name", "guest");
//     }
//   }, [location.pathname]);

//   const login = (enteredUsername, enteredPassword) => {
//     const user = dummyAccounts.find(
//       (dummyAccount) =>
//         dummyAccount.username === enteredUsername && dummyAccount.password === enteredPassword
//     );

//     if (user) {
//       const newToken = generateToken();
//       setToken(newToken);
//       localStorage.setItem("token", newToken);

//       setName(user.name);
//       localStorage.setItem("name", user.name);
//       localStorage.setItem("username", user.username);

//       setUserID(user.id);
//       localStorage.setItem("userID", user.id.toString());

//       console.log("Token on login:", newToken);

//       return true;
//     }

//     return false;
//   };

//   const logout = () => {
//     console.log("Token before logout:", token);
//     setUserID("");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userID");
//     localStorage.removeItem("username");
//     console.log("Token after logout:", token);
//     setToken(null);
//     localStorage.setItem("name", "guest");
//   };

//   return (
//     <AuthContext.Provider value={{ generatedToken, token, name, userID, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
