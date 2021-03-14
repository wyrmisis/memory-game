import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useCallback, useMemo } from 'preact/hooks';
import { shuffle } from 'seed-shuffle';
import { Howl } from 'howler';
import { Link, route } from 'preact-router';

import generateSeed from '../../utils/generateSeed';

import Card from '../../components/card';
import cardData from '../../data/cards';

import CardType from '../../types/card';

import style from './style.css';

interface HomeProps {
  seed?: number;
}

const defaultSeed = generateSeed();

const Home: FunctionalComponent<HomeProps> = ({ seed }) => {
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [matchedCards, setMatchedCards] = useState<CardType[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [isVictorious, setIsVictorious] = useState<boolean>(false);

  const selectSound = useMemo(() => new Howl({
    src: ['/assets/sounds/open.wav'],
    volume: .5
  }), []);
  const errorSound = useMemo(() => new Howl({
    src: ['/assets/sounds/error.wav'],
    volume: .5
  }), []);
  const matchSound = useMemo(() => new Howl({
    src: ['/assets/sounds/fanfare.wav'],
    volume: .5
  }), []);
  const victorySound = useMemo(() => new Howl({
    src: ['/assets/sounds/complete.mp3'],
    volume: .5
  }), []);

  const cards: CardType[] = [
    ...cardData,
    ...cardData
  ].map(({name, face}, index) => ({
    name,
    face,
    id: index
  }));

  const seedToUse: number = seed || defaultSeed;

  const canFlip = (cardToCheck: CardType): boolean =>
    selectedCards.every(card => card.id !== cardToCheck.id) &&
    selectedCards.length < 2

  const isFlipped = (cardToCheck: CardType): boolean =>
    matchedCards.some(card => card.id === cardToCheck.id) ||
    selectedCards.some(card => card.id === cardToCheck.id)

  const isHidden = (cardToCheck: CardType): boolean =>
    matchedCards.some(card => card.id === cardToCheck.id);

  const updateMatches = useCallback((newMatches: CardType[]): void => {
    setMatchedCards(!newMatches
      ? [] 
      : [...matchedCards, ...newMatches]
    );
  }, [matchedCards]);

  useEffect((): void => {
    if (matchedCards.length === cards.length) {
      setIsVictorious(true);
      victorySound.play();
    }
  }, [matchedCards, cards, victorySound]);

  useEffect((): void => {
    if (selectedCards.length >= 2) {
      // Why use a timeout when checking for matching cards?
      // 2/3 of a second is long enough to show a result in 
      // case of failure, but short enough to not block the
      // user from adding new inputs in case of a match.
      // This is based on 1/3 of a second spent flipping the card,
      // 1/3 of a second showing the card, and 1/3 of a second
      // un-flipping the card.
      setTimeout(() => {
        if (selectedCards[0].name === selectedCards[1].name) {
          updateMatches(selectedCards);
          matchSound.play();
        } else {
          errorSound.play();
        }

        setAttempts(attempts + 1);
        setSelectedCards([]);
      }, 666);
    }
  }, [
    selectedCards,
    updateMatches,
    errorSound,
    matchSound,
    attempts
  ]);

  const onFlip = (cardToFlip: CardType): void => {
    const targetCard = cards.find(card => card.id === cardToFlip.id);

    if (targetCard && canFlip(cardToFlip)) {
      setSelectedCards([
        ...selectedCards,
        targetCard
      ]);
      selectSound.play();
    } else {
      errorSound.play();
    }
  }

  const onReset = (): void => {
    setSelectedCards([]);
    setMatchedCards([]);
    setAttempts(0);
    setIsVictorious(false);

    setTimeout(() => {
      route(`/${generateSeed()}`, true);
    }, 333);
  }

  const cardsToDisplay: CardType = shuffle<CardType>(cards, seedToUse)
    .map((card: CardType) => 
      (<Card
        card={card}
        isHidden={isHidden(card)}
        isFlipped={isFlipped(card)}
        canFlip={canFlip(card)}
        onFlip={onFlip}
        key={card.id} />)
    );

  return (
    <div class={style.home}>
      <div class={style.playSpace}>
        <div class={`${style.cards} ${isVictorious ? style.hidden : ''}`}>
          {cardsToDisplay}
        </div>
        <div class={`${style.victory} ${isVictorious ? '' : style.hidden}`}>
          <h1>Congratulations!</h1>
          <p>Thus armed, you are prepared to journey forth and... Eh? You want to play again?</p>
          <button onClick={onReset}>One more time!</button>
        </div>
      </div>
      <div class={style.gameInfo}>
        <p>Open chests by clicking on them. If you open matching chests, you claim the item inside. Once all items have been claimed, you win!</p>
      </div>
      <div class={style.seedInfo}>
        <p>Attempts: {attempts}</p>
        <p>Matches: {matchedCards.length / 2}</p>
        <p>Seed: <Link href={`/${seedToUse}`}>{seedToUse}</Link></p>
      </div>
    </div>
  );
};

export default Home;
