import { request } from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import fetchList from '@/utils/fetchList'

export default function batchDeleteData(url, _this, tip = '') {
  if (_this.selectedIds.length === 0) {
    Message({
      message: '请选择要删除的记录',
      type: 'success',
      duration: 1.5 * 1000
    })
    return false
  }
  let contentString = ''
  _this.selectedIds.forEach((item) => {
    contentString = `${contentString + item + '\n\r'}`
  })
  MessageBox.confirm('确认删除ID为 ' + contentString + tip + '?', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    return request({
      url: url + '/batch',
      method: 'delete',
      data: _this.selectedIds
    }).then(response => {
      Message({
        message: response.message,
        type: 'success',
        duration: 1.5 * 1000
      })
      fetchList(url, _this)
      return response.data
    })
  })
}
