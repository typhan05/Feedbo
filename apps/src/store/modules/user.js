import ApiService from '@/services/ApiService';

export const namespaced = true;
export const state = {
    user: [],
    currentUser: null,
    userAvatar: '',
    userAvatarUpload: '',
    currentLevel: 4,
    userNotification: [],
    notification: [],
    userAnonymous: false,
    voteAnonymous: [],
    downVoteAnonymous: [],
    likeAnonymous: [],
    vote_ids: '',
    down_vote_ids: '',
};
export const mutations = {
    SET_USER (state, user) {
        if (user.length == 0)
        {state.userAnonymous = true;}
        else
        {state.user = user;}
    },
    SET_CURRENT_USER (state, currentUser) {
        state.currentUser = currentUser;
    },
    SET_CURRENT_LEVEL (state, currentLevel) {
        state.currentLevel = currentLevel;
    },
    SET_USER_AVATAR (state, userAvatar) {
        state.userAvatar = userAvatar;
    },
    SET_USER_AVATAR_UPLOAD (state, userAvatarUpload) {
        state.userAvatarUpload = userAvatarUpload;
    },
    SET_USER_NOTIFICATION (state, userNotification) {
        state.userNotification = userNotification;
    },
    SET_NOTIFICATION (state, notification) {
        state.notification = notification;
    },
    SET_VOTEIDS(state,vote_ids) {
        state.vote_ids = vote_ids
    },
    SET_DOWN_VOTEIDS(state,down_vote_ids) {
        state.down_vote_ids = down_vote_ids
    },
    SET_VOTE_ANONYMOUS (state, voteAnonymous) {
        var voteIndex = state.voteAnonymous.indexOf(voteAnonymous);
        var downVoteIndex = state.downVoteAnonymous.indexOf(voteAnonymous);
        if (voteIndex < 0) {
            state.voteAnonymous.push(voteAnonymous);
            if(downVoteIndex > -1) {
                state.downVoteAnonymous.splice(downVoteIndex,1);
            }
        }
        else
        {state.voteAnonymous.splice(voteIndex,1);}
    },
    SET_DOWNVOTE_ANONYMOUS (state, downVoteAnonymous) {
        var downVoteIndex = state.downVoteAnonymous.indexOf(downVoteAnonymous);
        var voteIndex = state.voteAnonymous.indexOf(downVoteAnonymous);
        if (downVoteIndex < 0) {
            state.downVoteAnonymous.push(downVoteAnonymous);
            if(voteIndex > -1) {
                state.voteAnonymous.splice(voteIndex,1);
            }
        }
        else
        {state.downVoteAnonymous.splice(downVoteIndex,1);}
    },
    SET_USERLIKE_ANONYMOUS (state, likeAnonymous) {
        if (state.likeAnonymous.length == 0)
        {
            state.likeAnonymous.push(likeAnonymous);
        }
        else {
            var index = state.likeAnonymous.indexOf(likeAnonymous);
            if (index < 0)
            {
                state.likeAnonymous.push(likeAnonymous);
            }
            else
            {state.likeAnonymous.splice(index,1);}
        }
    },
    SET_CURRENT_BOARD_URL (state, url) {
        state.user.list_board.forEach((board, index) => {
            if(board.board_URL === url.oldUrl) {
                state.user.list_board[index].board_URL = url.newUrl;
            }
        });
    },
};
export const actions = {
    fetchUser ({ commit }){
        ApiService.getCurrentUser()
            .then(response => {
                if (response.status == 200 && response.data) {
                    commit('SET_USER', response.data.user);
                }
            })
            .catch(error => {
                console.log('There was an error:', error.response);
            });     
    },
    fetchCurrentUser ({ commit }){
        ApiService.getCurrentUserAvatar()
            .then(response => {
                commit('SET_CURRENT_USER', response.data);
            })
            .catch(error => {
                console.log('There was an error:', error.response);
            });     
    },
    createUser ({ commit }, requestParams){
        const thisComp = requestParams.component;
        delete requestParams.component;
        if (!requestParams || !requestParams.hasOwnProperty('user_login')) {
            thisComp.$message.error('User Login is not empty.');
            return false;
        }
        ApiService.createUser(requestParams)
            .then(response => {
                if (response.data == 'User already exists.')
                {thisComp.$message.error(response.data);}
                else
                {thisComp.$message.success('Add user success');}
          
            })
            .catch(error => {
                thisComp.$message.error('Create fail');
                console.log('There was an error:', error.response);
            });     
    },
    fetchNotificationSetting ({ commit }){
        ApiService.getUserNotification()
            .then(response => {
                commit('SET_USER_NOTIFICATION', response.data);
            })
            .catch(error => {
                console.log('There was an error:', error.response);
            });
    },
    updateNotification ({ commit },requestParams){
        ApiService.updateUserNotification(requestParams)
            .catch(error => {
                console.log('There was an error:', error.response);
            });
    },
    fetchNotification ({ commit }){
        ApiService.getNotification()
            .then(response => {
                commit('SET_NOTIFICATION', response.data);
            })
            .catch(error => {
                console.log('There was an error:', error.response);
            });
    },
    updateUserAccount ({ commit },requestParams){
        ApiService.updateUserAccount(requestParams)
            .catch(error => {
                console.log('There was an error:', error.response);
            });
    },
};
