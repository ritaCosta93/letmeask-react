import { useState } from 'react';

import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

import { useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import type { TRoom } from '../types/Room';

export function Home() {
  const { id: roomId } = useParams<TRoom>();

  const { handleCreateRoomPage, handleJoinRoom } = useRoom(roomId!);
  const [roomCode, setRoomCode] = useState('');

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt='Ilustração simbolizando perguntas e resposta' />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main className='main-content'>
        <div>
          <img src={logoImg} alt='Letmeask' />
        </div>
        <button className='create-room' onClick={handleCreateRoomPage}>
          <img src={googleIconImg} alt='Logo do Google' />
          Crie sua sala com o Google
        </button>
        <div className='separator'>ou entre em uma sala</div>
        <form onSubmit={handleJoinRoom}>
          <input type='text' placeholder='digite o código da sala' onChange={event => setRoomCode(event.target.value)} value={roomCode} />
          <Button type='submit'>Entrar na sala</Button>
        </form>
      </main>
    </div>
  );
}
