import React, { Component } from 'react';
import Card from 'src/components/card/Card';
import styles from 'src/components/Results/Results.module.scss';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

interface ResultsProps {
  searchTerm: string | null;
}

class Results extends Component<ResultsProps> {
  state: {
    results: {
      name: string;
      description: string;
      id: number;
      image_url: string;
    }[];
    isLoading: boolean;
  } = {
    results: [],
    isLoading: false,
  };

  async fetchResults(searchTerm: string) {
    this.setState({ isLoading: true });
    let api = 'https://api.punkapi.com/v2/beers/?page=1&per_page=9';
    if (searchTerm) {
      api += `&beer_name=${searchTerm}`;
    }

    try {
      const response = await fetch(api);
      const data = await response.json();
      this.setState({ results: data });
      this.setState({ isLoading: false });
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  }

  componentDidUpdate(prevProps: ResultsProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      if (typeof this.props.searchTerm === 'string') {
        this.fetchResults(this.props.searchTerm);
      }
    }
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.container}>
            {this.state.results.map((result) => (
              <Card result={result} key={result.id} />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default Results;
