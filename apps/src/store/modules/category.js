import ApiService from '@/services/ApiService'

export const namespaced = true
export const state = {
  category: [],
  activity: [],
  board: [],
  theme: [],
  status: [],
  rootTheme: [],
  logoimg: null,
  faviconimg: null,
  logoUpdate: '',
  faviconUpdate: '',
  userTeam: [],
  userTeamAvatar: [],
  allUserAvatar: [],
  listBoard: [],
  listAllBoard: [],
  loadingActivity: false,
  isLoadingCreateBoard: false,
  isLoadingUpdateBoard: false,
  isLoadingDeleteBoard: false,
  isLoadingChangeRole: false,
  isLoadingUpdateAppearance: false,
}
export const mutations = {
  SET_GENERNAL(state, data) {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];
        state[key] = value;
      }
    }
  },
  SET_USER_TEAM(state, userTeam) {
    state.userTeam = userTeam
  },
  SET_USER_TEAM_AVATAR(state, userTeamAvatar) {
    state.userTeamAvatar = userTeamAvatar
  },
}
export const actions = {
  createCategory({commit}, requestParams) {
    const thisComp = requestParams.component;
    delete requestParams.component;
    commit("SET_GENERNAL", {isLoadingCreateBoard: true});
    return ApiService.addCategory(requestParams).then(response => {
      commit("SET_GENERNAL", {isLoadingCreateBoard: false});
      thisComp.$router.push({ path: `/board/${response.data}` });
    })
    .catch(error => {
      console.log('There was an error:', error);
      commit("SET_GENERNAL", {isLoadingCreateBoard: false});
    })
  },
  deleteTerm({commit},requestParams){
    const thisComp = requestParams.component;
    delete requestParams.component;
    commit("SET_GENERNAL", {isLoadingDeleteBoard: true});
    ApiService.deleteTerm(requestParams)
    .then(() => {
      commit("SET_GENERNAL", {
        isLoadingDeleteBoard: false
      });
      thisComp.$message.success('This board has been delete');
      thisComp.$router.push({ path: `/new-board` });
    })
    .catch(error => {
      commit("SET_GENERNAL", {isLoadingDeleteBoard: false});
      console.log('There was an error:', error.response)
    })     
  },
  fetchActivity({ commit },id){
    commit("SET_GENERNAL", {loadingActivity: true});
    ApiService.getActivity(id)
    .then(response => {
      commit("SET_GENERNAL", {
        activity: response.data,
        loadingActivity: false
      });
    })
    .catch(error => {
      console.log('There was an error:', error.response)
      commit("SET_GENERNAL", {loadingActivity: false});
    })     
  },
  updateBoardInfo({ commit,state },requestParams){
    const thisComp = requestParams.component;
    delete requestParams.component;
    commit("SET_GENERNAL", {isLoadingUpdateBoard: true});
    ApiService.updateBoardInfo(requestParams)
    .then(response => {
      if (response.status == 200 && response.data) {
        commit("SET_GENERNAL", {
          board: response.data.board,
          isLoadingUpdateBoard: false
        });
      }
      thisComp.$message.success('Changes saved');
    })
    .catch(error => {
      commit("SET_GENERNAL", {isLoadingUpdateBoard: false});
      console.log('There was an error:', error.response)
    })     
  },
  updateStatusColor({state, commit},values){
    let requestParams = {
      status: state.status,
      values: values
    };
    return ApiService.updateStatusColor(requestParams)
    .then(response => {
      commit("SET_GENERNAL", {status: response.data});
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })
  },
  inviteTeam({commit},requestParams){
    const thisComp = requestParams.component;
    delete requestParams.component;
    return ApiService.inviteTeam(requestParams)
      .then(response => {
        if (response.status == 200 && response.data) {
          commit("SET_GENERNAL", {
            userTeam: response.data.userInBoard
          });
          if(response.data.message == 'Invite user success') {
            thisComp.$message.success(response.data.message);
          } else {
            thisComp.$message.error(response.data.message);
          }
        }
        thisComp.loading = false;
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchUserTeam({ commit },id){
    ApiService.getUserTeam(id)
    .then(response => {
      commit('SET_USER_TEAM', response.data)
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })     
  },
  fetchUserTeamAvatar({ commit },id){
    ApiService.getUserAvatarTeam(id)
    .then(response => {
      commit('SET_USER_TEAM_AVATAR', response.data)
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })     
  },
  changeRole({ commit },requestParams){
    const thisComp = requestParams.component;
    delete requestParams.component;
    commit("SET_GENERNAL", {isLoadingChangeRole: true});
    ApiService.changeRole(requestParams)
    .then(response => {
      if (response.status == 200 && response.data) {
        commit("SET_GENERNAL", {
          userTeam: response.data.userInBoard,
          isLoadingChangeRole: false
        });
      }
    })
    .catch(error => {
      console.log('There was an error:', error.response)
      commit("SET_GENERNAL", {isLoadingChangeRole: false});
    })     
  },
  updateAppearance({commit},requestParams) {
    const thisComp = requestParams.component;
    delete requestParams.component;
    commit("SET_GENERNAL", {isLoadingUpdateAppearance: true});
    return ApiService.updateAppearance(requestParams)
    .then(response => {  
      commit("SET_GENERNAL", {
        theme: response.data.theme,
        rootTheme: response.data.theme,
        logoimg: response.data.logo_favicon.logo,
        faviconimg: response.data.logo_favicon.favicon,
        isLoadingUpdateAppearance: false,
      });
      thisComp.$message.success('Changes saved');
      thisComp.showFavicon();
    })
    .catch(error => {
      console.log('There was an error:', error.response);
      commit("SET_GENERNAL", {isLoadingUpdateAppearance: false});
    })
  }
}
