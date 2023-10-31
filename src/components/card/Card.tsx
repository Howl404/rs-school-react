import { Component } from 'react';

import { Result } from 'components/results/Results';

import styles from 'components/card/Card.module.scss';

interface CardProps {
  result: Result;
}

class Card extends Component<CardProps> {
  render() {
    const { tagline, name, image_url } = this.props.result;

    return (
      <div className={styles.card}>
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
