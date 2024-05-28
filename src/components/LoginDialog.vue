<template>
  <el-form ref="ruleFormRef" :inline="true" :rules="rules" :model="formInline" class="demo-form-inline">
    <el-form-item label="User Name" prop="userName">
      <el-input v-model="formInline.name" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="formInline.age" placeholder="请输入年龄" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">login</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"
const props = defineProps(["row"])

const formInline = reactive({
  name: props.row.userName || "",
  age: props.row.password || ""
})

const emit = defineEmits(["close"])
const rules = reactive<FormRules>({
  userName: [{ required: true, message: "can't be empty" }],
  password: [{ required: true, message: "can't be empty" }]
})
const ruleFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!")
      const isAdd = props.row ? false : true
      emit("close", isAdd, formInline)
    } else {
      console.log("error submit!", fields)
    }
  })
}
const close = () => {}
</script>   