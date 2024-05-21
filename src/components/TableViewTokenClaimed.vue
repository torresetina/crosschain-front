<template>

  <div class="outer">
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <div m="4">
              <p m="t-0 b-2">Transaction Hash: {{ props.row.transactionHash }}</p>
              <p m="t-0 b-2">From Token: {{ props.row.fromToken }}</p>
              <p m="t-0 b-2">To Token: {{ props.row.toToken }}</p>
              <p m="t-0 b-2">Bridge Hash: {{ props.row.bridgeHash }}</p>
              <p m="t-0 b-2">Destination: {{ props.row.destination }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="timestamp" label="Timestamp" />
        <el-table-column prop="amountOut" label="AmountOut" />
        <el-table-column prop="chainName" label="Tag" />
      </el-table>
    </div>
    <div class="qform">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Sender">
          <el-input v-model="formInline.user" placeholder="Sender" clearable />
        </el-form-item>
        <el-form-item label="Tag">
          <el-select v-model="formInline.region" placeholder="Tag" clearable>
            <el-option label="mango" value="mango" />
            <el-option label="sui" value="sui" />
            <el-option label="bsc" value="bsc" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-date-picker v-model="formInline.date" type="datetimerange" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


</template>

<script lang="ts" setup>
import { reactive } from 'vue';


const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}

interface User {
  timestamp: string
  amountOut: number
  fromToken: string
  toToken: string
  transactionHash: string
  bridgeHash: string
  chainName: string
  destination: string
}


const tableData: User[] = [
  {
    timestamp: '1715929285',
    amountOut: 9,
    fromToken: 'No. 189, Grove St, Los Angeles',
    toToken: 'sometotokenheresometotokenhere',
    transactionHash: 'sometransactionhashheresometransactionhash',
    bridgeHash: 'somebridgehashheresomebridgehashghere',
    chainName: 'mango',
    destination: 'somedestinationheresomedestinationhe'
  },
  {
    timestamp: '1715929285',
    amountOut: 9,
    fromToken: 'No. 189, Grove St, Los Angeles',
    toToken: 'sometotokenheresometotokenhere',
    transactionHash: 'sometransactionhashheresometransactionhash',
    bridgeHash: 'somebridgehashheresomebridgehashghere',
    chainName: 'mango',
    destination: 'somedestinationheresomedestinationhe'
  },
  {
    timestamp: '1715929285',
    amountOut: 9,
    fromToken: 'No. 189, Grove St, Los Angeles',
    toToken: 'sometotokenheresometotokenhere',
    transactionHash: 'sometransactionhashheresometransactionhash',
    bridgeHash: 'somebridgehashheresomebridgehashghere',
    chainName: 'mango',
    destination: 'somedestinationheresomedestinationhe'
  },
  {
    timestamp: '1715929285',
    amountOut: 0,
    fromToken: 'No. 189, Grove St, Los Angeles',
    toToken: 'sometotokenheresometotokenhere',
    transactionHash: 'sometransactionhashheresometransactionhash',
    bridgeHash: 'somebridgehashheresomebridgehashghere',
    chainName: 'mango',
    destination: 'somedestinationheresomedestinationhe'
  },
]
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.qform {
  padding: 30px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

.outer {
padding: 30px
}
</style>