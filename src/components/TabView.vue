<template>
  <div class="outer" >

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

  </div>






</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter();
const tabName = ref('2')



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
</style>