// 表单校验规则
export const rules = {
  name: [
    { required: true, message: '请输入用户名👿👿👿', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码👿👿👿', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,16}$/,
      message: '密码必须是6~16个字母或者数字~',
      trigger: 'blur'
    }
  ],
  tel: [
    { required: true, message: '请输入号码👿👿👿', trigger: 'blur' },
    {
      pattern:
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      message: '请输入有效的手机号码~',
      trigger: 'blur'
    }
  ]
}
