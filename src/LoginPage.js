import { useNavigate } from 'react-router'

import { ReactComponent as Logo } from './logo.svg'

function LoginPage() {
    const navigate = useNavigate()

    const logIn = () => {
        navigate('/landing')
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                />
                <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                />
                <button type="button" onClick={logIn}>
                    <span> Log In</span>
                </button>
            </form>
            <div>
                <Logo />
                <span>ThinkTalk</span>
            </div>
        </div>
    )
}

export default LoginPage
