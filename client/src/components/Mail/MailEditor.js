import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from 'react-router-dom';

const MailEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [error,setError] = useState('')

  const URL = 'http://localhost:3007'
  const token = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate();
  const handleSend = async (e) => {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    let bodyInfo = JSON.stringify({recipient,subject,text:content.blocks[0].text,read:false})
    if(recipient){
        try{
          let response = await fetch(`${URL}/mail/send`,{
            method:'POST',
            body: bodyInfo,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
          })
           if(response.ok)
           navigate('/mail-box')
        }catch(err){
           alert('something wrong with editor')
        }
    }
    setEditorState(EditorState.createEmpty());
    setSubject('');
    setRecipient('');
    setAttachment(null);
  };

  const handleAttachFile = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  return (
    <div>
        <div className='flex justify-between  bg-blue-100 p-2 mt-4'>
            <div className='ml-2'>New Message</div>
            <div className='mr-2'>X</div>
        </div>
        <div className='flex justify-between mt-3  pb-3 border-b border-gray-300'>
            <div className='ml-2'> 
      <label>To:</label>
      <input type="text" className='ml-3 md:w-64 lg:w-96' value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </div>
        <div className='mr-2'>
            <button>Cc</button> / <button>Bcc</button>
        </div>
      </div>
      <div className='mt-3  pb-3 border-b border-gray-300 ml-2'>
      <label>Subject:</label>
      <input type="text" className='ml-3 md:w-64 lg:w-96'  value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div className='mt-3 h-screen'>
      <Editor 
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
          image: {
            uploadEnabled: true,
            previewImage: true,
          },
        }}
      />
      <br />
      <div className='flex'>
      <button className=' bg-blue-500 rounded-md m-2 p-2' onClick={handleSend}>Send</button>

      <label>
  <input type="file" className="hidden"  onChange={handleAttachFile}/>
  <img src={'https://cdn-icons-png.flaticon.com/128/3917/3917428.png'} alt="logo" className='m-2 p-2 w-15 h-10' />
</label>

   
      
      </div>
      </div>
    </div>
  );
};

export default MailEditor;
