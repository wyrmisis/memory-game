import { FunctionalComponent, h } from 'preact';

import CardType from '../../types/card';

import style from './style.css';

interface CardProps {
  card: CardType;
  isHidden: boolean;
  isFlipped: boolean;
  canFlip: boolean;
  onFlip: (cardToFlip: CardType) => void;
}

const Card: FunctionalComponent<CardProps> = ({
  card,
  isHidden,
  isFlipped,
  canFlip,
  onFlip
}) => {
  return (
    <div class={style.cardWrapper}>
      <div
        class={`${style.card} ${isFlipped ? style.isFlipped: ''} ${isHidden ? style.isHidden: ''}`}
        onClick={(): void | boolean => canFlip && onFlip(card)}>
        <div class={style.front}>
          <img src={card.face} alt={card.name} />
          <div class={style.cardName}>
            <span>{card.name}</span>
          </div>
        </div>
        <div class={style.back}>
          <img src="/assets/chest.png" alt="Open the chest!" />
        </div>
      </div>
    </div>
  )
}

export default Card;
