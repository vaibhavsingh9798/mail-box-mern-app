
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {logout} from "../../features/authentication/authSlice"
const HomeNavbar = () =>{

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const isLogin = useSelector((state) => state.auth.isAuthenticated)

   const handleClick = (e) =>{
    e.preventDefault();
     if(isLogin){
        dispatch(logout())
        navigate('/login')
     }else{
        navigate('/login')
     }
   }

    return(
        <div class="bg-gradient-to-r from-red-500 to-yellow-700 p-4"> 
    <div class="container mx-auto flex justify-between items-center">
        <div>
    {isLogin &&   <NavLink to='/'>Home</NavLink> }
        </div>
        <div>
    {isLogin &&   <NavLink to='/mail-box'>MailBox</NavLink> }
        </div>

        <div class="mr-9">
        <button onClick={handleClick}>{isLogin ?'Logout' : 'Login'}</button>
        </div>
    </div>

        </div>
    )
}

export default HomeNavbar;