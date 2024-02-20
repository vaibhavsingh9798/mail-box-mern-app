
import { NavLink, useNavigate } from "react-router-dom";

const HomeNavbar = () =>{

   const navigate = useNavigate()
   const isLogin = true

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
          <NavLink to='/login'><button>Login</button></NavLink>
        </div>
    </div>

        </div>
    )
}

export default HomeNavbar;