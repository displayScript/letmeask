import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question/Index';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';


/** TYPES*/

// type FireBaseQuestions = Record<string, {
//     author: {
//         name: string;
//         avatar: string;
//     }
//     content: string;
//     isAnswered: boolean;
//     isHighlighted: boolean;
// }>


// type QuestionType = {
//     id: string;
//     author: {
//         name: string;
//         avatar: string;
//     }
//     content: string;
//     isAnswered: boolean;
//     isHighlighted: boolean;
// }

type RoomParams = {
    id: string;
}

export function Room() {

    /*CONSTANTES*/

    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    // const [questions, setQuestions] = useState<QuestionType[]>([])
    // const [title, setTitle] = useState('');

    const roomId = params.id;
    const { title, questions } = useRoom(roomId)



    // useEffect(() => {
    //     console.log(roomId);

    //     const roomRef = database.ref(`rooms/${roomId}`);

    //     roomRef.on('value', room => {

    //         const databaseRoom = room.val();
    //         const firebaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};

    //         const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
    //             return {
    //                 id: key,
    //                 content: value.content,
    //                 author: value.author,
    //                 isHighlighted: value.isHighlighted,
    //                 isAnswered: value.isAnswered,
    //             }
    //         })

    //         setTitle(databaseRoom.title)
    //         setQuestions(parsedQuestions)

    //     })



    // }, [roomId])



    /** FUNÇÕES*/

    async function handleSemdQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be loggedin');
        }

        const question = {

            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },

            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);
        setNewQuestion('');

    }

    /*RETORNO*/

    return (
        <div id="page-room">

            <header>
                <div className="content">

                    <img src={logoImg} alt="Letmeask" />

                    <RoomCode code={roomId} />
                </div>

            </header>

            <main>

                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span> {questions.length} Pergunta(s)</span>}

                </div>

                <form onSubmit={handleSemdQuestion}>

                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => { setNewQuestion(event.target.value) }}
                        value={newQuestion}
                    />

                    <div className="form-footer">

                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>

                            </div>
                        ) :
                            (

                                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                            )
                        }


                        <Button type="submit" disabled={!user} >Enviar pergunta </Button>
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
                                />
                            );
                        })
                    }
                </div>

            </main>
        </div>
    );
}