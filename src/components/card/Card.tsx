import { Component } from 'react';
import styles from 'components/card/Card.module.scss';
import { Result } from '../results/Results';

interface CardProps {
  result: Result;
}

class Card extends Component<CardProps> {
  render() {
    const { id, tagline, name, image_url } = this.props.result;

    return (
      <div key={id} className={styles.card}>
        <h3 className={styles.card_header}>{name}</h3>
        <img
          src={image_url}
          alt={`${name} image`}
          className={styles.card_image}
        />
        <p className={styles.card_description}>{tagline}</p>
      </div>
    );
  }
}

export default Card;
