<template>
  <div>
    <AList :data-source="data">
      <AListItem
        slot="renderItem"
        slot-scope="item"
      >
        <AListItemMeta>
          <div slot="title">
            {{ item.title }}
          </div>
        </AListItemMeta>
        <ASwitch
          :checked="checkSwitch(item.name) == true"
          @change="onChange(item.name)"
        />
      </AListItem>
    </AList>
    <div class="Rectangle-182" />
    <div class="unsub-all">
      <AButton
        class="button-unsub"
        :loading="loading"
        type="link"
        @click="onUnsubscribed"
      >
        <AIcon
          v-if="text == 'Unsubscribed'"
          type="check"
        />{{ text }}
      </AButton>
    </div>
    <div class="wrap-button">
      <AButton
        class="general-button"
        @click="cancelNotification"
      >
        Cancel
      </AButton>
      <AButton
        type="primary"
        class="general-button save-notification"
        :loading="loading1"
        @click="saveNotification"
      >
        Save
      </AButton>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data (){
        return {
            text: 'Unsubscribe from all posts',
            loading1: false,
            loading: false,
            rootNotification: [],
            data: [
                {
                    name: 'sendEmail',
                    title: 'Email me when someone cites me with an @mention',
                },
                {
                    name: 'OwnPost',
                    title: 'Auto-subscribe to own posts and get notified when someone responds',
                },
                {
                    name: 'Comment',
                    title: 'Auto-subscribe to posts that you comment on',
                },
            ],
        };
    },
    computed: {
        ...mapState([ 'user' ]),
    },
    mounted (){
        const obj = {
            sendEmail : this.user.user.notification[0]['sendEmail'],
            OwnPost : this.user.user.notification[0]['OwnPost'],
            Comment : this.user.user.notification[0]['Comment'],
        };
        this.rootNotification = obj;
    },
    methods: {
        onUnsubscribed (){
            this.loading = true;
            this.$store.dispatch('post/unsubscribedAllPost',this.user.user.ID);
            setTimeout(() => {
                this.loading = false;
                this.text = 'Unsubscribed';
            }, 1000);
        },
        checkSwitch (name){
            return this.rootNotification[name];
        },
        onChange (name) {
            this.rootNotification[name] = !this.rootNotification[name];
        },
        saveNotification (){
            this.loading1 = true;
            setTimeout(() => {
                this.$store.dispatch('user/updateNotification',this.rootNotification);
                this.loading1 = false;
                this.$message.success('Change account notification success');
            }, 1000);
        },
        cancelNotification (){
            let obj = {
                sendEmail : this.user.user.notification[0]['sendEmail'],
                OwnPost : this.user.user.notification[0]['OwnPost'],
                Comment : this.user.user.notification[0]['Comment'],
            };
            this.rootNotification = obj;
        }
    },   
};
</script>

<style scoped lang="scss">
.big-ninja-feedbo {
  .notification-text{
      display: inline-block;
  }
  .button-unsub{
    padding: 0px !important;
  }
  .unsub-all{
    padding: 9px 0;
  }
  .Rectangle-182 {
    width: 100%;
    height: 1px;
    border-radius: 5px;
    background-color: #e8e8e8;
  }
  .wrap-button{
    padding-top: 30px;
    text-align: end;
  }
  .save-notification{
    margin-left: 10px;
  }
}
</style>