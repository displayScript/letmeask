
import { useHistory } from 'react-router-dom'

import { auth, firebase } from '../services/firebase'

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import '../styles/auth.scss';



export function Home() {

    const history = useHistory();

    function handlerCreateRoom() {
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).then(result => {
            console.log(result);
        })

        history.push('/rooms/new');
    }


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

                    <form action="">

                        <input
                            type="text"
                            placeholder="Digite o codigo da sala"
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