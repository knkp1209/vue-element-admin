<template>
  <div class="main">
    <el-form label-position="right" label-width="100px" class="form-2-column">
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="上级列表">
            <el-cascader
              v-model="postForm.parent_id"
              :props="{ label:'auth_name', value:'id', checkStrictly: true }"
              :options="parents"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="模块">
            <el-select v-model="postForm.type" filterable placeholder="请选择" value-key="id">
              <el-option v-for="item in type_list" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--
			<el-form-item label="父级">
				<el-select v-model="parent_id" filterable placeholder="请选择" value-key="id">
					<el-option v-for="item in parents" :key="item.id" :label="item.menu_name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			-->
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="权限名称">
            <el-input
              v-model="postForm.auth_name"
              v-validate="'max:200'"
              name="auth_name"
              placeholder="角色列表"
            />
            <i v-show="errors.has('auth_name')" class="my_err">{{ errors.first('auth_name') }}</i>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限路径">
            <el-input
              v-model="postForm.auth_path"
              v-validate="'max:200'"
              name="auth_path"
              placeholder="super/role/create,包含模块控制器方法的完整方法名"
            />
            <i v-show="errors.has('auth_path')" class="my_err">{{ errors.first('auth_path') }}</i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="路由名称">
            <el-input
              v-model="postForm.name"
              v-validate="'max:200'"
              name="name"
              placeholder="RoleList,vue路由名称"
            />
            <i v-show="errors.has('name')" class="my_err">{{ errors.first('name') }}</i>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单栏名称">
            <el-input
              v-model="postForm.menu_name"
              v-validate="'max:200'"
              name="menu_name"
              placeholder="角色列表"
            />
            <i v-show="errors.has('menu_name')" class="my_err">{{ errors.first('menu_name') }}</i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="路由地址">
            <el-input v-model="postForm.path" v-validate="'max:200'" name="path" placeholder="/Role/List,vue组件路由路径" />
            <i v-show="errors.has('path')" class="my_err">{{ errors.first('path') }}</i>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重定向地址">
            <el-input
              v-model="postForm.redirect"
              v-validate="'max:200'"
              name="redirect"
              placeholder="/Role/List,vue组件重定向地址"
            />
            <i v-show="errors.has('redirect')" class="my_err">{{ errors.first('redirect') }}</i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="功能描述">
            <el-input v-model="postForm.describe" v-validate="'max:200'" name="describe" placeholder="功能描述" />
            <i v-show="errors.has('describe')" class="my_err">{{ errors.first('describe') }}</i>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文件">
            <el-input
              v-model="postForm.component"
              v-validate="'max:200'"
              name="component"
              placeholder="/Role/List,vue组件文件路径"
            />
            <i v-show="errors.has('component')" class="my_err">{{ errors.first('component') }}</i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="图标">
            <el-input v-model="postForm.icon" v-validate="'max:200'" name="icon" placeholder="el-icon-message" />
            <i v-show="errors.has('icon')" class="my_err">{{ errors.first('icon') }}</i>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="介质">
            <el-switch v-model="postForm.props" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <el-form-item label="节点">
            <el-radio-group v-model="postForm.leaf" size="small">
              <el-radio :label="0" border>树</el-radio>
              <el-radio :label="1" border>叶子</el-radio>
              <el-radio :label="2" border>特殊节点</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单栏">
            <el-switch v-model="postForm.menu_status" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="24">
          <el-form-item label="路由">
            <el-switch v-model="postForm.router" active-text="开启" inactive-text="关闭" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-loading="loading" class="submit-button">
      <router-link :to="routePath" class="router-link">
        <el-button>取 消</el-button>
      </router-link>
      <el-button type="primary" @click="post">{{ op_name }}</el-button>
    </div>
  </div>
</template>
<script>
import fetchEdit from '@/utils/fetchEdit'
import fetchCreate from '@/utils/fetchCreate'
import update from '@/utils/update'
import save from '@/utils/save'
import formFill from '@/utils/formFill'
import url from '@/api/function'

const defaultForm = {
  id: undefined,
  type: 0,
  parent_id: [],
  name: null,
  path: '',
  component: '',
  icon: '',
  props: '',
  redirect: '',
  router: true,
  menu_name: '',
  menu_status: true,
  leaf: 0,
  auth_path: '',
  auth_name: '',
  describe: ''
}

export default {
  name: 'FnEdit',
  data() {
    return {
      routePath: '/function/index',
      op_name: '保 存',
      loading: false,
      parents: [],
      type_list: [
        {
          id: 0,
          name: '管理后台'
        },
        {
          id: 1,
          name: '前端功能'
        }
      ],
      postForm: Object.assign({}, defaultForm)
    }
  },
  created() {
    this.postForm.id = this.$route.params && this.$route.params.id
    if (this.postForm.id === undefined) {
      this.requestCreateData()
    } else {
      this.requestEditData()
    }
  },
  methods: {
    async requestEditData() {
      const data = await fetchEdit(url, this)
      data.parent_id = data.pid
      delete data.pid
      this.parents = data.parents
      formFill(data, this)
    },
    async requestCreateData() {
      this.parents = await fetchCreate(url, this)
      console.log(this.parents)
    },
    async post() {
      console.log(this.postForm.parent_id)
      const data = {
        type: this.postForm.type,
        pid: this.postForm.parent_id.pop(),
        name: this.postForm.name,
        path: this.postForm.path,
        component: this.postForm.component,
        icon: this.postForm.icon,
        props: this.postForm.props,
        redirect: this.postForm.redirect,
        router: this.postForm.router,
        menu_name: this.postForm.menu_name,
        menu_status: this.postForm.menu_status,
        leaf: this.postForm.leaf,
        auth_path: this.postForm.auth_path,
        auth_name: this.postForm.auth_name,
        describe: this.postForm.describe
      }
      if (this.postForm.id === undefined) {
        await save(url, this, data)
      } else {
        await update(url, this, data)
      }
      this.$router.push({ path: this.routePath })
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~@/styles/form.scss';
@import '~@/styles/fix.scss';
</style>
