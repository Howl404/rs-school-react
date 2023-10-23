import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';

class MainPage extends Component {
  state: { searchTerm: string | null } = {
    searchTerm: null,
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    return (
      <>
        <Search
          onSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <Results searchTerm={this.state.searchTerm} />
      </>
    );
  }
}

export default MainPage;
