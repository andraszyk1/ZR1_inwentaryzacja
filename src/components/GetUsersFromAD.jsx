import axios from "axios";
import React, { useEffect, useState } from "react";

function GetUsersFromAD() {
    const url = "http://localhost:5001/getusersfromad";
    const [getUsersFromAD, setGetUsersFromAD] = useState(false);
    const getUsers = async () => {
        try {
          const response = await axios.get(`${url}`);
          return response.data;
        } catch {
          throw Error("Bład");
        }
      };
    useEffect(()=>{
        if(getUsersFromAD){
            getUsers()
        }
        console.log(getUsersFromAD);
        
    },[getUsersFromAD])
   const handleSetGetUsersFromAD=()=>{
    setGetUsersFromAD(true)
   }
   
  return (
    <div><button onClick={handleSetGetUsersFromAD} className="bg-sky-400 p-2 hover:transition-colors md:w-64 xl:w-64 hover:bg-sky-300 w-full rounded-md">Pobierz użytkowników z AD</button></div>
  )
}

export default GetUsersFromAD