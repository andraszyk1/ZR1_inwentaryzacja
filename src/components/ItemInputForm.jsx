import React from "react";

function ItemInputForm({value,name,label,onChange,hidden=false}) {
  return (<>
    {!hidden &&
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label htmlFor={name} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
        <input
          value={value}
          name={name}
          placeholder={label}
          type="input"
          onChange={onChange}
          className="appearance-none text-sm block w-full bg-gray-200 text-gray-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          hidden={hidden}
        />
    </div>
       }
       </>
  );
}

export default ItemInputForm;
