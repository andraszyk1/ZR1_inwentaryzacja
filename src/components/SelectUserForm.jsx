import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
const url = "http://localhost:5001/items/users";
function SelectUserForm({value,name,label,onChange,hidden=false}) {
  
  const [search,setSearch]=useState("")

  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(search),
  });
  const getUsers = async (search) => {
    const params = `?search=${search}`;
    try {
      const response = await axios.get(`${url}${params}`);
      console.log(response.data);
      
      return response.data
    } catch {
      throw Error("Bład");
    }
  };

  
  return (<>
    {!hidden &&
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label htmlFor={name} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
        <select
          value={value}
          name={name}
          placeholder={label}
          type="input"
          onChange={onChange}
          className="appearance-none text-sm block w-full bg-gray-200 text-gray-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          hidden={hidden}
        >
        {users?.map((user)=>{ return ( <option value={user.osobaOdpowiedzialna}>{user.osobaOdpowiedzialna}</option>)})}
        </select>
    </div>
       }
       </>
  );
}

export default SelectUserForm;
