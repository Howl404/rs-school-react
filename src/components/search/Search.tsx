import React, { Component } from 'react';
import styles from 'components/Search/Search.module.scss';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string | null;
}

class Search extends Component<SearchProps> {
  state: { inputText: string | null } = {
    inputText: null,
  };

  componentDidMount(): void {
    const searchTerm = localStorage.getItem('howl-searchTerm');
    if (searchTerm) {
      this.setState({ inputText: searchTerm });
      this.props.onSearch(searchTerm);
    } else {
      this.setState({ inputText: '' });
      this.props.onSearch('');
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: event.target.value });
  };

  handleSearch = () => {
    if (typeof this.state.inputText === 'string') {
      const trimmedSearchTerm = this.state.inputText.trim();
      localStorage.setItem('howl-searchTerm', trimmedSearchTerm);
      this.props.onSearch(trimmedSearchTerm);
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <input
          type="text"
          value={this.state.inputText || ''}
          onChange={this.handleInputChange}
          className={styles.input}
        />
        <button onClick={this.handleSearch} className={styles.button}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
