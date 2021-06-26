/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import '../styles/auth.scss';
import { TestContext } from '../App';

export function NewRoom() {

    // const { value, setvalue } = useContext(TestContext)

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


                    <h2>Criar uma nova sala</h2>

                    <form>

                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />

                        <Button type="submit">
                            Criar sala
                        </Button>

                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/"> Clique aqui </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}