import { useState } from 'react'
import { useNavigate } from 'react-router'

import { ReactComponent as Logo } from './logo.svg'

function LoginPage() {
    const navigate = useNavigate()

    const logIn = () => {
        navigate('/')
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <form>
                <input
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
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
