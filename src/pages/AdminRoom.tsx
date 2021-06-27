import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';


import { Button } from '../components/Button';
import { Question } from '../components/Question/Index';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';


/** TYPES*/

type RoomParams = {
    id: string;
}

export function AdminRoom() {

    /*CONSTANTES*/

    // const { user } = useAuth();
    const params = useParams<RoomParams>();
    // const [questions, setQuestions] = useState<QuestionType[]>([])
    // const [title, setTitle] = useState('');

    const roomId = params.id;
    const { title, questions } = useRoom(roomId)
    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta ?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

        }
    }


    /** FUNÇÕES*/



    /*RETORNO*/

    return (
        <div id="page-room">

            <header>
                <div className="content">

                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar sala</Button>
                    </div>

                </div>

            </header>

            <main>

                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span> {questions.length} Pergunta(s)</span>}

                </div>

                <form>
                    <textarea
                        placeholder="O que você quer perguntar?"
                    // onChange={event => { setNewQuestion(event.target.value) }}
                    // value={newQuestion}
                    />

                    <div className="form-footer">

                        {/* {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>

                            </div>
                        ) :
                            (

                                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                            )
                        } */}


                        {/* <Button type="submit" disabled={!user} >Enviar pergunta </Button> */}
                    </div>

                </form>

                <div className="question-list">
                    {
                        questions.map(question => {
                            return (
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)
                                        }
                                    >
                                        <img src={deleteImg} alt="" />
                                    </button>
                                </Question>
                            );
                        })
                    }
                </div>

            </main>
        </div>
    );
}