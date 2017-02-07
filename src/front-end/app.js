import balalaika from 'balalaika'

import {client as Home} from './ui/templates/Home'

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  Home();
})
