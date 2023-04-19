import Vue from 'vue'
import Vuex from 'vuex'

import * as category from '@/store/modules/category.js'
import * as post  from '@/store/modules/post.js'
import * as comment  from '@/store/modules/comment.js'
import * as user  from '@/store/modules/user.js'
import * as board  from '@/store/modules/board.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      category,
      post,
      comment,
      user,
      board
    },
})