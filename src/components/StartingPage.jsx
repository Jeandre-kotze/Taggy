import { useState } from 'react'
import HomePage from './HomePage'
import Auth from './Auth'
import Cookies from 'universal-cookie'
import Wrapper from './Wrapper'

const cookies = new Cookies()

const StartingPage = () => {

    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    console.log(isAuth)

   return <Wrapper setIsAuth={setIsAuth}>
    { isAuth ? <HomePage /> : <Auth setIsAuth={setIsAuth}/>}
   </Wrapper>
}

export default StartingPage