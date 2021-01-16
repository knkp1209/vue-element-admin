import { request } from '@/utils/request'
import { Message } from 'element-ui'

export default function update(url, _this, data = false) {
  return request({
    url: url + '/' + _this.postForm.id,
    method: 'PUT',
    data: data === false ? this.postForm : data
  }).then(response => {
    Message({
      message: response.message,
      type: 'success',
      duration: 1.5 * 1000
    })
    return response.data
  })
}
