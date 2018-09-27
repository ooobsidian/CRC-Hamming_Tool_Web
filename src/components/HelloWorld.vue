<template>
  <div style="height: 100%;">
    <div class="title">
      计算机网络第二次研讨
    </div>
    <div class="subtitle">CRC与海明编码</div>
    <div class="pageWarpper">
      <div class="crc">
        <Form :model="formItem" :label-width="80">
          <FormItem label="源数据">
            <Input v-model="formItem.data" placeholder="请输入数据" clearable></Input>
          </FormItem>
          <FormItem label="参数模型">
            <Select>
              <Option v-for="item in formItem.gxStr" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="冗余码">
            <Input v-model="formItem.crc"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="crcCode">生成冗余码</Button>
          </FormItem>
          <FormItem label="新的源数据">
            <Input v-model="formItem.dataStr" placeholder="请输入数据" clearable></Input>
          </FormItem>
          <FormItem label="校验结果">
            <Input v-model="result"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="checkCrc">校验</Button>
          </FormItem>
        </Form>
      </div>
      <div class="hamming">
        <Form :model="formItem" :label-width="80">
          <FormItem label="源数据">
            <Input v-model="formItem.data" placeholder="请输入数据"></Input>
          </FormItem>
          <FormItem label="海明码">
            <Input v-model="formItem.crc"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary">生成海明码</Button>
          </FormItem>
          <FormItem label="新的源数据">
            <Input v-model="formItem.dataStr" placeholder="请输入数据"></Input>
          </FormItem>
          <FormItem label="校验结果">
            <Input v-model="result"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary">校验</Button>
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
        formItem: {
          data: '',
          crc: '',
          gxStr: [
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
          dataStr: '',
        },
        result: ''
      }
    },
    methods: {
      crcCode() {
        console.log("!!!")
        axios({
          url: 'http://192.168.50.223:8080/CRC/getCRC',
          method: 'post',
          params: {
            data: this.formItem.data,
            gxStr: this.formItem.gxStr.value
          }
        }).then((res) => {
          if (res.data.code === "SUCCESS" && res.data.data.length) {
            console.log('成功!')
            this.$Message.success("生成CRC码成功!")
            this.formItem.crc = res.data.data
          } else {
            this.$Message.error(res.data.message)
            console.log(res.data.message)
          }
        }).catch((e) => {
          console.log(e)
        });
      },
      checkCrc() {
        axios({
          url: 'http://192.168.50.223:8080/CRC/checkCRC',
          method: 'post',
          params: {
            crc: this.crc,
            dataStr: this.formItem.dataStr,
            gxStr: this.formItem.gxStr.value
          }
        }).then((res) => {
          if (res.data.code === "SUCCESS" && res.data.data.length) {
            this.result = res.data.data
          }else {
            this.$Message.error(res.data.message)
          }
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
  .title{
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
