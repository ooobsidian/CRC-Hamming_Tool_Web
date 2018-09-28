<template>
  <div style="height: 100%;">
    <div class="title">
      计算机网络第二次研讨
    </div>
    <div class="subtitle">CRC与海明编码</div>
    <div class="pageWarpper">
      <div class="crc">
        <Form :model="formItem1" :label-width="80">
          <FormItem label="源数据">
            <Input v-model="formItem1.data" placeholder="请输入数据(可以是任意数据)" clearable></Input>
          </FormItem>
          <FormItem label="参数模型">
            <Select @on-change="onChange">
              <Option v-for="item in formItem1.gx" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="二进制码">
            <Input v-model="formItem1.byte"></Input>
          </FormItem>
          <FormItem label="冗余码">
            <Input v-model="formItem1.crc"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="crcCode">生成冗余码</Button>
          </FormItem>
          <FormItem label="新的源数据">
            <Input v-model="formItem1.dataStr" placeholder="请输入数据(可以是任意数据)" clearable></Input>
          </FormItem>
          <FormItem label="校验结果">
            <Input v-model="formItem1.result1"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="checkCrc">校验</Button>
          </FormItem>
        </Form>
      </div>
      <div class="hamming">
        <Form :model="formItem2" :label-width="80">
          <FormItem label="源数据">
            <Input v-model="formItem2.dataStr" placeholder="请输入数据(只能是二进制码)"></Input>
          </FormItem>
          <FormItem label="海明码">
            <Input v-model="formItem2.ham"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="hamming">生成海明码</Button>
          </FormItem>
          <FormItem label="新的源数据">
            <Input v-model="formItem2.dataStar" placeholder="请输入数据(只能是二进制码)"></Input>
          </FormItem>
          <FormItem label="校验结果">
            <Input v-model="formItem2.result2"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="checkHamming">校验</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'HelloWorld',
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
        formItem2: {
          dataStr: '',
          dataStar: '',
          ham: '',
          result2: ''
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
            this.$Message.success("生成CRC码成功!")
            this.formItem1.crc = res.data.data.crc
            this.formItem1.byte = res.data.data.byte
          } else {
            this.$Message.error(res.data.message)
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
            this.$Message.success('检验成功!')
            if (res.data.data === true)
              this.formItem1.result1 = "没有出现错误"
            else if (res.data.data === false)
              this.formItem1.result1 = "出现错误"
          } else {
            this.$Message.error(res.data.message)
          }
        }).catch((e) => {

        });
      },
      hamming() {
        axios({
          url: 'http://0.0.0.0:8081/Ham/getHam',
          method: 'post',
          params: {
            dataStr: this.formItem2.dataStr
          }
        }).then((res) => {
          if (res.data.code === "SUCCESS") {
            this.$Message.success('生成海明码成功!')
            this.formItem2.ham = res.data.data
          }else{
            this.$Message.error('生成失败!')
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
            this.$Message.success('校验成功!');
            this.formItem2.result2=res.data.data
          }else{
            this.$Message.error('校验失败!')
          }
        }).catch((e)=>{

        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .pageWarpper {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    display: flex;
  }

  .crc {
    margin-right: 50px;
  }

  .hamming {
    margin-left: 50px;
  }

  .title {
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;;
    font-size: 46px;
  }

  .subtitle {
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;;
    font-size: 30px;
  }
</style>
