import Ember from 'ember';
import Component from '@glimmer/component';
const { inject } = Ember;

export default class EsDisplay extends Component {
  screen = inject.service();
}
