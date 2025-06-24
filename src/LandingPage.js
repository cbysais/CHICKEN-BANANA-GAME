import { useNavigate } from 'react-router'

import { ReactComponent as Logo } from './logo.svg'

function LandingPage() {
    const navigate = useNavigate()

    const logIn = () => {
        navigate('/login')
    }

    return (
        <div className="flex h-screen w-screen flex-col">
            <div className="flex h-fit w-full items-center justify-between bg-gradient-to-tr from-blue-400 to-blue-500 px-4 py-4">
                <Logo className="h-12 w-12 fill-blue-50" />
                <span className="select-none text-5xl font-black text-blue-50">
                    ThinkTalk
                </span>
                <button
                    className="group rounded-2xl bg-blue-50 px-6 py-2"
                    type="button"
                    onClick={logIn}
                >
                    <span className="text-2xl font-bold text-blue-500 group-hover:underline">
                        LOG IN
                    </span>
                </button>
            </div>
            <div className="flex h-full w-full bg-gradient-to-tr from-white to-blue-50 px-8 py-8">
                <span className="bg-gradient-to-tr from-blue-300 to-blue-500 bg-clip-text text-9xl font-bold text-transparent">
                    A social media platform where you{' '}
                    <span className="text-blue-500">THINK</span> before you{' '}
                    <span className="text-blue-500">TALK</span>.
                </span>
            </div>
        </div>
    )
}

export default LandingPage
