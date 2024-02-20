import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const MailBox = () =>{
  const [mails,setMails] = useState([])
  const [message,setMessage] = useState({})
  const [showMessage,setShowMessage] = useState(false)

  const URL = 'http://localhost:3007'
  let read = false;
  const token = JSON.parse(localStorage.getItem('token'))

  const handleMessage = async (e,mail) =>{
        e.preventDefault();
      setShowMessage(true)
      setMessage(mail)
      try{
        console.log('mailId',mail._id) // 
        let response = await fetch(`${URL}/mail/${mail._id}/markAsRead`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
       })
        if(response.ok)
        fetchMail();
      }catch(err){
        console.log(err)
      }
  }

  const fetchMail = async () =>{
    try{
      let response = await fetch(`${URL}/mail/inbox`,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
      })
         let {data} = await response.json()
         console.log('data',data)
        if(data.length){
          setMails(data)
        }
       
     }catch(err){
       alert('something wrong')
     }
  }
  useEffect( ()=>{
      fetchMail();
  },[])
    return(
        <>
        <div className="flex  flex-col h-screen ">
            <div className="">
             <h4 className=" p-5 font-bold text-4xl bg-gradient-to-r from-blue-300 to-blue-500 text-white"> Mail </h4>
              </div>
              <div className="ml-56">
        <div className="">
           { !showMessage && mails.map((mail) =>{
            return( 
               <div className="flex  items-center  border-b-2 m-1 p-1 border-gray-200 hover:border-2 hover:border-b-gray-300" key={mail._id} onClick={(e)=>handleMessage(e,mail)}>
                <span className={`w-2 h-2 rounded-full ${mail.read ? `bg-blue-400` : `bg-gray-200` } `}></span>
               <div className=" ml-2 font-medium">{mail.recipient.split('@')[0]}</div>
               <div className=" ml-16 font-medium">{mail.subject}</div>
               <div className="ml-8">{mail.text}</div>
               </div>
            )
           })}

           { showMessage && <div className="flex border-blue-500 border-2  h-96 m-4">
               <div className="m-4">
                <span className=" font-medium">{message.recipient.split('@')[0]}</span>
                <span className="ml-2 text-gray-400">{`< ${message.recipient} >`}</span>
                <div> To: {message.recipient.split('@')[0]}</div>
                <div className="mt-4">{message.text}</div>
               </div>
            </div>}
        </div>
      </div>
              
            <div className="absolute   mt-20 left-0 w-52 h-screen border-r border-gray-300 bg-gray-300 ">
                <div className="flex justify-center">
             <div className=" flex  justify-center bg-blue-500 my-3 p-1 mt-6 rounded-sm w-40 text-white"><NavLink to='/mail-editor'><button>Compose</button></NavLink></div>
            </div>
              <div className="flex  justify-around hover:bg-blue-300" onClick={() => setShowMessage(false)}>
                <div>Inbox</div>
                <div>{99}+</div>
              </div>
            </div>
   
        </div>
        </>
    )
}

export default MailBox;