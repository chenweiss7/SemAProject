import {createContext,useState,useEffect } from "react";

export const UserContext = createContext();


// user:

    //  {
    //      "id": "",
    //      "username" : "",
    //      "password" : "",
    //      "image" : "",
    //      "first_name" : "",
    //      "last_name" : "",
    //      "email" : "",
    //      "birthday" : "",
    //      "city" : "",
    //      "street" : "",
    //      "house_number" : "",
    //      "admin": ""

    //  }







export default function UserContextProvider({children}) {

    const [users,SetUsers] = useState([]);

    useEffect(() => {

    },[]);


    const LoadUsers = async () => {
        try {
            let res = await fetch("../public/data/users0json");
            let data = await res.json();
            console.log(data);
            SetUsers(data);

        } catch (error) {
            console.log(error);
        }
    }


    const FindUser = (email) => {
        let user = users.find((u) => u.email === email);
        console.log(user)
        return user;
    }

    const Login = (username, password) => {
        let user = users.find((u) => u.username == username && u.password == password)
        console.log(user)
        return user;
    }

    const AddNewUser = (nu) => {
        //let newUser = JSON.stringify(nu);
        console.log(nu);
        SetUsers((prev) =>[...prev,nu]);
        console.log(users);
    }

    const value = {users,AddNewUser,FindUser,Login};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
