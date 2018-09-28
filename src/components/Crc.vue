<template>
  <div style="height: 100%;">
    <div class="pageWarpper">
      <div class="title">
        循环冗余检验CRC
      </div>
      <div class="crc">
        <Form :model="formItem1">
          <FormItem label="源数据">
            <Input size="large" v-model="formItem1.data" placeholder="请输入数据(可以是任意数据)"></Input>
          </FormItem>
          <FormItem label="参数模型">
            <Select size="large" @on-change="onChange">
              <Option v-for="item in formItem1.gx" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="二进制码">
            <Input size="large" v-model="formItem1.byte"></Input>
          </FormItem>
          <FormItem label="冗余码">
            <Input size="large" v-model="formItem1.crc"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" @click="crcCode">生成冗余码</Button>
          </FormItem>
          <FormItem label="新的源数据">
            <Input v-model="formItem1.dataStr" size="large" placeholder="请输入数据(可以是任意数据)"></Input>
          </FormItem>
          <FormItem label="校验结果">
            <Input size="large" v-model="formItem1.result1"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" @click="checkCrc">校验</Button>
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
    name: 'CRC',
    data() {
      return {
        formItem1: {
          data: '',
          byte: '',
          crc: '',
          result1: '',
          gx: [
            {
              value: '10011',
              label: 'CRC-4'
            },
            {
              value: '100110001',
              label: 'CRC-8'
            },
            {
              value: '1100000001111',
              label: 'CRC-12'
            },
            {
              value: '11000000000000101',
              label: 'CRC-16'
            },
            {
              value: '10001000000100001',
              label: 'CRC-CCITT'
            },
            {
              value: '100000100110000010001110110110111',
              label: 'CRC-32'
            }
          ],
          gxStr: '',
          dataStr: '',
        },

      };
    },
    methods: {
      onChange(e) {
        console.log(e)
        this.gxStr = e
      },
      crcCode() {
        axios({
          url: 'http://0.0.0.0:8081/CRC/getCRC',
          method: 'post',
          params: {
            data: this.formItem1.data,
            gxStr: this.gxStr
          }
        }).then((res) => {
          if (res.data.code === "SUCCESS") {
            console.log('成功!')
            this.$Notice.success({
              title:"生成CRC码成功!",
            })
            this.formItem1.crc = res.data.data.crc
            this.formItem1.byte = res.data.data.byte
          } else {
            this.$Notice.error({
              title:res.data.message
            })
            console.log(res.data.message)
          }
        }).catch((error) => {
          console.log(error)
        });
      },
      checkCrc() {
        axios({
          url: 'http://0.0.0.0:8081/CRC/checkCRC',
          method: 'post',
          params: {
            crc: this.formItem1.crc,
            dataStr: this.formItem1.dataStr,
            gxStr: this.gxStr
          }
        }).then((res) => {
          if (res.data.code === "SUCCESS") {
            console.log(res.data.data)
            this.$Notice.success({
              title:'检验成功!'
            })
            if (res.data.data === true)
              this.formItem1.result1 = "没有出现错误"
            else if (res.data.data === false)
              this.formItem1.result1 = "出现错误"
          } else {
            this.$Notice.error({
              title:res.data.message
            })
          }
        }).catch((e) => {

        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  .ivu-input-large {
    font-size: 20px !important;
    height: 50px !important;
    padding-left: 1em;
  }
  .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
    height: 50px !important;
    line-height: 50px !important;
    font-size: 20px !important;
  }
  .ivu-select-large.ivu-select-single .ivu-select-selection{
    height:50px !important;
    padding-left: 1em;
  }
  .ivu-btn-large{
    font-size:20px !important;
  }
</style>
