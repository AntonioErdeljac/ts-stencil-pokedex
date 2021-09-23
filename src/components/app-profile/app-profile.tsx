import { Component, Prop, h, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';

import { NetworkStatus, paths } from '../../constants';
import { API } from '../../services';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {
  @Prop() match: MatchResults;

  @State() result: Record<string, any>;
  @State() networkStatus: NetworkStatus;

  async handleFetchData(path) {
    try {
      this.networkStatus = NetworkStatus.LOADING;

      const { data } = await API.get(path);

      this.result = data;
      
      this.networkStatus = NetworkStatus.SUCCESS;
    } catch (error) {
      this.networkStatus = NetworkStatus.FAILURE;
    }
  } 

  componentWillLoad() {
    this.handleFetchData(paths.pokemon + '/' + this.match.params.id);
  }

  render() {
    if (this.networkStatus === NetworkStatus.FAILURE) {
      return (
        <div class="app-profile">
          <p>Error!</p>
          <button onClick={this.handleFetchData.bind(this)}>Try again</button>
        </div>
      )
    }

    if (this.networkStatus === NetworkStatus.LOADING) {
      return (
        <div class="app-profile">
          <p>Loading...</p>
        </div>
      )
    }

    if (this.networkStatus === NetworkStatus.SUCCESS) {
      return (
        <div class="app-profile">
          <app-card plain id={this.match.params.id} name={this.result.name}></app-card>
        </div>
      );
    }
  }
}
