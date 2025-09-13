import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../services/firebase';
import type { TFirebaseQuestion, TQuestion } from '../types/Question';
import { useAuth } from './useAuth';

export function useRoom(roomId?: string, roomCode?: string) {
  const { user, signInWithGoogle } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  // Listen for questions and room title
  useEffect(() => {
    if (!roomId) return;

    const roomRef = database.ref(`rooms/${roomId}`);

    const handleValue = (snapshot: any) => {
      const databaseRoom = snapshot.val();
      if (!databaseRoom) return;

      const firebaseQuestions: TFirebaseQuestion = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered,
        likeCount: Object.values(value.likes ?? {}).length,
        likeId: Object.entries(value.likes ?? {}).find(([_key, like]) => like.authorId === user?.id)?.[0]
      }));

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    };

    roomRef.on('value', handleValue);

    return () => {
      roomRef.off('value', handleValue);
    };
  }, [roomId, user?.id]);

  // Create a new room
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (!newRoom.trim()) return;

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    navigate(`/rooms/${firebaseRoom.key}`);
  }

  // Go to the room creation page (sign in if needed)
  async function handleCreateRoomPage() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/rooms/new');
  }

  // Join an existing room
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (!roomCode?.trim()) return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed');
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return {
    questions,
    title,
    roomId,
    handleCreateRoom,
    handleCreateRoomPage,
    setNewRoom,
    handleJoinRoom,
    newRoom,
    roomCode
  };
}
