import { ReactComponent as Logo } from './logo.svg'

function LoginPage() {
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
                <button type="button">
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
