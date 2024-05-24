<template>
  <div class="outer">
    <div class="table">
      <el-table :data="tableData" style="width: 100%" v-loading="loading" >
        <el-table-column type="expand">
          <template #default="props">
            <div m="5">
              <p m="t-0 b-2">Transaction Hash: {{ props.row.transactionHash }}</p>
              <p m="t-0 b-2">From Token: {{ props.row.fromToken }}</p>
              <p m="t-0 b-2">To Token: {{ props.row.toToken }}</p>
              <p m="t-0 b-2">Destination: {{ props.row.destination }}</p>
              <p m="t-0 b-2">Sender: {{ props.row.sender }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="timestamp" label="Timestamp" />
        <el-table-column prop="amountIn" label="amountIn" />
        <el-table-column prop="fee" label="Fee" />
        <el-table-column prop="chainName" label="Tag" width="110" fixed="right" />
      </el-table>

      <el-pagination small layout="prev, pager, next" :total="count" v-model:current-page="currentPage" @update:current-page="onSubmit"/>
    </div>

    <div class="qform">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Destination">
          <el-input v-model="formInline.destination" placeholder="Destination" clearable />
        </el-form-item>
        <el-form-item label="Tag">
          <el-select v-model="formInline.chainName" placeholder="Tag" clearable>
            <el-option label="mango" value="mango" />
            <el-option label="sui" value="sui" />
            <el-option label="bsc" value="bsc" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date range">
          <el-date-picker v-model="formInline.timestamps" type="daterange" placeholder="Pick a date" clearable date-format="YYYY/MM/DD"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, type Ref } from 'vue';
import  httpRequest  from '@/axios'

const loading = ref(false)

onMounted(()=>{
  onSubmit()
})

const count = ref(10)
const currentPage = ref(1)


const formInline = reactive({
  destination: '',
  chainName: '',
  timestamps: '',
  currentPage
})



interface RetMap {
  currentPage: number
  total: number
  data: TokenDeposited[]
}

interface TokenDeposited {
  timestamp: string
  amountIn: number
  fee: number
  fromToken: string
  toToken: string
  transactionHash: string
  chainName: string
  destination: string
  sender: string
}

const onSubmit = () => {
  loading.value = true
  httpRequest.get<RetMap>({
    url: '/api/tokenDeposited',
    params: formInline
  })
    .then((res) => {
      count.value = res.data.total
      tableData.value = res.data.data
      loading.value = false
    })
}


const tableData: Ref<TokenDeposited[]> = ref([])
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