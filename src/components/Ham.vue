<template>
  <div style="height: 100%">
    <div class="pageWarpper">
      <div class="title">
        海明码(只能校验一位)
      </div>
      <div class="ham">
        <Form :model="formItem2">
          <FormItem label="源数据">
            <Input size="large" v-model="formItem2.dataStr" placeholder="请输入数据(只能是二进制码)"></Input>
          </FormItem>
          <FormItem label="海明码">
            <Input size="large" v-model="formItem2.ham"></Input>
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" @click="hamming">生成海明码</Button>
          </FormItem>
          <FormItem label="海明码校验">
            <Input size="large" v-model="formItem2.dataStar" placeholder="请输入数据(只能是二进制码)"></Input>
          </FormItem>
          <FormItem label="校验结果">
            <Input size="large" v-model="formItem2.result2"></Input>
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" @click="checkHamming">校验</Button>
          </FormItem>
        </Form>
        <Button type="default" size="default" to="/"><Icon type="ios-arrow-back"></Icon>返回主页</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "HAM",
    data() {
      return {
        formItem2: {
          dataStr: '',
          dataStar: '',
          ham: '',
          result2: ''
        },
      }
    },
    methods:{
      hamming() {
        axios({
          url: 'http://0.0.0.0:8081/Ham/getHam',
          method: 'post',
          params: {
            dataStr: this.formItem2.dataStr
          }
        }).then((res) => {
          if (res.data.code === "SUCCESS") {
            this.$Notice.success({
              title:'生成海明码成功!'
            })
            this.formItem2.ham = res.data.data
          }else{
            this.$Notice.error({
              title:'生成失败!',
              desc:'查看是否输入正确,只能输入二进制串'
            })
          }
        }).catch((e)=> {

        });
      },
      checkHamming(){
        axios({
          url: 'http://0.0.0.0:8081/Ham/checkHam',
          method: 'post',
          params:{
            dataStar:this.formItem2.dataStar
          }
        }).then((res)=>{
          if (res.data.code === "SUCCESS"){
            this.$Notice.success({
              title:'校验成功!'
            });
            if(res.data.data==0) {
              this.formItem2.result2="无错误"
            }else {
              this.formItem2.result2="第"+res.data.data+"位出现错误"
            }
          }else{
            this.$Notice.error({
              title:'校验失败!'
            })
          }
        }).catch((e)=>{

        });
      }
    }
  }
</script>

<style>
  .pageWarpper {
    width: 40%;
    height: 100%;
    margin: 0 auto;
  }

  .title {
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;;
    font-size: 46px;
    margin: 40px;
  }
  .ivu-form-item-label {
    font-size: 30px !important;
  }
  .ivu-input-large{
    font-size: 20px !important;
    height: 50px !important;
    padding-left: 1em;
  }
  .ivu-btn-large{
    font-size:20px !important;
  }
</style>
