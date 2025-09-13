import cx from 'classnames';
import '../styles/question.scss';
import type { TQuestion } from '../types/Question';

export function Question({ content, author, isAnswered = false, isHighlighted = false, children }: TQuestion) {
  return (
    <div className={cx('question', { answered: isAnswered }, { highlighted: isHighlighted && !isAnswered })}>
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
