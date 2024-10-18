import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

function SelectUserForm({ value, name, label, onChange, hidden = false }) {
  const url = "http://localhost:5001/items/users";
  const [search, setSearch] = useState("");
  const [showSelect, setShowSelect] = useState(false);

  useEffect(()=>{
    if(value!==undefined){
      setSearch(value)
    }
  },[])
  const getUsers = async (search) => {
    const params = `?search=${search}`;
    try {
      const response = await axios.get(`${url}${params}`);
      return response.data;
    } catch {
      throw Error("Bład");
    }
  };
  const { data: users, isPending } = useQuery({
    queryKey: ["users", search],
    queryFn: () => getUsers(search),
  });
  const handleOnChange = (e) => {
    onChange(e);
    setSearch(e.target.value);
    setShowSelect(false);
  };
  const handleSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    if (String(value).length === 0) {
      setShowSelect(false);
    } else if (String(value).length > 0) {
      if (users?.length === 0) {
        setShowSelect(false);
      } else {
        setShowSelect(true);
      }
    }
  };
  
  return (
    <>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          htmlFor={name}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          {label}
        </label>
        <input
          type="input"
          placeholder="Wybierz osobę..."
          value={search}
          onChange={(e) => handleSearch(e)}
          className="appearance-none text-sm block w-full bg-gray-200 text-gray-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />

        {showSelect ? (
          <select
            size={users?.length}
            value={value}
            name={name}
            placeholder={label}
            type="input"
            onChange={(e) => handleOnChange(e)}
            className=" bottom-2 appearance-none text-sm block w-full border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            hidden={hidden}
          >
            <option defaultValue="" value="" key='selected'>Wybierz</option>
            
            {value!==undefined ?
              users?.map((user,index) => {
                return (
                  <option key={index} value={user.osobaOdpowiedzialna}>
                    {user.osobaOdpowiedzialna}
                  </option>
                );
              }):<option  value={value}>{value}</option>}
          </select>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default SelectUserForm;
