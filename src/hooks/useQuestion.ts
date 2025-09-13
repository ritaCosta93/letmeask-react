import { type FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import type { TUser } from '../types/User';

export function useQuestion(user?: TUser | null, roomId?: string)
 {
  
  const [newQuestion, setNewQuestion] = useState('');

  // Send a new question
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (!newQuestion.trim() || !user) return;

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }

  
  // Delete a question
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  // Mark a question as answered
  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ isAnswered: true });
  }

  // Highlight a question
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ isHighlighted: true });
  }

  // Like / unlike a question
  async function handleLikeQuestion(questionId: string, likeId?: string) {
    if (!user) return;

    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user.id
      });
    }
  }

  return {
    newQuestion,
    setNewQuestion,
    handleSendQuestion,
    handleDeleteQuestion,
    handleCheckQuestionAsAnswered,
    handleHighlightQuestion,
    handleLikeQuestion,
    roomId,
    user
  };
}
