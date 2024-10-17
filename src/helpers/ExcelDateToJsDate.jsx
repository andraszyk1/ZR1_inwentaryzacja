export function ExcelDateToJSDate(data) {
    const date=new Date(Math.round((data - 25569)*86400*1000))
    
    const day=date.getDay()<10  ? "0"+date.getDay():date.getDay()
    const month=date.getMonth()<10 ? "0"+date.getMonth():date.getMonth()
    const toReturn=day+"."+month+"."+date.getFullYear()
    return toReturn;
  }