import { Link, useParams } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss';

import { useRoom } from '../hooks/useRoom';
import type { TRoom } from '../types/Room';

export function NewRoom() {
  const { id: roomId } = useParams<TRoom>();

  const { handleCreateRoom, setNewRoom, newRoom } = useRoom(roomId!);

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
        <h2>Criar uma nova sala</h2>
        <form onSubmit={handleCreateRoom}>
          <input type='text' placeholder='Nome da sala' onChange={event => setNewRoom(event.target.value)} value={newRoom} />
          <Button type='submit'>Criar sala</Button>
        </form>
        <p>
          Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link>
        </p>
      </main>
    </div>
  );
}
