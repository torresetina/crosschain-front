<template>
  <div class="outer">

    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane>
        <template #label key="1">
          <span> Token Deposited </span>
        </template>
        <TableViewTokenDeposited />
      </el-tab-pane>
      <el-tab-pane>
        <template #label key="2">
          <span> Token Claimed </span>
        </template>

        <TableViewTokenClaimed />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import TableViewTokenClaimed from './TableViewTokenClaimed.vue';
import TableViewTokenDeposited from './TableViewTokenDeposited.vue';


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