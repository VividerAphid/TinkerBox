function encrypt(inp, keyNum){
    let alphabet = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-=+[]{}';:,.<> "
    let out = "";
    for(let r = 0; r < inp.length; r++){
        let ind = alphabet.indexOf(inp[r]);
        let newInd;
        if(ind + keyNum >= alphabet.length){
            newInd = (ind + keyNum) % alphabet.length;
        }
        else{
            newInd = ind + keyNum;
        }
        out += alphabet.charAt(newInd);
    }
    return out;
}