import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const MailBox = () =>{
  const [mails,setMails] = useState([])

  let maildata = [ {
    recipient: "vaibhav2@gmail.com",
    sender: "vaibhav1@gmail.com",
    subject: "test1 ",
    text: "schedule test 1",
    _id:  "65d43787fec3bdce7b403552"
  }
]
  const URL = 'http://localhost:3007'
  const token = JSON.parse(localStorage.getItem('token'))
  const fetchMail = async () =>{
    try{
      let response = await fetch(`${URL}/mail/inbox`,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
      })
         let {data} = await response.json()
         console.log('recived',data)
         maildata = data;
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
           {mails.map((mail) =>{
            return( 
               <div className="flex  border-b-2 m-1 p-1 border-gray-200 hover:border-2 hover:border-b-gray-300" key={mail._id}>
               <div className=" ml-2 font-medium">{mail.recipient.split('@')[0]}</div>
               <div className=" ml-16 font-medium">{mail.subject}</div>
               <div className="ml-8">{mail.text}</div>
               </div>
            )
           })}
        </div>
      </div>
              
            <div className="absolute   mt-20 left-0 w-52 h-screen border-r border-gray-300 bg-gray-300 ">
                <div className="flex justify-center">
             <div className=" flex  justify-center bg-blue-500 my-3 p-1 mt-6 rounded-sm w-40 text-white"><NavLink to='/mail-editor'><button>Compose</button></NavLink></div>
            </div>
              <div className="flex  justify-around hover:bg-blue-300">
                <div><button>Inbox</button></div>
                <div>{99}+</div>
              </div>
            </div>
   
        </div>
        </>
    )
}

export default MailBox;