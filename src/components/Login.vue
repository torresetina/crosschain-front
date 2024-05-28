<template>

<div class="s1">
    <el-card 
        style="max-width: 600px" 
        shadow="always"
    >
        <el-form 
            ref="formDataRef"
            label-position="top" 
            label-width="auto" 
            :model="formLoginData" 
            style="max-width: 600px"
            :rules="rules"
            status-icon
        >
            <el-form-item label="User Name" prop="userName">
                <el-input v-model="formLoginData.userName" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="formLoginData.password" type="password" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="CAPTCHA" prop="captcha">
                <CaptchaImage ref="captchaRef" class="s" :contentHeight="c1" />
                <el-input v-model="formLoginData.captcha" style="width: 420px; margin-left: 20px;" />
            </el-form-item>
            <el-form-item style="margin-top: 20px; float: right; margin-right: 40px">
                <el-button type="primary" @click="submitForm(formDataRef)">LOGIN</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
   

</template>

<script lang="ts" setup >
import { inject, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
//@ts-ignore
import { CaptchaImage } from 'vue3-captcha-canvas'
import router from '@/router';
import httpRequest from '@/axios';
import type { TypeAssertion } from 'typescript';

import { useCookies } from 'vue3-cookies';
const c1 = ref(30)
const captchaRef = ref()

const cookies = useCookies()




const formDataRef = ref<FormInstance>()


const validateUserName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error(`User Name can't be empty`))
    } else {
        callback()
    }
}


const validatePass = (rule:any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error(`Password can't be empty`))
    } else {
        callback()
    }
}

const validateCaptcha = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input captcha shows in picture'))
    } else if (!captchaRef.value.verify(value, true)) {
        return callback(new Error(`Captcha code wrong`))
    } else {
        callback()
    }

}

interface RetMap {
    userName: string
    token: string
}

const formLoginData = reactive({
    userName: '',
    password: '',
    captcha: '',
})

const rules = reactive<FormRules<typeof formLoginData>>({
    userName: [{ validator: validateUserName, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
    captcha: [{ validator: validateCaptcha, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log("login!")
        } else {
            alert("error")
        }
    })
}

</script>





<style>

.s1 {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
 

.s {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>