import { Component } from 'react';

import { Result } from 'components/results/Results';
import Card from 'components/card/Card';

import styles from 'components/cardList/CardList.module.scss';

interface CardListProps {
  results: Result[];
}

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className={styles.container}>
        {this.props.results.map((result) => (
          <Card result={result} key={result.id} />
        ))}
      </div>
    );
  }
}

export default CardList;
