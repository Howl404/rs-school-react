import { Component } from 'react';
import styles from 'components/cardList/CardList.module.scss';
import Card from 'components/card/Card';
import { Result } from '../results/Results';

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
