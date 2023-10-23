import React, { Component } from 'react';

class MainPage extends Component {
  state = {
    searchTerm: '',
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    return <></>;
  }
}

export default MainPage;
