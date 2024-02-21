import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const MailBox = () =>{
  const [mails,setMails] = useState([])
  const [sents,setSents] = useState([])
  const [message,setMessage] = useState({})
  const [sentMessage,setSentMesssage] = useState({})
  const [showMessage,setShowMessage] = useState(false)
  const [showSent,setShowSent] = useState(false)
  const [unreadMessage ,setUnreadMessage] = useState(0)
  const [showSentMessage,setShowSentMessage] = useState(false)

  const URL = 'http://localhost:3007'
 
  const token = JSON.parse(localStorage.getItem('token'))

  const handleInbox = (e) =>{
     e.preventDefault();
     setShowMessage(false);
     setShowSent(false);
     setShowSentMessage(false)
  }

  const handleMessage = async (e,mail) =>{
        e.preventDefault();
      setShowMessage(true)
      setShowSentMessage(false)
      setShowSent(false)
      setMessage(mail)
      try{
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

  const handleSentMessage = (e,mail) =>{
     e.preventDefault();
     setShowSentMessage(true)
     setShowSent(false)
     setShowMessage(false)
     setSentMesssage(mail)
    
  }
  const deleteMail = async (e,mailId)=>{
    e.preventDefault();
      try{
        let response = await fetch(`${URL}/mail/${mailId}/deleteMail`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
        })
        console.log('del res',response)
        if(response.ok)
        fetchMail()
      }catch(err){
        alert('something wrong with delete')
      }
  }

  const handleSent = async (e) =>{
     e.preventDefault();
     setShowSent(!showSent)
     try{
       let response = await fetch(`${URL}/mail/sentbox`,{ 
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
       })
       console.log('sent res',response)
       if(response.ok)
       {
        let {data} =  await response.json()
        console.log('data',data)
        setSents(data)
       }
     }catch(err){
      alert('something wrong with sent')
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
          let count = 0;
          for(let obj of data){
            if(!obj.read)
            count++
          }
          if(count > 99)
          setUnreadMessage(99 +'+')
        else
        setUnreadMessage(count)
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

           { (!showMessage && !showSent && !showSentMessage) && mails.map((mail) =>{
            return( 
               <div className=" border-b-2 m-1 p-1 border-gray-200 hover:border-2 " key={mail._id} >
         <NavLink>
            <div className="flex items-center hover:border-b-gray-300" onClick={(e)=>handleMessage(e,mail)}>
                <span className={`w-2 h-2 rounded-full ${mail.read ? `bg-blue-400` : `bg-gray-200` } `}></span>
               <div className=" ml-2 font-medium">{mail.sender.split('@')[0]}</div>
               <div className=" ml-16 font-medium">{mail.subject}</div>
               <div className="ml-8">{mail.text}</div>
            </div>
         </NavLink>
               <div className="flex justify-end">
               <div className=" mr-24 w-4  h-4 "><button onClick={(e) => deleteMail(e,mail._id)}><img src={'https://cdn-icons-png.flaticon.com/128/2907/2907762.png'} alt='delete' /></button></div>
              </div>
               </div>
            )
           })}

         { (!showMessage && showSent) && sents.map((mail) =>{
            return( 
               <div className=" border-b-2 m-1 p-1 border-gray-200 hover:border-2 " key={mail._id} >
         <NavLink>
            <div className="flex items-center hover:border-b-gray-300" onClick={(e)=>handleSentMessage(e,mail)}>
               <div className=" ml-2 font-medium">{mail.recipient.split('@')[0]}</div>
               <div className=" ml-16 font-medium">{mail.subject}</div>
               <div className="ml-8">{mail.text}</div>
            </div>
         </NavLink>
               <div className="flex items-center justify-end ">
               <div className="mr-24 w-4  h-4 "><button onClick={(e) => deleteMail(e,mail._id)}><img src={'https://cdn-icons-png.flaticon.com/128/2907/2907762.png'} alt='delete' /></button></div>
              </div>
               </div>
            )
           })}

           { (showMessage && !showSent) && <div className="flex border-blue-500 border-2  h-96 m-4">
               <div className="m-4">
                <span className=" font-medium">{message.sender.split('@')[0]}</span>
                <span className="ml-2 text-gray-400">{`< ${message.sender} >`}</span>
                <div> To: {message.recipient.split('@')[0]}</div>
                <div className="mt-4">{message.text}</div>
               </div>
            </div>}

            { (!showMessage && !showSent && showSentMessage) && <div className="flex border-blue-500 border-2  h-96 m-4">
               <div className="m-4">
                <span className=" font-medium">{sentMessage.sender.split('@')[0]}</span> 
                <span className="ml-2 text-gray-400">{`< ${sentMessage.sender} >`}</span>
                <div> To: {sentMessage.recipient.split('@')[0]}</div>
                <div className="mt-4">{sentMessage.text}</div>
               </div>
            </div>}

        </div>
      </div>
              
            <div className="absolute   mt-20 left-0 w-52 h-screen border-r border-gray-300 bg-gray-300 ">
                <div className="flex justify-center">
             <div className=" flex  justify-center bg-blue-500 my-3 p-1 mt-6 rounded-sm w-40 text-white"><NavLink to='/mail-editor'><button>Compose</button></NavLink></div>
            </div>
              <div className="flex  justify-around hover:bg-blue-300" onClick={handleInbox}>
                <div>Inbox</div>
                <div>{unreadMessage}</div>
              </div>
              <div className="mt-4 flex   justify-around hover:bg-blue-300" onClick={(e) => handleSent(e)}>
                <div>Sent</div>
                <div></div>
              </div>
            </div>
   
        </div>
        </>
    )
}

export default MailBox;