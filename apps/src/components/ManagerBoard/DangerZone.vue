<template>
  <div>
    <div class="manage-title">
      <h3 class="title-text">
        Danger Zone
      </h3>
    </div>
    <AFormModel :model="form">
      <div class="label-text">
        Delete board
      </div>
      <AFormModelItem>
        <div class="form-delete">
          <div class="form-delete-wrap">
            <div class="board-name-input">
              <AInput
                v-model="form.name"
                class="template-button"
                :placeholder="boardName"
              />
            </div>
            <div class="delete-button">
              <AButton
                type="primary"
                class="template-button"
                :loading="category.isLoadingDeleteBoard"
                :disabled="checkBoardName()"
                @click="deleteBoard"
              >
                Delete forever
              </AButton>
            </div>
          </div>
        </div>
      </AFormModelItem>
    </AFormModel>
    <div class="delete-description">
      This action will permanently delete the board <span class="board-name">
        {{ category.board.name }}
      </span> and its content.
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getBoardIdFromUrl } from "@/helper/helper.js";
export default {
    data (){
        return {
            form: {
                name: '',
            },
        };
    },
    computed: {
        ...mapState([ 'category' ]),
        boardName (){
            return 'Enter the board name (' + this.category.board.name + ')';
        }
    },
    methods:{
        checkBoardName (){
            if (this.form.name == this.category.board.name)
            {return false;}
            else {return true;}
        },
        deleteBoard (){
            this.loading = true;
            const id = getBoardIdFromUrl();
            const requestParams = {
                id: id,
                component: this 
            };
            this.$store.dispatch('category/deleteTerm',requestParams);
        }
    }
};
</script>

<style scoped lang="scss">
.big-ninja-feedbo {
  .form-delete{
    position: relative;
    margin-bottom: 0px;
    width: 100%;
  }
  .form-delete-wrap{
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    opacity: 1;
    border-radius: 4px;
  }
  .board-name-input{
    display: flex;
    flex: 1 1 0%;
  }
  .delete-button{
    padding-left: 5px;
    margin: -0.20rem;
  }
  .label-text{
    font-weight: bold;
  }
  .delete-description{
    font-size: 0.8rem;
    margin-top: 1px;
  }
  .board-name{
    color: red;
    font-weight: bold;
  }
}
</style>