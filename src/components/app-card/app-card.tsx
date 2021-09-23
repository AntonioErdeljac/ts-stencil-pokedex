import { Component, h, Host, Prop } from '@stencil/core';

import { CDN, CDN_EXTENSION, paths } from '../../constants';

@Component({
  tag: 'app-card',
  styleUrl: 'app-card.css',
  shadow: true,
})
export class AppCard {
  @Prop() name: string;
  @Prop() id: string;
  @Prop() plain: boolean;

  
  render() {
    const imageUrl: string = CDN + this.id + CDN_EXTENSION;
    const profileUrl: string = `${paths.profile}/${this.id}`;

    const content = (
      <div class="app-card">
        <img src={imageUrl} />
        <h3>{this.name}</h3>
      </div>
    )

    if (this.plain) {
      return (
        <Host>
          {content}
        </Host>
      )
    }

    return (
      <Host>
        <stencil-route-link url={profileUrl}>
          {content}
        </stencil-route-link>
      </Host>
    );
  }

}
