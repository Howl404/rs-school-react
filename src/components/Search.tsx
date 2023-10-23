import React, { Component } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

class Search extends Component<SearchProps> {
  state = {
    inputText: this.props.searchTerm,
  };

  componentDidMount(): void {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      this.setState({ inputText: searchTerm });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: event.target.value });
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.state.inputText.trim();
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    this.props.onSearch(trimmedSearchTerm);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
