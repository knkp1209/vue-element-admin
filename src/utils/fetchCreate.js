import { request } from '@/utils/request'

export default function fetchEdit(url, _this) {
  return request({
    url: url + '/create',
    method: 'get'
  }).then(response => {
    return response.data
  })
}
