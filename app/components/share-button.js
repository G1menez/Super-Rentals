// Fazendo o botão de compartilhar funcionar
import { service } from '@ember/service';
import Component from '@glimmer/component';
//url do X
const TWEET_INTENT = 'https://twitter.com/intent/tweet';

export default class ShareButton extends Component {
  @service router;
// consegue a url e escreve o tweet pra compartilhar a propriedade no X
  get currentURL() {
    return new URL(this.router.currentURL, window.location.origin);
  }

  get shareURL() {
    let url = new URL(TWEET_INTENT);

    url.searchParams.set('url', this.currentURL);

    if (this.args.text) {
      url.searchParams.set('text', this.args.text);
    }

    if (this.args.hashtags) {
      url.searchParams.set('hashtags', this.args.hashtags);
    }

    if (this.args.via) {
      url.searchParams.set('via', this.args.via);
    }

    return url;
  }
}