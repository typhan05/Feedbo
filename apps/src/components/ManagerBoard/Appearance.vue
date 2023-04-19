<template>
  <PerfectScrollbar class="appearance-scrollbar">
    <div>
      <div v-show="customColor === false">
        <div class="manage-title">
          <h3 class="title-text">
            Appearance
          </h3>
        </div>
        <div class="upload-container">
          <div class="upload-item">
            <label class="label-text">
              <span>Logo</span>
            </label>
            <div class="upload-area">
              <AUpload
                accept="image/*"
                name="file"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="linkUpload"
                :before-upload="beforeUpload"
                :file-list="logoFileList"
                @change="handelLogoUpload"
              >
                <img
                  v-if="checkLogo != ''"
                  :src="checkLogo"
                  alt="avatar"
                  class="img-upload"
                >
                <div v-else>
                  <AIcon :type="logoLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Drop file or click here to upload image
                  </div>
                </div>
              </AUpload>
              <div
                v-show="checkLogo != ''"
                class="button-delete-image"
                style="color: rgba(0, 0, 0, 0.85);"
                @click="deleteLogo"
              >
                <span class="icon-delete">
                  <AIcon type="close" />
                </span>
              </div>
            </div>
          </div>
          <div class="upload-item">
            <label class="label-text">
              <span>Favicon</span>
            </label>
            <div class="upload-area">
              <AUpload
                accept="image/*"
                name="file"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="linkUpload"
                :before-upload="beforeUpload"
                :file-list="faviconFileList"
                @change="handelFaviconUpload"
              >
                <img
                  v-if="checkFavicon != ''"
                  :src="checkFavicon"
                  alt="avatar"
                  class="img-upload"
                >
                <div v-else>
                  <AIcon :type="faviconLoading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Drop file or click here to upload image
                  </div>
                </div>
              </AUpload>
              <div
                v-show="checkFavicon != ''"
                class="button-delete-image"
                style="color: rgba(0, 0, 0, 0.85);"
                @click="deleteFavicon"
              >
                <span class="icon-delete">
                  <AIcon type="close" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <label class="label-text theme">
          <span>Theme</span>
        </label>
        <div class="theme-container">
          <div
            class="theme-item"
            @click="openCustomColor(0)"
          >
            <div class="theme-item-wrap">
              <div
                color="#eee"
                class="theme-item-header theme-item-custom"
              />
              <div
                color="#fff"
                class="theme-item-content"
              >
                <AIcon
                  class="custom-icon"
                  type="setting"
                /> Custom
              </div>
            </div>
            <div
              v-show="current_theme=='mv_custom_theme'"
              class="current-theme"
            >
              <span><AIcon type="check" /></span>
            </div>
          </div>
          <div class="theme-item">
            <div
              class="theme-item-wrap"
              @click="changeTheme('mv_custom_theme_1')"
            >
              <div
                color="#c75875"
                class="theme-item-header item1"
              />
              <div
                color="#ffffff"
                class="theme-item-content"
              >
                <div
                  color="#c75875"
                  class="item1-icon"
                />
                <div
                  color="#251016"
                  class="black-icon"
                />
                <div
                  color="#494949"
                  class="grey-icon"
                />
              </div>
              <div
                v-show="current_theme=='mv_custom_theme_1'"
                class="custom-theme-default"
                @click="openCustomColor(1)"
              >
                <AIcon
                  class="custom-icon"
                  type="setting"
                />
              </div>
            </div>
            <div
              v-show="current_theme=='mv_custom_theme_1'"
              class="current-theme"
            >
              <span><AIcon type="check" /></span>
            </div>
          </div>
          <div class="theme-item">
            <div
              class="theme-item-wrap"
              @click="changeTheme('mv_custom_theme_2')"
            >
              <div
                color="#4078f2"
                class="theme-item-header item2"
              />
              <div
                color="#ffffff"
                class="theme-item-content"
              >
                <div
                  color="#4078f2"
                  class="item2-icon"
                />
                <div
                  color="#251016"
                  class="black-icon"
                />
                <div
                  color="#494949"
                  class="grey-icon"
                />
              </div>
              <div
                v-show="current_theme=='mv_custom_theme_2'"
                class="custom-theme-default"
                @click="openCustomColor(2)"
              >
                <AIcon
                  class="custom-icon"
                  type="setting"
                />
              </div>
            </div>
            <div
              v-show="current_theme=='mv_custom_theme_2'"
              class="current-theme"
            >
              <span><AIcon type="check" /></span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="customColor === true">
        <div class="manage-title" style="display: flex">
          <AButton
            class="button-back ant-btn-custom"
            @click="closeCustomColor"
          >
            <AIcon
              type="arrow-left"
              class="arrow-left-icon"
            />
          </AButton>
          <h3 class="title-text">
            Customize colors
          </h3>
        </div>
        <div class="custom-color-form">
          <div class="theme-item">
            <div>
              <div
                class="custom-color-form-header"
                :style="{ backgroundColor: category.theme.header}"
              >
                <CustomColor
                  v-model="category.theme.header"
                  class="custom-color-header-wrap"
                  title="Header"
                  :color="category.theme.header"
                  @changeCustomColor="changeCustomColor($event)"
                />
              </div>
              <div
                class="custom-color-form-content"
                :style="{ backgroundColor: category.theme.background}"
              >
                <div class="custom-color-form-left">
                  <CustomColor
                    v-model="category.theme.title"
                    title="Title"
                    :color="category.theme.title"
                    @changeCustomColor="changeCustomColor($event)"
                  />
                  <CustomColor
                    v-model="category.theme.text"
                    title="Text"
                    :color="category.theme.text"
                    @changeCustomColor="changeCustomColor($event)"
                  />
                  <CustomColor
                    v-model="category.theme.accent"
                    title="Accent"
                    :color="category.theme.accent"
                    @changeCustomColor="changeCustomColor($event)"
                  />
                  <CustomColor
                    v-model="category.theme.background"
                    title="Background"
                    :color="category.theme.background"
                    @changeCustomColor="changeCustomColor($event)"
                  />
                </div>
                <div class="custom-color-form-right">
                  <div
                    class="custom-color-form-right-title"
                    :style="{ color: category.theme.title}"
                  >
                    Color title demo
                  </div>
                  <div
                    class="custom-color-form-right-description"
                    :style="{ color: category.theme.text}"
                  >
                    Color text demo
                  </div>
                  <div
                    class="custom-color-form-right-button"
                    :style="{ backgroundColor: category.theme.accent, color: '#fff'}"
                  >
                    Vote Project
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AAffix
      v-show="checkColorValue == false"
      :style="{ position: 'absolute', right: '50px'}"
      :class="{ 'aafix-button-save-custom' : customColor == true ,'aafix-button-save' : customColor == false }"
    >
      <AButton class="template-button" @click="reset">
        Reset
      </AButton>
      <AButton
        type="primary"
        class="template-button"
        :loading="category.isLoadingUpdateAppearance"
        @click="submit"
      >
        Save changes
      </AButton>
    </AAffix>
  </PerfectScrollbar>
