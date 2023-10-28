import { Component } from 'react';
import styles from 'components/cardList/CardList.module.scss';
import Card from 'components/card/Card';

interface CardListProps {
  results: {
    name: string;
    tagline: string;
    id: number;
    image_url: string;
  }[];
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
