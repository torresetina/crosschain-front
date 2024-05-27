<template>

  <div class="outer">
    <div class="table">
      <el-table :data="tableData" style="width: 100%" v-loading="loading" >
        <el-table-column type="expand">
          <template #default="props">
            <div m="4">
              <p m="t-0 b-2">From Token: {{ props.row.fromToken }}</p>
              <p m="t-0 b-2">To Token: {{ props.row.toToken }}</p>
              <p m="t-0 b-2">Bridge Hash: {{ props.row.bridgeHash }}</p>
              <p m="t-0 b-2">Destination: {{ props.row.destination }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="transactionHash" label="Transaction Hash"  />
        <el-table-column prop="amountOut" label="AmountOut" />
        <el-table-column prop="destination" label="Address" />
        <el-table-column prop="timestamp" label="Date Time" width="110" fixed="right"  />
        <el-table-column prop="chainName" label="Tag" width="110" fixed="right" />
      </el-table>
    </div>

    <el-pagination small layout="prev, pager, next" :total="count" v-model:current-page="currentPage" @update:current-page="onSubmit"/>

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
            <!-- <el-option label="btcTest" value="bscTest" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="Date range">
          <el-date-picker v-model="formInline.timestamps" type="daterange" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


</template>

<script lang="ts" setup>
import httpRequest from '@/axios';
import { onMounted, reactive, ref, type Ref } from 'vue';
const currentPage = ref(1)
const count = ref(10)


const loading = ref(false)

const formInline = reactive({
  destination: '',
  chainName: '',
  timestamps: '',
  currentPage
})

onMounted(()=> {
  onSubmit()
})


interface RetMap {
  currentPage: number
  total: number
  data: TokenClaimed[]
}


interface TokenClaimed {
  timestamp: string  // to locale datetime string
  amountOut: number  // to human readable
  fromToken: string  // to human readable
  toToken: string    // to human raedable
  transactionHash: string  // show in title
  bridgeHash: string       //
  chainName: string        //
  destination: string      //
}


const onSubmit = () => {
    loading.value = true
    console.log(formInline)
    httpRequest.get<RetMap>({
    url: '/api/tokenClaimed',
    params: formInline
  })
    .then((res) => {
      console.log(res) 
      count.value = res.data.total
      // res.data.data.flatMap(
      //   each => {
      //     each.timestamp = new Date(parseInt(each.timestamp) * 1000).toLocaleString()
      //   }
      // )
      tableData.value = res.data.data
      loading.value = false
    })
}
const tableData: Ref<TokenClaimed[]> = ref([])
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