export function initialize(appInstance) {
  let screen = appInstance.lookup('service:screen');
  screen.stubMediaFeatures({ width: 900 });
}

export default {
  name: 'stub-media',
  initialize,
};
