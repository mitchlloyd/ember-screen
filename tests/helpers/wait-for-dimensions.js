import { settled } from '@ember/test-helpers';
import { later } from '@ember/runloop';

export default async function(_window, dimensions) {
  let { height: expectedHeight, width: expectedWidth } = dimensions;
  let tries = 0;

  let poll = function() {
    let doc = $(_window.document);
    let height = doc.find('#height').text().trim();
    let width = doc.find('#width').text().trim();

    if (width === expectedWidth && height === expectedHeight) {
      return ({ width, height });
    }

    if (tries > 100) {
      throw new Error(`Dimensions never became ${expectedWidth}x${expectedHeight}. They were ${width}x${height}`);
    } else {
      tries = tries + 1;
      later(poll, 10);
    }
  };

  poll();

 await settled();
}
