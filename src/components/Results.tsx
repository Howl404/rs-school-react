import React, { Component } from 'react';

interface ResultsProps {
  searchTerm: string | null;
}

class Results extends Component<ResultsProps> {
  state: {
    results: {
      name: string;
      description: string;
      id: number;
    }[];
  } = {
    results: [],
  };

  async fetchResults(searchTerm: string) {
    let api = 'https://api.punkapi.com/v2/beers/?page=1&per_page=10';
    if (searchTerm) {
      api += `&beer_name=${searchTerm}`;
    }

    try {
      const response = await fetch(api);
      const data = await response.json();
      this.setState({ results: data });
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
      <div>
        {this.state.results.map((result) => {
          return (
            <div key={result.id}>
              {result.name} , {result.description}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Results;
