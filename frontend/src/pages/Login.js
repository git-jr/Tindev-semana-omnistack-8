import React, { useState } from 'react'
import './Login.css'

import api from '../services/api'

import logo from '../assets/logo_teste.svg'


export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault() // Impede que o form redirecione após o submit

        const response = await api.post('/devs', {
            username,
        });

        const { _id } = response.data.userExists === undefined ? response.data : response.data.userExists;
        // Tive que fazer uma verificação extra nessa linha, não sei ao certo o motivo de não funcionar igual ao original

        history.push(`/dev/${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="DevMatch" />
                <input
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
