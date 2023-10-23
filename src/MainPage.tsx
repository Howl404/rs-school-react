import React, { Component } from 'react';
import Search from './components/Search';

class MainPage extends Component {
  state = {
    searchTerm: '',
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
      </>
    );
  }
}

export default MainPage;
