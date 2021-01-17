<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves :loading="batchDeleteLoading" class="filter-item" type="danger" icon="el-icon-delete" @click="batchDelete">
        批量删除
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      :header-cell-style="{'text-align': 'center'}"
      :cell-style="{'text-align': 'center'}"
      max-height="760"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      @selection-change="handleSelectionChangeRow"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column prop="describe" label="功能描述" :show-overflow-tooltip="true" />
      <el-table-column prop="auth_name" label="权限名称" :show-overflow-tooltip="true" />
      <el-table-column prop="auth_path" :show-overflow-tooltip="true">
        <template slot="header">
          <el-tooltip content="包含模块控制器方法的完整方法名" placement="top">
            <span>权限路径<i class="el-icon-info" /></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="name" :show-overflow-tooltip="true">
        <template slot="header">
          <el-tooltip content="vue路由名称" placement="top">
            <span>路由名称<i class="el-icon-info" /></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="path" :show-overflow-tooltip="true">
        <template slot="header">
          <el-tooltip content="vue组件路由路径" placement="top">
            <span>路由路径<i class="el-icon-info" /></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="component" :show-overflow-tooltip="true">
        <template slot="header">
          <el-tooltip content="vue组件文件路径" placement="top">
            <span>文件路径<i class="el-icon-info" /></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-tooltip content="是否开启vue组件路由父子传值介质" placement="top">
            <span>路由介质<i class="el-icon-info" /></span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span v-if="scope.row.props"><i class="el-icon-success" /></span>
          <span v-else><i class="el-icon-error" /></span>
        </template>
      </el-table-column>
      <el-table-column label="路由重定向" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.redirect == null"><i class="el-icon-error" /></span>
          <span v-else>{{ scope.row.redirect }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="router" label="">
        <template slot="header">
          <el-tooltip content="是否作为vue组件路由" placement="top">
            <span>开启路由<i class="el-icon-info" /></span>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <span v-if="scope.row.router"><i class="el-icon-success" /></span>
          <span v-else><i class="el-icon-error" /></span>
        </template>
      </el-table-column>
      <el-table-column prop="menu_name" label="菜单栏名称" :show-overflow-tooltip="true" />
      <el-table-column label="菜单栏状态">
        <template slot-scope="scope">
          <span v-if="scope.row.menu_status"><i class="el-icon-success" /></span>
          <span v-else><i class="el-icon-error" /></span>
        </template>
      </el-table-column>
      <el-table-column label="根节点">
        <template slot-scope="scope">
          <span v-if="scope.row.leaf === 0"><i class="el-icon-success" /></span>
          <span v-else-if="scope.row.leaf === 1"><i class="el-icon-error" /></span>
          <span v-else>路由根节点，菜单叶子节点</span>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0">后台</span>
          <span v-else-if="scope.row.type === 1">前端</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="160" sortable />
      <el-table-column label="操作" fixed="right" width="160" align="center">
        <template slot-scope="scope">
          <div v-loading="scope.row.id === false">
            <router-link :to="'/function/edit/'+scope.row.id" class="router-link">
              <el-button type="primary" size="mini">
                编辑
              </el-button>
            </router-link>
            <el-button type="danger" size="mini" @click="deleteData(scope.row)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="requestData" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import waves from '@/directive/waves' // waves directive
import fetchList from '@/utils/fetchList'
import deleteData from '@/utils/deleteData'
import batchDeleteData from '@/utils/batchDeleteData'
import url from '@/api/function'

export default {
  name: 'FunctionIndex',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: true,
      list: [],
      selectedIds: [],
      listQuery: {
        page: 1,
        page_size: 20
      },
      total: 0,
      batchDeleteLoading: false
    }
  },
  created() {
    console.log()
    this.requestData()
  },
  methods: {
    handleSelectionChangeRow(selection) {
      this.selectedIds = []
      for (const i in selection) {
        this.selectedIds.push(selection[i]['id'])
      }
    },
    async deleteData(row) { // 这里的row还是双向绑定的
      await deleteData(url, row, this)
    },
    async batchDelete() {
      await batchDeleteData(url, this)
    },
    requestData() {
      fetchList(url, this)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/fix.scss";
</style>
