import Vue from 'vue'

import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default ({ app }) => {
  app.vuetify = new Vuetify({})
}
