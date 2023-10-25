import { Component } from 'react';
import Card from 'src/components/card/Card';
import styles from 'src/components/Results/Results.module.scss';
import LoadingSpinner from 'src/components/loadingSpinner/LoadingSpinner';

interface ResultsProps {
  searchTerm: string | null;
}

class Results extends Component<ResultsProps> {
  state: {
    results: {
      name: string;
      tagline: string;
      id: number;
      image_url: string;
    }[];
    isLoading: boolean;
  } = {
    results: [],
    isLoading: false,
  };

  async fetchResults(searchTerm: string) {
    let api = 'https://api.punkapi.com/v2/beers/?page=1&per_page=9';
    if (searchTerm) {
      api += `&beer_name=${searchTerm}`;
    }

    const response = await fetch(api);
    const data = await response.json();
    this.setState({ results: data, isLoading: false });
  }

  componentDidUpdate(prevProps: ResultsProps) {
    if (
      this.props.searchTerm !== prevProps.searchTerm &&
      typeof this.props.searchTerm === 'string'
    ) {
      this.setState({ isLoading: true });
      this.fetchResults(this.props.searchTerm);
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
