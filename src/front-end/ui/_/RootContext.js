import React, {PropTypes} from 'react'
import i18next from 'i18next'

import englishTranslation from '../locales/en.json'

export default React.createClass({
  childContextTypes: {
    lang: PropTypes.string,
    resizer: PropTypes.object,
    loadSvgMedia: PropTypes.func,
    t_: PropTypes.func,
  },

  getChildContext () {
    const i18n = i18next.init({
      lng: this.props.lang || 'en',
      initImmediate: false,
      resources: {
        en: englishTranslation,
      }
    })

    return {
      lang: this.props.lang,
      resizer: this.props.resizer,
      loadSvgMedia: this.props.loadSvgMedia,
      t_: i18n.t.bind(i18n),
    }
  },

  render () {
    return React.Children.only(this.props.children);
  },
})
