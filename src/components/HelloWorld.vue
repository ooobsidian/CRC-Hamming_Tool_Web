<template>
  <div class="pageWarpper">
    <Form :model="formItem" :label-width="80">
      <FormItem label="源数据">
        <Input v-model="formItem.input" placeholder="请输入数据"></Input>
      </FormItem>
      <FormItem label="参数模型">
        <Select v-model="formItem.select">
          <Option value="CRC4">CRC-4</Option>
          <Option value="CRC5">CRC-5</Option>
          <Option value="CRC16">CRC-16</Option>
          <Option value="CRC32">CRC-32</Option>
        </Select>
      </FormItem>
      <FormItem label="宽度">
        <Select v-model="formItem.select">
          <Option v-for="" value="">1</Option>

        </Select>
      </FormItem>
      <FormItem label="DatePicker">
        <Row>
          <Col span="11">
            <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
            <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Radio">
        <RadioGroup v-model="formItem.radio">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="Checkbox">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="Eat"></Checkbox>
          <Checkbox label="Sleep"></Checkbox>
          <Checkbox label="Run"></Checkbox>
          <Checkbox label="Movie"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="Switch">
        <i-switch v-model="formItem.switch" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem label="Slider">
        <Slider v-model="formItem.slider" range></Slider>
      </FormItem>
      <FormItem label="Text">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary">Submit</Button>
        <Button style="margin-left: 8px">Cancel</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .pageWarpper {
    width: 70%;
    align-items: center;
    margin: 0 auto;
  }
</style>
