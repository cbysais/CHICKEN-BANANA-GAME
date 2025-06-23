import React, { useState } from 'react'

function LoginPage() {
    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <br />
            <input type="password" placeholder="Password" />
            <br />
            <button>Login</button>
        </div>
    )
}

export default LoginPage
