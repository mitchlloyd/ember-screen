import { settled } from '@ember/test-helpers';
import { later } from '@ember/runloop';

export default async function(_window, expectedWidth) {
  let tries = 0;

  let poll = function() {
    let doc = _window.document;
    const width = Number(doc.getElementById('width')?.textContent.trim());

    if (width === expectedWidth) {
      return width;
    }

    if (tries > 100) {
      throw new Error(`Width never became ${expectedWidth}. It was ${width}`);
    } else {
      tries = tries + 1;
      later(poll, 10);
    }
  };

  poll();

  return settled();
}
