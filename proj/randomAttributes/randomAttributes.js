function genAttributeName(length){
    let chunks = ["la", "ra", "fa", "da", "ta", "lo", "ro", "fo", "do", "le", "re", "fe", "de", "te"];
    let out = "";
    for(let r = 0; r < length; r++){
        let pick = Math.floor(Math.random()*chunks.length);
        out += chunks[pick];
    }
    return out;
}

function assignAttribute(obj, attribute, value){
    obj[attribute] = value;
}