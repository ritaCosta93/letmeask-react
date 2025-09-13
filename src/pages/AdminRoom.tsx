import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { useParams } from 'react-router-dom';

import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';
import { useQuestion } from '../hooks/useQuestion';
import { useRoom } from '../hooks/useRoom';

export function AdminRoom() {
  const { id: roomId } = useParams<{ id: string }>();
  const { handleEndRoom, handleDeleteQuestion, handleCheckQuestionAsAnswered, handleHighlightQuestion } = useQuestion(roomId!);
  const { questions, title } = useRoom(roomId!);

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='letmeask' />
          <div>
            <RoomCode code={roomId!} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
                likeCount={0}
                likeId={undefined}
                id={''}
              >
                {!question.isAnswered && (
                  <>
                    <button type='button' onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                      <img src={checkImg} alt='Marcar pergunta como respondida' />
                    </button>

                    <button type='button' onClick={() => handleHighlightQuestion(question.id)}>
                      <img src={answerImg} alt='Dar destaque à pergunta' />
                    </button>
                  </>
                )}

                <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt='Remover pergunta' />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
