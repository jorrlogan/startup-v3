import React from 'react'

import { Unauthenticated } from './unathenticated'
import { Authenticated } from './authenticated';
import { AuthState } from './authState'

export function Login({ userName, authState, onAuthChange }) {
    return (
        <main className=''>
            <div className='text-black'>
                {/* {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>} */}
                {authState === AuthState.Authenticated && (
                    <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                        }}
                    />
                )}
            </div>
        </main>
    );
}