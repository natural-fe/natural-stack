<template>
  <Modal v-model="isShow" width="65%" :closable="false" :mask-closable="false">
    <div slot="header" class="info-header">
      <div class="ivu-modal-header-inner">菜单管理</div>
      <a class="ivu-modal-close" @click="closeModel"><i class="ivu-icon ivu-icon-ios-close"></i></a>
    </div>
    <div>
      <Form ref="menuForm" :model="form" :label-width="80" :rules="ruleValidate">
        <Row>
          <Col span="8">
            <FormItem label="显示类型" prop="webType">
              <Select v-model="form.webType" :disabled="disable">
                <Option :value="Item.key" v-for="Item in webTypeOptions" :key="Item">{{Item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="编号" prop="code">
              <Input v-model="form.code" :disabled="disable"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="父菜单" prop="pidName">
              <Treeselect v-model="form.pid" :options="menuOptions" :show-count="true" :normalizer="normalizer"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="名称" prop="name">
              <Input v-model="form.name" :disabled="disable"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="图标" prop="icon">
              <Input v-model="form.icon" :disabled="disable"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="URL地址" prop="url">
              <Input v-model="form.url" :disabled="disable"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="排序号" prop="num">
              <Input v-model="form.num" :disabled="disable"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否" prop="ismenu">
              <Select v-model="form.ismenu" :disabled="disable">
                <Option :value="Item.key" v-for="Item in yesNoOptions" :key="Item">{{Item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="备注" prop="tips">
              <Input v-model="form.tips" :disabled="disable"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="归属产品" prop="proCode">
              <Input v-model="form.proCode" :disabled="disable"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="状态" prop="status">
              <Select v-model="form.status" :disabled="disable">
                <Option :value="Item.key" v-for="Item in statusOptions" :key="Item.key">{{Item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否打开" prop="isopen">
              <Select v-model="form.isopen" :disabled="disable">
                <Option :value="Item.key" v-for="Item in yesNoOptions" :key="Item.key">{{Item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button @click="closeModel">取消</Button>
      <Button type="primary" @click="submit"  v-show="!disable">提交</Button>
    </div>
  </Modal>
</template>

<script>

import { C, U, P } from '@/libs/api.request'
import { Dict } from '@/libs/common.request'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'menu-info',
  components: {
    Treeselect
  },
  data () {
    return {
      form: {},
      isShow: false,
      type: 'add',
      disable: false,
      webTypeOptions: [],
      statusOptions: [],
      yesNoOptions: [],
      menuOptions: [],
      normalizer (node) {
        return {
          id: node.id,
          label: node.name
        }
      },
      ruleValidate: {
        webType: [
          { required: true, message: '显示类型不允许为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '编号不允许为空', trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '父编号不允许为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不允许为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '图标不允许为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: 'URL地址不允许为空', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '排序号不允许为空', trigger: 'blur' }
        ],
        ismenu: [
          { required: true, message: '是否是不允许为空', trigger: 'blur' }
        ],
        proCode: [
          { required: true, message: '归属产品不允许为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不允许为空', trigger: 'blur' }
        ],
        isopen: [
          { required: true, message: '是否打开不允许为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openModel (type, data) {
      this.isShow = true
      this.type = type
      if (data) {
        this.form = data
      } else {
        this.form = {}
      }
      this.disable = type === 'detail'
    },
    closeModel () {
      this.isShow = false
    },
    submit () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          switch (this.type) {
            case 'create':
              C('menu', this.form).then(data => {
                this.isShow = false
                this.$emit('handleSearch')
              })
              break
            case 'update':
              U('menu', this.form).then(data => {
                this.isShow = false
                this.$emit('handleSearch')
              })
              break
          }
        } else {
          this.$Message.error('请检查填写的数据')
        }
      })
    }
  },
  mounted: function () {
    Dict('yes_no').then(data => {
      this.yesNoOptions = data
    })
    Dict('status').then(data => {
      this.statusOptions = data
    })
    Dict('menu_web_type').then(data => {
      this.webTypeOptions = data
    })
    P('/menu/tree', {}).then(data => {
      this.menuOptions = data
    })
  }
}
</script>

<style scoped>
  .info-header {
    height: 40px;
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
  }

  .ivu-modal-header-inner {
    margin: 10px 15px 0px 0px;
    padding-left: 15px;
    height: 40px;
  }

  .ivu-modal-close {
    margin: 10px 15px 0px 0px;
  }

  .ivu-form-item {
    width: 260px;
  }
</style>