</template>
<script>
import { mapState } from 'vuex';
import { Chrome } from 'vue-color';
import CustomColor from '@/components/ManagerBoard/CustomColor.vue';
import { getBoardIdFromUrl } from "@/helper/helper.js";
function getBase64 (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default {
    components: {
        Chrome,
        CustomColor
    },
    data (){
        return {
            current_theme: '',
            logoLoading: false,
            faviconLoading: false,
            loading1: false,
            customColor: false,
            deleteimg: false,
            rootLogo: '',
            rootFavicon: '',
            rootDeleteImg: '',
            rootLogoUpdate: '',
            rootFaviconUpdate: '',
            logoFileList: [],
            faviconFileList: [],
            linkUpload: '',
        };
    },
    mounted (){
        this.linkUpload =  window.bigNinjaVoteWpdata.axiosUrl + '/v1/wp_upload_file';
        this.setCurrentTheme;
        this.setRoot;
    },
    methods: {
        handelLogoUpload (info){
            this.logoLoading = true;
            let fileList = [ ...info.fileList ];
            // 1. Limit the number of uploaded files
            //    Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-1);
            // 2. read from response and show file link
            fileList = fileList.map(file => {
                if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url;
                }
                return file;
            });
            this.logoFileList = fileList;
            setTimeout(() => {
                this.$store.commit('category/SET_GENERNAL', {logoUpdate : this.logoFileList[0].url});
                this.logoLoading = false;
            }, 2000);
        },
        handelFaviconUpload (info){
            this.faviconLoading = true;
            let fileList = [ ...info.fileList ];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = file.response.url;
                }
                return file;
            });
            this.faviconFileList = fileList;
            setTimeout(() => {
                this.$store.commit('category/SET_GENERNAL', {faviconUpdate : this.faviconFileList[0].url});
                this.faviconLoading = false;
            }, 2000);
        },
        changeTheme (key){
            if (key == 'mv_custom_theme_1')
            {
                var params = {
                    header : '#ff4d4f',
                    title : '#251016',
                    text : '#494949',
                    accent : '#ff4d4f',
                    background : '#f0f2f5'
                };
                this.$store.commit('category/SET_GENERNAL', {theme : params});
                var hoverColor = '#ff4d4f99';
                document.documentElement.style.setProperty('--main-color', '#ff4d4f');
                document.documentElement.style.setProperty('--hover-color', hoverColor );
                document.body.style.backgroundColor = params.background;
            }
            if (key == 'mv_custom_theme_2')
            {
                var params = {
                    header : '#1890ff',
                    title : '#251016',
                    text : '#494949',
                    accent : '#1890ff',
                    background : '#f0f2f5'
                };
                this.$store.commit('category/SET_GENERNAL', {theme : params});
                var hoverColor = '#1890ff99';
                document.documentElement.style.setProperty('--main-color', '#1890ff');
                document.documentElement.style.setProperty('--hover-color', hoverColor );
                document.body.style.backgroundColor = params.background;
            }
            this.current_theme = key;
        },
        submit (){
            const hoverColor = this.category.theme.accent + '99';
            document.documentElement.style.setProperty('--main-color', this.category.theme.accent);
            document.documentElement.style.setProperty('--hover-color', hoverColor );
            const id = getBoardIdFromUrl();
            let component =  this;
            const themeRequest = this.category.theme;
            const logo_img = this.category.logoUpdate != '' ? this.category.logoUpdate : this.category.logoimg;
            const favicon_img = this.category.faviconUpdate != '' ? this.category.faviconUpdate : this.category.faviconimg;
            const imageRequest = {
              delele_image: this.deleteimg,
              logo_img: logo_img,
              favicon_img: favicon_img,
            };
            this.$store.dispatch('category/updateAppearance',{id, themeRequest, imageRequest, component});
            this.setCurrentTheme;
        },
        reset (){
            this.$store.commit('category/SET_GENERNAL', {theme : this.category.rootTheme});
            const hoverColor = this.category.rootTheme.accent + '99';
            document.documentElement.style.setProperty('--main-color', this.category.rootTheme.accent);
            document.documentElement.style.setProperty('--hover-color', hoverColor );
            document.body.style.backgroundColor = this.category.rootTheme.background;
            if (this.category.theme.header == '#ff4d4f'  && this.category.theme.title == '#251016'  && this.category.theme.text == '#494949' && this.category.theme.accent == '#ff4d4f' && this.category.theme.background == '#f0f2f5')
            {this.current_theme = 'mv_custom_theme_1';}
            else if (this.category.theme.header == '#1890ff'  && this.category.theme.title == '#251016'  && this.category.theme.text == '#494949' && this.category.theme.accent == '#1890ff' && this.category.theme.background == '#f0f2f5')
            {this.current_theme = 'mv_custom_theme_2';}
            else {this.current_theme = 'mv_custom_theme';}
            this.category.logoimg = this.rootLogo;
            this.category.faviconimg = this.rootFavicon;
            this.category.logoUpdate = this.rootLogoUpdate;
            this.category.faviconUpdate = this.rootFaviconUpdate;
            this.deleteimg = this.rootDeleteImg;
        },
        changeCustomColor (requestParams){
            const params = {
                header: this.category.theme.header,
                title: this.category.theme.title,
                text: this.category.theme.text,
                accent: this.category.theme.accent,
                background: this.category.theme.background
            };
            if (requestParams.name == 'Header')
            {params.header = requestParams.color;}
            if (requestParams.name == 'Title')
            {params.title = requestParams.color;}
            if (requestParams.name == 'Text')
            {params.text = requestParams.color;}
            if (requestParams.name == 'Accent')
            {
                params.accent = requestParams.color;
                const hoverColor = requestParams.color + '99';
                document.documentElement.style.setProperty('--main-color',requestParams.color);
                document.documentElement.style.setProperty('--hover-color',hoverColor);
            }
            if (requestParams.name == 'Background')
            {
                params.background = requestParams.color;
                document.body.style.backgroundColor = requestParams.color;
            }
            this.$store.commit('category/SET_GENERNAL', {theme : params});
            
        },
        openCustomColor (value){
            if (value == 0)
            {
                const hoverColor = this.category.rootTheme.accent + '99';
                document.documentElement.style.setProperty('--main-color',this.category.rootTheme.accent);
                document.documentElement.style.setProperty('--hover-color',hoverColor);
                document.body.style.backgroundColor = this.category.rootTheme.background;
                this.$store.commit('category/SET_GENERNAL', {theme : this.category.rootTheme});
            }
            this.customColor = true;
        },
        closeCustomColor (){
            this.setCurrentTheme;
            this.customColor = false;
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
        deleteLogo (){
            if (this.category.logoUpdate != '')
            {this.$store.commit('category/SET_GENERNAL', {logoUpdate : ''});}
            else
            {
                this.$store.commit('category/SET_GENERNAL', {logoimg : ''})
                this.deleteimg = true;
            }
        },
        deleteFavicon (){
            if (this.category.faviconUpdate != '')
            {this.$store.commit('category/SET_GENERNAL', {faviconUpdate : ''});}
            else
            {
                this.$store.commit('category/SET_GENERNAL', {faviconimg : ''})
                this.deleteimg = true;
            }
        },
        showFavicon (){
            if (this.category.faviconimg != '' && this.category.faviconimg != null)
            {
                var link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = this.category.faviconimg;
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            else
            {
              var link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link');
              link.type = 'image/x-icon';
              link.rel = 'shortcut icon';
              link.href = window.bigNinjaVoteWpdata.pluginUrl + 'assets/img/feedbo-logo-square.png';
              document.getElementsByTagName('head')[0].appendChild(link);
            }
        },
    },
    computed: {
        ...mapState([ 'category' ]),
        setCurrentTheme (){
            if (this.category.theme.header == '#ff4d4f'  && this.category.theme.title == '#251016'  && this.category.theme.text == '#494949' && this.category.theme.accent == '#ff4d4f' && this.category.theme.background == '#f0f2f5')
            {this.current_theme = 'mv_custom_theme_1';}
            else if (this.category.theme.header == '#1890ff'  && this.category.theme.title == '#251016'  && this.category.theme.text == '#494949' && this.category.theme.accent == '#1890ff' && this.category.theme.background == '#f0f2f5')
            {this.current_theme = 'mv_custom_theme_2';}
            else {this.current_theme = 'mv_custom_theme';}
        },
        checkColorValue (){
            if (this.deleteimg == false && this.category.logoUpdate == '' && this.category.faviconUpdate == '' && this.category.theme.header == this.category.rootTheme.header && this.category.theme.title == this.category.rootTheme.title && this.category.theme.text == this.category.rootTheme.text && this.category.theme.accent == this.category.rootTheme.accent && this.category.theme.background == this.category.rootTheme.background)
            {return true;}
            else {return false;}
        },
        setRoot (){
            this.rootLogo = this.category.logoimg;
            this.rootFavicon = this.category.faviconimg;
            this.rootLogoUpdate = this.category.logoUpdate;
            this.rootFaviconUpdate = this.category.faviconUpdate;
            this.rootDeleteImg = this.deleteimg;
        },
        checkLogo (){
            if (this.category.logoimg == '')
            {
                if (this.category.logoUpdate == '')
                {return '';}
                else {return  this.category.logoUpdate;}
            }
            else {
                if (this.category.logoUpdate == '')
                {return this.category.logoimg;}
                else {return  this.category.logoUpdate;}
            }
        },
        checkFavicon (){
            if (this.category.faviconimg == '')
            {
                if (this.category.faviconUpdate == '')
                {return '';}
                else {return  this.category.faviconUpdate;}
            }
            else {
                if (this.category.faviconUpdate == '')
                {return this.category.faviconimg;}
                else {return  this.category.faviconUpdate;}
            }
        }
    }
};
</script>

