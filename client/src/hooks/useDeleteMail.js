import { useEffect, useState } from "react"


const useDeleteMail = () =>{

    const [deleteResponse,setDeleteResponse] = useState({status:false,error:''})

    const deleteMail = async (URL,token,mailId) => {
    try{
  let response = await fetch(`${URL}/mail/${mailId}/deleteMail`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
  }
  })
  if(response.ok){
      setDeleteResponse({status:true,error:''})
  }
}catch(err){
    alert('some thing wrong with delete')
}
}

return [deleteResponse,deleteMail]
}

export default useDeleteMail;