import { Component, h, Host, State } from '@stencil/core';

import { API, getPokemonID } from '../../services';
import { paths, PokemonType, NetworkStatus } from '../../constants';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})

export class AppHome {
  @State() results: PokemonType[] = [];
  @State() count: number = 0;
  @State() next: string;
  @State() previous: string;
  @State() networkStatus: NetworkStatus;

  async handleFetchData(path) {
    try {
      this.networkStatus = NetworkStatus.LOADING;

      const { data } = await API.get(path);

      this.results = [...this.results, ...data.results];
      this.count = data.count;
      this.next = data.next;
      
      this.networkStatus = NetworkStatus.SUCCESS;
    } catch (error) {
      this.networkStatus = NetworkStatus.FAILURE;
    }
  } 

  componentWillLoad() {
    this.handleFetchData(paths.pokemon);
  }

  async onLoadMore() {
    this.handleFetchData(this.next);
  }

  render() {
    if (this.networkStatus === NetworkStatus.FAILURE) {
      return (
        <Host>
          <div class="app-home">
            <h3>Error!</h3>
            <button onClick={this.handleFetchData.bind(this)}>Try again</button>
          </div>
        </Host>
      )
    }

    return (
      <Host>
        <div class="app-home">
          {this.results.map((item) => <app-card id={getPokemonID(item.url)} name={item.name}></app-card>)}
        </div>
        <div class="app-footer">
          <button disabled={this.networkStatus === NetworkStatus.LOADING} onClick={this.onLoadMore.bind(this)}>Load more</button>
        </div>
      </Host>
    );
  }
}
