import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  screen: inject.service()
});
