export function trimString(string,coutSigns){
    let end=coutSigns ? "..." :""
    return  String(string).slice(0,coutSigns)+ end
}