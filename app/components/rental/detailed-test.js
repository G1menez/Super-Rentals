//js da pagina detalhada sobre o lugar após o clique
import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rental/detailed', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.setProperties({
      //caracteristicas Mansão velha
      rental: {
        id: 'Mansão Velha',
        title: 'Mansão Velha',
        owner: 'Veruca Salt',
        city: 'San Francisco',
        location: {
          lat: 37.7749,
          lng: -122.4194,
        },
        category: 'Estate',
        type: 'Solitario',
        bedrooms: 15,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description:
          'Esta grande e antiga mansão fica em mais de 100 Hectares de colinas e densas florestas.',
      },
    });
  });
  //cria um header com a pagina compartilhar
  test(async function (assert) {
    await render(hbs`<Rental::Detailed @rental={{this.rental}} />`);

    assert.dom('.jumbo').exists();
    assert.dom('.jumbo h2').containsText('Mansão Velha');
    assert
      .dom('.jumbo p')
      .containsText('Um bom lugar para ficar perto de San Francisco');
    assert.dom('.jumbo a.button').containsText('Share on Twitter');
  });
//Gera informação detalhada sobre a propriedade
  test(async function (assert) {
    await render(hbs`<Rental::Detailed @rental={{this.rental}} />`);

    assert.dom('article').hasClass('rental');
    assert.dom('article h3').containsText('Sobre Mansão velha');
    assert.dom('article .detail.owner').containsText('Veruca Salt');
    assert.dom('article .detail.type').containsText('Solitario – Estate');
    assert.dom('article .detail.location').containsText('San Francisco');
    assert.dom('article .detail.bedrooms').containsText('15');
    assert.dom('article .image').exists();
    assert.dom('article .map').exists();
  });
});