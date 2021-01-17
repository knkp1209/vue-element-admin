export default function formFill(data, _this) {
  for (const key in data) {
    _this.postForm[key] = data[key]
  }
}
