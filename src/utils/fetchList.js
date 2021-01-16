import { request } from '@/utils/request'

export default function fetchList(url, _this) {
  /*
  const loading = _this.$loading({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
   */
  _this.listLoading = true
  return request({
    url: url,
    method: 'get',
    params: _this.listQuery
  }).then(response => {
    _this.list = response.data.list
    _this.total = response.data.total
    _this.listLoading = false
    return response.data
  }).finally(() => {
    /*
    loading.close()
     */
  })
}
