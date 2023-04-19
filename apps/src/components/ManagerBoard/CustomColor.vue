<template>
  <div
    ref="colorpicker"
    class="custom-color-form-left-item"
  >
    <div class="custom-color-content-wrap">
      <AButton
        class="custom-color-content-button ant-btn-custom"
        @click="togglePicker"
      >
        <div
          class="custom-color-content-icon"
          :style="{ background: color}"
        />
        <div
          class="custom-color-content-text"
          :class="{ 'dark' : checkHeaderLight(),'light' : checkHeaderDark()}"
        >
          {{ title }}
        </div>
      </AButton>
      <div class="chrome-picker-wrap">
        <div class="chrome-picker-content">
          <Chrome
            v-if="displayPicker"
            :value="colorValue"
            @input="changeColor"
          />
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';
export default {
    components: {
        Chrome
    },
    props: {
        title: String,
        color: String
    },
    data () {
        return {
            colorValue: '',
            displayPicker: false,
            colorLight: '#fff',
            colorDark: '#000',
        };
    },
    methods: {
        setColor (){
            if (this.colorValue == '')
            {this.colorValue = this.color;}
            return this.colorValue;
        },
        showPicker () {
            this.setColor();
            document.addEventListener('click', this.documentClick);
            this.displayPicker = true;
        },
        hidePicker () {
            document.removeEventListener('click', this.documentClick);
            this.displayPicker = false;
        },
        togglePicker () {
            this.displayPicker ? this.hidePicker() : this.showPicker();
        },
        documentClick (e) {
            const el = this.$refs.colorpicker;
            const target = e.target;
            if (el !== target && !el.contains(target)) {
                this.hidePicker();
            }
        },
        changeColor (val){
            this.colorValue = val.hex;
            const params = {
                name : this.title,
                color : this.colorValue
            };
            this.$emit('changeCustomColor',params);
        },
        checkHeaderLight (){
            if (this.title == 'Header' && this.checkColor(this.color) == 'light')
            {return true;}
            else
            {return false;}

        },
        checkHeaderDark (){
            if (this.title == 'Header' && this.checkColor(this.color) == 'dark')
            {return true;}
            else
            {return false;}

        },
        checkColor (color){
            // Variables for red, green, blue values
            let r; let g; let b; let hsp;
            // Check the format of the color, HEX or RGB?
            if (color.match(/^rgb/)) {

                // If HEX --> store the red, green, blue values in separate variables
                color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
                
                r = color[1];
                g = color[2];
                b = color[3];
            } 
            else {
                // If RGB --> Convert it to HEX: http://gist.github.com/983661
                color = +('0x' + color.slice(1).replace( 
                    color.length < 5 && /./g, '$&$&'));
                r = color >> 16;
                g = color >> 8 & 255;
                b = color & 255;
            }
            // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
            hsp = Math.sqrt(
                0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
            );
            // Using the HSP value, determine whether the color is light or dark 127.5
            if (hsp>160) {
                return 'light';
            } 
            else {
                return 'dark';
            }
        }
    }
};
</script>

<style scoped lang="scss">
.big-ninja-feedbo {
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
  .custom-color-content-button {
    background-color: initial !important;
    border: none !important;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 1rem !important;
    user-select: none;
    min-width: 10rem;
    max-width: 10rem;
    color: rgba(0, 0, 0, 0.85) !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    outline: none;
    overflow: hidden;
    box-shadow: none;
  }
  .custom-color-content-button:hover {
    background-color: rgba(0, 0, 0, 0.04) !important;
  }
  .custom-color-content-icon{
    height: 1rem;
    width: 1rem;
    margin-right: 1rem;
    border-width: 1px;
    border-style: solid;
    border-color: #aaa;
    border-image: initial;
    border-radius: 50%;
    display: flex;
    position: absolute;
    bottom: 6px;
  }
  .custom-color-content-text{
    padding-left: 40px;
    float: left;
  }
  .custom-color-content-wrap{
    position: relative;
    pointer-events: initial;
    min-width: 0px;
    padding-left: 24px;
  }
  .color-picker{
    position:absolute;
    display: inline;
  }
  .chrome-picker-wrap{
    position: absolute;
    z-index: 3;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    top: 100%;
    left: 0px;
    margin: 0.5rem 0px;
  }
  .chrome-picker-content{
    position: relative;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    box-shadow: var(--shadow-2);
    color: #494949;
    width: 100%;
    line-height: 1.4;
    border-radius: 4px;
    animation: 0.25s ease 0s 1 normal none running iibWOW;
  }
  .dark{
    color: #000;
  }
  .light{
    color: #fff;
  }
}
</style>