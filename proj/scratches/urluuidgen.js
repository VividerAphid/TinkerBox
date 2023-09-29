//takes advantage of the URL.createObjectURL function, separates the UUID off of the end to
//create a UUID

function uuid() {
    const url = URL.createObjectURL(new Blob())
    const [id] = url.toString().split('/').reverse()
    URL.revokeObjectURL(url)
    return id
  }


  //Johns version

  function generateUUID() {
  const chars = [ '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
  let output = Array(5) ;
  let genSub = function(n, is_spec) {
    let arr = Array(n) ;
    for (let i = 0; i < n; i++)
      arr[i] = chars[Math.floor(Math.random() * n)] ;
    if (is_spec)
      arr[0] = '4' ;
    return arr.join("");
  };
  return [genSub(8), genSub(4), genSub(4, true), genSub(4), genSub(12)].join('-') ;
}