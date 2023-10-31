import { Component } from 'react';

import Search from 'components/search/Search';
import Results from 'components/results/Results';

import styles from 'src/pages/MainPage.module.scss';

class MainPage extends Component {
  state: {
    searchTerm: string | null;
    error: boolean;
  } = {
    searchTerm: null,
    error: false,
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    if (this.state.error) {
      throw new Error('This is a test error');
    }
    return (
      <>
        <button
          className={styles.button}
          onClick={() => {
            this.setState({ error: true });
          }}
        >
          Throw Error
        </button>
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
