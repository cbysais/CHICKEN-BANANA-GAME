import { useState } from 'react'

import { ReactComponent as Logo } from './logo.svg'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-8 bg-gradient-to-bl from-white to-blue-50 px-16 md:flex-row-reverse md:gap-x-16">
            <div className="flex flex-col items-center">
                <Logo className="h-32 w-32 fill-blue-500" />
                <span className="select-none text-2xl font-black text-blue-500">
                    ThinkTalk
                </span>
            </div>
            <form className="flex h-fit w-96 flex-col gap-y-4 rounded-2xl bg-white px-4 py-4 shadow-md">
                <input
                    className="w-full rounded-2xl border border-blue-300 bg-white px-2 py-2"
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <input
                    className="w-full rounded-2xl border border-blue-300 bg-white px-2 py-2"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button
                    className="w-full rounded-2xl bg-blue-500 px-2 py-2 hover:bg-blue-600"
                    type="button"
                >
                    <span className="text-2xl font-bold text-blue-50">
                        LOG IN
                    </span>
                </button>
            </form>
        </div>
    )
}

export default LoginPage
