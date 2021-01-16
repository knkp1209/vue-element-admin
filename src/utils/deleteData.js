import { request } from '@/utils/request'
import { Message, MessageBox } from 'element-ui'
import fetchList from '@/utils/fetchList'

export default function deleteData(url, row, _this, tip = '') {
  MessageBox.confirm('确认删除ID为 ' + row.id + tip + '?', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    return request({
      url: url + '/' + row.id,
      method: 'delete'
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
