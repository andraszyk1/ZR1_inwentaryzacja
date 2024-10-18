import React, { useRef, useState } from "react";
import { trimString } from "../helpers/trimString";

function Td({item,trim}) {
const [itemValue,setItemValue]=useState(true)
const [trimN]=useState(trim)
  return (
    <td className="px-1 py-1 transition-all hover:cursor-pointer" onMouseOver={() => setItemValue(false)} onMouseLeave={(()=>setItemValue(true))}>
      {itemValue ? trimString(item, trimN):item}
    </td>
  );
}

export default Td;
