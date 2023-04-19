<template>
  <div>
    <div class="account-settings-image">
      <AUpload
        name="file"
        list-type="picture-card"
        class="account-avatar-uploader"
        :show-upload-list="false"
        :action="linkUpload"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img
          v-if="user.user.user_avatar"
          class="account-avatar"
          :src="avatar"
          alt="avatar"
        >
        <div v-else>
          <AIcon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
        <div class="icon-camera">
          <AIcon
            type="camera"
            :style="{ fontSize: '17px', paddingTop: '5px', color: '#1a2a37' }"
            theme="filled"
          />
        </div>
      </AUpload>
    </div>
    <AFormModel
      ref="accountForm"
      :model="form"
      :rules="rules"
      layout="vertical"
      class="form-account-info"
    >
      <AFormModelItem
        ref="name"
        prop="name"
        label="Username"
      >
        <AInput
          class="feedbo-input"
          v-model="form.name"
          @blur=" () => {
            $refs.name.onFieldBlur();
          }"
        />
      </AFormModelItem>
      <AFormModelItem
        ref="email"
        prop="email"
        label="Email Address"
      >
        <AInput
          class="feedbo-input"
          v-model="form.email"
          @blur=" () => {
            $refs.email.onFieldBlur(); 
          }"
        />
      </AFormModelItem>
      <AFormModelItem class="wrap-button">
        <AButton
          class="general-button feedbo-simple-button"
          @click="onCancel"
        >
          Cancel
        </AButton>
        <AButton
          class="general-button save-info"
          :loading="loading1"
          type="primary"
          @click="onSubmit"
        >
          Save
        </AButton>
      </AFormModelItem>
    </AFormModel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getBoardIdFromUrl } from "@/helper/helper.js";
export default {
    data () {
        return {
            loading: false,
            loading1: false,
            imageUrl: '',
            linkUpload: '',
            avatarFileList: [],
            form: {
                name: '',
                email: '',
            },
            rules: {
                name: [
                    { required: true, message: 'Please input Display name', trigger: 'blur' }
                ],
                email: [ { type: 'email',message: 'Please enter a valid email address', trigger: 'blur' } ]
            },
        };
    },
    methods: {
        handleChange (info) {
            this.loading = true;
            let fileList = [ ...info.fileList ];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = file.response.url;
                }
                return file;
            });
            this.avatarFileList = fileList;
            setTimeout(() => {
                this.$store.commit('user/SET_USER_AVATAR_UPLOAD', this.avatarFileList[0].url);
                this.loading = false;
            }, 2000);
        },
        onCancel (){
            this.form.name = this.user.user.display_name;
            this.form.email = this.user.user.user_email;
        },
        onSubmit () {
            this.$refs.accountForm.validate(valid => {
                if (valid) {
                    this.loading1 = true;
                    this.$store.dispatch('user/updateUserAccount', this.form);
                    setTimeout(() => {
                        if (this.$route.name == 'Board')
                        {   
                            const boardId = getBoardIdFromUrl();
                            this.$store.dispatch('category/fetchUserTeam',boardId);
                            this.$store.dispatch('category/fetchUserTeamAvatar',boardId);
                        }
                        this.$store.dispatch('user/fetchUser');
                        this.$store.dispatch('user/fetchCurrentUser');
                        this.$message.success('Change account info success');
                        this.loading1 = false;
                    }, 2000);
                } else {
                    this.$message.error('Error submit!!!');
                    return false;
                }
            });
      
      
        },
        checkAccountInfo (){
            if (this.form.name == this.user.user.display_name && this.form.email == this.user.user.user_email)
            {return true;}
            else
            {return false;}
        },
        beforeUpload (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
    },
    computed: {
        ...mapState([ 'category','user' ]),
        avatar (){
            if (this.user.userAvatarUpload == '')
            {return this.user.user.user_avatar;}
            else
            {return this.user.userAvatarUpload;}
        }
    },
    mounted (){
        this.linkUpload =  window.bigNinjaVoteWpdata.axiosUrl + '/v1/wp_upload_file';
        this.form.name = this.user.user.display_name;
        this.form.email = this.user.user.user_email;
    }
};
</script>
<style lang="scss">
.big-ninja-feedbo {
  .account-settings-image{
      margin: auto;
      width: 115px;
  }
  .account-avatar{
      display: block;
      height: 115px;
      width: 115px;
      border-radius: 50%;
      border: solid 3px #ffffff;
      margin-left: auto;
      margin-right: auto;
  }
  .icon-camera{
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: #e6e8eb;
    top: 36%;
    right: 40%;
    border-radius: 50%;
  }
  .general-button{
    width: 70px !important;
    height: 35px !important;
  }
  .wrap-button{
    text-align: end;
    padding-bottom: 0 !important;
  }
  .save-info{
    margin-left: 10px;
  }
  .account-avatar-uploader > .ant-upload {
      width: 115px !important;
      height: 115px !important;
      border: solid 3px #ffffff !important;
      border-radius: 50% !important;
  }
  .ant-upload.ant-upload-select-picture-card>.ant-upload {
      padding: 0px !important;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  
  @media only screen and (max-width:600px) {
    .icon-camera{
      right: 35%;
    }
  }
  .account-avatar-uploader>.ant-upload {
    width: 115px !important;
    height: 115px !important;
    border: 3px solid #fff !important;
    border-radius: 50% !important;
  }
}
</style>