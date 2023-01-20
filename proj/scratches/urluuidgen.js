//takes advantage of the URL.createObjectURL function, separates the UUID off of the end to
//create a UUID

function uuid() {
    const url = URL.createObjectURL(new Blob())
    const [id] = url.toString().split('/').reverse()
    URL.revokeObjectURL(url)
    return id
  }