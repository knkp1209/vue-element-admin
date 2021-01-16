import { request } from '@/utils/request'

export default function fetchEdit(url, _this) {
  return request({
    url: url + '/' + _this.postForm.id + '/edit',
    method: 'get'
  }).then(response => {
    return response.data
  })
}
