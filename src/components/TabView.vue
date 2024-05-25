<template>
  <div class="outer">

    <el-tabs type="border-card" class="demo-tabs" @tab-change="routerGo">
      <el-tab-pane>
        <template #label key="1">
          <span> Token Deposited </span>
        </template>
        <RouterView />
      </el-tab-pane>
      <el-tab-pane>
        <template #label key="2">
          <span> Token Claimed </span>
        </template>
        <RouterView />
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="centerDialogVisible" title="Login" width="350" align-center class="login"
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

    <!-- <el-button plain @click="centerDialogVisible = true">
      Click to open the Dialog
    </el-button> -->

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
//@ts-ignore
import { CaptchaImage } from 'vue3-captcha-canvas'

const captchaRef = ref()

const captchaValidate = ref(false)

const captcha = ref("")
const userName = ref("")
const passWord = ref("")

const showClose = false

const router = useRouter();
const tabName = ref('2')

const centerDialogVisible = ref(false)

const login = () => {
  console.log(passWord.value)
  console.log(userName.value)
  if (! captchaRef.value.verify(captcha.value, true)) {
    captchaValidate.value = true
    return
  } else {
    captchaValidate.value = false
  }

}

const routerGo = (TabPaneName: string) => {
  switch (TabPaneName) {
    case "0": {
      router.push({ name: 'tokenDeposited' })
      break
    }
    case "1": {
      router.push({ name: 'tokenClaimed' })
      break
    }
  }
}

</script>

<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.outer {
  width: 85%;
  margin: 0 auto;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: stretch;
  align-items: center;
}

.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
}

.s {
  width: 87%;
}

.border {
  margin: 6px 30px
}
</style>