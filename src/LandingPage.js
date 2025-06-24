import { useNavigate } from 'react-router'

import { ReactComponent as Logo } from './logo.svg'

function LandingPage() {
    const navigate = useNavigate()

    const logIn = () => {
        navigate('/login')
    }

    return (
        <div>
            <div>
                <Logo />
                <span>ThinkTalk</span>
                <button type="button" onClick={logIn}>
                    <span>Log Out</span>
                </button>
            </div>
            <div>
                <span>
                    A social media platform where you think before you talk.
                </span>
            </div>
        </div>
    )
}

export default LandingPage
