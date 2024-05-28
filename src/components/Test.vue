<template>
   <!-- <el-dialog v-model="centerDialogVisible" title="Login" width="350" align-center class="login"
      :show-close="showClose">
      <div class="item">
        <span class="s">UserName </span>
        <el-input  type="text" placeholder="user name" v-model="userName" class="border" />
      </div>

      <div class="item" style="margin-top:2px;">
        <span class="s">PassWord </span>
        <el-input  type="password" placeholder="pass word" v-model="passWord" class="border" />
      </div>

      <div class="item" style="margin-top:2px">
        <CaptchaImage ref="captchaRef" class="s" />
        <el-input 
          placeholder="CAPTCHA"
          v-model="captcha" 
          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
          @keyup.enter="login" 
          class="border"
        />
        <span style="color: red;" v-show="captchaValidate">*</span>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="login" style="margin-top: 30px;">
            Login
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-button plain @click="centerDialogVisible = true">
      Click to open the Dialog
    </el-button>
     -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
//@ts-ignore
import { CaptchaImage } from 'vue3-captcha-canvas'

const c1 = ref(30)
const captchaRef = ref()

const formDataRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            if (value < 18) {
                callback(new Error('Age must be greater than 18'))
            } else {
                callback()
            }
        }
    }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (loginFormData.password !== '') {
            if (!formDataRef.value) return
            formDataRef.value.validateField('checkPass')
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== loginFormData.userName) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const loginFormData = reactive({
    userName: '',
    password: '',
    captcha: '',
})

const rules = reactive<FormRules<typeof loginFormData>>({
    userName: [{ validator: validatePass, trigger: 'blur' }],
    password: [{ validator: validatePass2, trigger: 'blur' }],
    captcha: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

