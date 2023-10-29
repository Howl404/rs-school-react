import { Component } from 'react';
import LoadingSpinner from 'components/loadingSpinner/LoadingSpinner';
import CardList from 'components/cardList/CardList';

interface ResultsProps {
  searchTerm: string | null;
}

export type Result = {
  name: string;
  tagline: string;
  id: number;
  image_url: string;
};

class Results extends Component<ResultsProps> {
  state: {
    results: Result[];
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
          <CardList results={this.state.results} />
        )}
      </>
    );
  }
}

export default Results;
