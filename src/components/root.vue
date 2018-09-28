<template>
  <div style="height: 100%;">
    <div class="pageWarpper">
      <div class="title">计算机网络第二次研讨</div>
      <div class="subtitle">CRC与海明编码</div>
      <div class="name">16121670-李瑞轩 16121666-徐文 16121689-台枫</div>
      <Button class="button" type="primary" shape="circle" size="large" long to="/crc">循环冗余检验CRC</Button>
      <Button class="button" type="primary" shape="circle" size="large" long to="/ham">海明码</Button>
      <div class="date">2018.9.29</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "root",
  }
</script>

<style>
  .pageWarpper {
    width: 40%;
    height: 100%;
    margin: 0 auto;
  }

  .title {
    margin-top: 20%;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;;
    font-size: 60px;
  }

  .subtitle {
    margin-top: 2%;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;;
    font-size: 40px;
  }

  .name {
    margin-top: 3%;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;;
    font-size: 23px;
  }
  .date{
    margin-top: 25%;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;;
    font-size: 20px;
  }
  .button{
    margin-top: 6%;
  }
  .ivu-btn-long{
    height: 55px !important;
    line-height: 40px;
  }
  .ivu-btn-large{
    font-size: 20px !important;
  }
</style>
