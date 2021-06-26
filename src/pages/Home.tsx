import { useHistory } from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {

    /*CONSTANTES*/
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [rooomCode, setRoomCode] = useState('');




    /*FUNÇÕES */

    async function handlerCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (rooomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${rooomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists. ')
            return;
        }

        history.push(`/rooms/${rooomCode}`);


    }



    /*RETORNO*/
    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">

                    <img src={logoImg} alt="letmeask" />

                    <button onClick={handlerCreateRoom} className="create-room">
                        <img src={googleIcon} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">Ou entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>

                        <input
                            type="text"
                            placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={rooomCode}
                        />

                        <Button type="submit">
                            Entrar na sala
                        </Button>

                    </form>
                </div>
            </main>
        </div>
    )
}