<style lang="scss">
.big-ninja-feedbo {
  .upload-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 1fr;
    gap: 4rem;
  }
  .logo-container{
    position: relative;
    margin-bottom: 2rem;
  }
  .upload-area{
    position: relative;
    margin-top: 15px;
    display: flex;
    text-align: center;
  }
  .upload-item{
    margin-bottom: 20px;
  }
  .ant-upload-list-text{
    width: 252.5px;
  }
  .theme-container{
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(9rem, 1fr));
    grid-auto-rows: 1fr;
    gap: 2rem;
  }
  .theme-item{
    margin-top: 15px;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .theme-item-wrap{
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
  }
  .theme-item-header{
    height: 2rem;
  }
  .theme-item-custom{
    background-color: rgb(238, 238, 238);
    background-image: linear-gradient(135deg, rgb(246, 246, 246), rgb(213, 213, 213));
  }
  .item1{
    background-color: #ff4d4f;
  }
  .item2{
    background-color: #1890ff;
  }
  .theme-item-content{
    background-color: rgb(255, 255, 255);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 0.8rem;
    line-height: 1rem;
    color: rgba(0, 0, 0, 0.85);
    padding: 1rem;
  }
  .custom-icon{
    display: inline-block;
    width: 1em;
    line-height: 1em;
    text-align: center;
    font-family: fontello;
    font-style: normal;
    font-weight: normal;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    margin: 0px 0.5rem 0px 0px;
  }
  .item1-icon{
    background-color: #ff4d4f;
    height: 1rem;
    width: 1rem;
    border-radius: 50% ;
  }
  .black-icon{
    margin-left: 1rem;
    background-color: rgb(0, 0, 0);
    height: 1rem;
    width: 1rem;
    border-radius: 50% ;
  }
  .grey-icon{
    margin-left: 1rem;
    background-color: rgb(73, 73, 73);
    height: 1rem;
    width: 1rem;
    border-radius: 50% ;
  }
  .item2-icon{
    background-color: #1890ff;
    height: 1rem;
    width: 1rem;
    border-radius: 50% ;
  }
  .current-theme{
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    width: 1rem;
    height: 1rem;
    color: rgb(249, 245, 134);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 0.5rem;
    background: rgb(29, 31, 46);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(249, 245, 134);
    border-image: initial;
    border-radius: 50%;
  }
  .button-save-wrap {
    position: absolute;
    bottom: 30px;
    left: 0px;
    right: 25px;
    transform: translateY(0px);
    padding: 0.5rem 4rem;
    transition: transform 150ms ease 0s;
  }
  .button-save{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    color: rgb(255, 255, 255);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 3px;
  }
  .button-back{
    background-color: #f0f2f5 !important;
    border: none !important;
    width:44.8px;
  }
  .arrow-left-icon{
    margin-right: 20px;
    padding-bottom: 7px;
  }
  .custom-color-form{
    height: 500px;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    width: 100%;
    padding: 0px 10px 0px;
  }
  .custom-color-form-header{
    height: 100px;
  }
  .custom-color-form-content{
    height: 200px;
    display: flex;
    font-size: 0.8rem;
    line-height: 1rem;
    color: rgba(0, 0, 0, 0.85);
    padding: 1rem;
    justify-content: space-between;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .custom-color-form-left{
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: flex-start;
    flex: 1 1 0%;
  }
  .custom-color-form-left + .custom-color-form-right {
    border-left: solid 1px rgba(0, 0, 0, 0.04);
    margin: 0px 0px 0px 2rem;
    padding: 0px 0px 0px 2rem;
  }
  .custom-color-form-right{
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: flex-start;
    flex: 1 1 0%;
  }
  .custom-color-form-right-title{
    color: #251016;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .custom-color-form-right-description{
    color: #494949;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  .custom-color-form-right-button {
    height: 35px;
    line-height: 2.2;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    touch-action: manipulation;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
  }
  .custom-color-header-wrap{
    position: relative;
    pointer-events: initial;
    min-width: 0px;
    padding-left: 20px;
    padding-top: 30px
  }

  .avatar-uploader > .ant-upload {
    width: 100% !important;
    height: 140px !important;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
    
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .img-upload{
    height: 90px;
    width: 50%;
    border-radius: 3px;
    object-fit: cover;
  }
  .button-delete-image {
    position: absolute;
    top: 0;
    right: 5px;
    opacity: .6;
    padding: .25rem .5rem;
    transition: opacity .15s ease 0s;
    cursor: pointer;
  }
  .icon-delete{
    display: inline-block;
    width: 1em;
    line-height: 1em;
    text-align: center;
    font-family: fontello;
    font-style: normal;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    margin: 0px;
  }
  .custom-theme-default{
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.15s ease 0s;
  }
  .appearance-scrollbar{
    height: 90vh;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .aafix-button-save{
    margin-top: 30px;
  }
  .aafix-button-save-custom{
    right: 60px;
    top: 435px;
  }
  @media only screen and (max-width:600px) {
    .aafix-button-save{
      right: 20px !important;
    }
    .custom-color-form-right{
      display: none;
    }
  }
}
</style>