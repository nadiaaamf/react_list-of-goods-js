import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleAlphabeticalSort = () => {
    const sorted = [...goodsFromServer].sort((good1, good2) =>
      // eslint-disable-next-line prettier/prettier
      good1.localeCompare(good2));

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setSortType('alpha');
  };

  const handleLengthSort = () => {
    const sorted = [...goodsFromServer].sort(
      (good1, good2) => good1.length - good2.length,
    );

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setSortType('length');
  };

  const handleReverse = () => {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType('');
    setIsReversed(false);
  };

  const isModified =
    sortType !== '' ||
    isReversed ||
    JSON.stringify(goods) !== JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'alpha' ? 'is-light' : ''}`}
          onClick={handleAlphabeticalSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 'length' ? 'is-light' : ''}`}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
