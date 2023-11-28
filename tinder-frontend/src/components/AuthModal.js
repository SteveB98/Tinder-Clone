import { useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
const AuthModal = ({setShowModal,  isSignUp, onClose, showModal}) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie,removeCookie] = useCookies(['user'])
    //Variable for navigation to different pages
    let navigate = useNavigate()

    console.log(email, password,confirmPassword)
    const handleClick = () => {
        setShowModal(false)
        onClose();
    }

    if (!showModal) return null;
    
    //We don't want to refresh page on submit, prevents refresh action
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }
            //Sending email and password to backend to a specific endpoint given status of isSignUp boolean
            const response = await axios.post(`http://localhost:8001/${isSignUp ? 'signup' : 'login'}`,{email,password})
            //Setting saved cookies
            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)
            //Sending client to subsequent page depending on isSignUp boolean
            const success = response.status === 201
            if (success && isSignUp) navigate('/onboarding')
            if (success && !isSignUp) navigate('/dashboard')
            window.location.reload()
        }
        catch (error){
            console.log(error)
        }
    }

    return(
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT': 'LOG IN'}</h2>
            <p>By clicking login, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
           <form onSubmit={handleSubmit}>
                    <input
                        type= "email"
                        id = "email"
                        name="email"
                        placeholder="email"
                        required={true}
                        onChange={(e) =>setEmail(e.target.value)}
                    />
                    <input
                        type= "password"
                        id = "password"
                        name="password"
                        placeholder="password"
                        required={true}
                        onChange={(e) =>setPassword(e.target.value)}
                    />
                    {isSignUp && <input
                        type= "password"
                        id = "password-check"
                        name="password-check"
                        placeholder="confirm password"
                        required={true}
                        onChange={(e) =>setConfirmPassword(e.target.value)}
                    />}
                    <input class="loader" className ="secondary-button" type = "submit"/>
                  
                    <p>{error}</p>
           </form>
           <hr/>
           <h3>GET THE APP</h3>
        </div>
    )
}
export default AuthModal
