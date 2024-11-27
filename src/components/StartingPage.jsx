import HomePage from './HomePage'
import Auth from './Auth'
import Wrapper from './Wrapper'
import { useSelector } from "react-redux"


const StartingPage = () => {

    const isAuth = useSelector(state => state.auth.loggedIn);
    console.log(isAuth);

   return <Wrapper title="Taggi" position="fixed">
    { isAuth ? <HomePage /> : <Auth />}
   </Wrapper>
}

export default StartingPage