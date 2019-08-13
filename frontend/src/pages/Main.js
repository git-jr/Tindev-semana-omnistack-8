import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo_teste.svg'
import like from '../assets/like.svg'
import deslike from '../assets/deslike.svg'
import itsamatch from '../assets/itsamatch.png'

export default function Main({ match }) {
    const [users, setUsers] = useState([]); // Variavel e função que irá controlar seu estado respectivamente
    const [macthDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            });
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });

        socket.on('macth', dev => { // Ouvindo do backend o evento de recebimento de "macth"
            setMatchDev(dev);
        })

    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDeslike(id) {
        await api.post(`/devs/${id}/deslikes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id))
    }


    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt={"Logo"} />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {
                        users.map(user => (
                            <li key={user._id}>
                                <img src={user.avatar} alt={user.name} />
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p>{user.bio}</p>
                                </footer>
                                <div className="buttons">
                                    <button type="button" onClick={() => handleLike(user._id)}>
                                        <img src={like} alt="like" />
                                    </button>
                                    <button type="button" onClick={() => handleDeslike(user._id)}>
                                        <img src={deslike} alt="deslike" />
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>
            ) : (
                    <div className="empty">Acabou:(</div>
                )}

            {macthDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a macth" />
                   
                    <img className="avatar" alt= 'avatar' src={macthDev.avatar}/>
                    <strong>{macthDev.name}</strong>
                    <p>{macthDev.bio}</p>

                    <button onClick={()=> setMatchDev(null)} type="button">FECHAR</button>
                </div>
            )}
        </div>
    )
}