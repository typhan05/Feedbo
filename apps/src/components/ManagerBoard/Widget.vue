<template>
  <div>
    <div class="manage-title">
      <h3 class="title-text">
        Widget
      </h3>
    </div>
    <ACollapse
      v-model="activeKey"
      default-active-key="1"
      accordion
    >
      <ACollapsePanel
        key="1"
        header="Widget Link"
      >
        <p>Copy and paste the following code into the HTML of your website wherever you would like the button to appear.</p>
        <Highlight language="html">{{ code1 }}</Highlight>
        <div
          class="button-copy-wrap"
          @click="onCopy"
        >
          <AButton
            v-clipboard="code1"
            class="template-button"
            type="primary"
          >
            <AIcon
              v-show="text1 === 'Copied'"
              type="check"
            />{{ text1 }}
          </AButton>
        </div>
      </ACollapsePanel>
      <ACollapsePanel
        key="2"
        header="Initialize the Feedbo modal"
      >
        <p>Replace the CSS selector placeholder so that it targets the element that should open the modal.</p>
        <Highlight language="html">{{ code2 }}</Highlight>
        <div
          class="button-copy-wrap"
          @click="onCopyModal"
        >
          <AButton
            v-clipboard="code2"
            class="template-button"
            type="primary"
          >
            <AIcon
              v-show="text2 === 'Copied'"
              type="check"
            />{{ text2 }}
          </AButton>
        </div>
      </ACollapsePanel>
    </ACollapse>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Highlight from 'vue-highlight-component';
import { getBoardIdFromUrl } from "@/helper/helper.js";
export default {
    components: {
        Highlight,
    },
    data () {
        return {
            code1: '',
            code2:'',
            text1: 'Copy Code',
            text2: 'Copy Code',
            activeKey: [ '1' ],
        };
    },
    mounted (){
        const termId = getBoardIdFromUrl();
        const scriptUrl = window.bigNinjaVoteWpdata.siteUrl + '/widget.js';
        this.code1 = '<button data-feedbo-id="'+termId+'">Feedback</button><script async src="'+scriptUrl+'"></'+'script>';
        this.code2 = '<script async src="'+scriptUrl+'"></'+'script>\n<script>\nvar vote = {\n\tid: \''+termId+'\', \n\tselector: \'.YOUR-CSS-SELECTOR\'\n};\n</'+'script>'; 
    },
    computed: {
        ...mapState([ 'category' ]),
    },
    methods: {
        onCopy (){
            this.text1 = 'Copied';
        },
        onCopyModal (){
            this.text2 = 'Copied';
        }
    }
};
</script>
<style src="highlight.js/styles/github.css"></style>
<style scoped lang="scss">
.big-ninja-feedbo {
  .code{
      overflow: hidden;
  }
  .code-text{
    margin: 0px 25px;
  }
  .button-copy-wrap{
      float: right;
      margin-bottom: 10px;
  }
  code{
    padding: 12px 20px !important;
  }
}
</style>