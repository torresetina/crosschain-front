<template>
  <div class="outer">
    <div class="table">
      <el-table :data="tableData" style="width: 100%" v-loading="loading" >
        <el-table-column type="expand">
          <template #default="props">
            <div m="5">
              <p m="t-0 b-2">Destination: {{ props.row.destination }}</p>
              <p m="t-0 b-2">Sender: {{ props.row.sender }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="transactionHash" label="Transaction Hash" />
        <el-table-column prop="sender" label="Address" />
        <el-table-column prop="amountIn" label="Amount In" />
        <el-table-column prop="fee" label="Fee" />
        <el-table-column prop="fromToken" label="From Token" />
        <el-table-column prop="toToken" label="To Token" />
        <el-table-column prop="timestamp" label="Timestamp" width="110" fixed="right"/>
        <el-table-column prop="chainName" label="Tag" width="75" fixed="right" />
      </el-table>
      <el-pagination small layout="prev, pager, next" :total="count" v-model:current-page="currentPage" :hide-on-single-page="true" @update:current-page="onSubmit"/>
    </div>

    <div class="qform">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Hash">
          <el-input @blur="useHash" v-model="formInline.transactionHash" placeholder="Transcation Hash" clearable />
        </el-form-item>
        <el-form-item label="Address">
          <el-input :disabled v-model="formInline.sender" placeholder="Sender" clearable />
        </el-form-item>
        <el-form-item  label="Tag">
          <el-select :disabled v-model="formInline.chainName" placeholder="Tag" clearable>
            <el-option label="eth" value="eth" />
            <el-option label="bsc" value="bsc" />
            <el-option label="btcTest" value="btcTest" />
            <el-option label="mango" value="mango" />
            <el-option label="sui" value="sui" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date range">
          <el-date-picker :disabled v-model="formInline.timestamps" type="daterange" placeholder="Pick a date" clearable date-format="YYYY/MM/DD"/>
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
import { tokenDecimalsMap, tokenNameMap } from './utils/tokens';
import converter from './utils/converter';
import { tr } from 'element-plus/es/locales.mjs';

const loading = ref(false)

// onMounted(()=>{
//   onSubmit()
// })

const count = ref(10)
const currentPage = ref(1)
const disabled = ref(false)


const formInline = reactive({
  transactionHash: '',
  sender: '',
  chainName: '',
  timestamps: '',
  currentPage
})

function useHash():void{
  if(formInline.transactionHash == '') {
    disabled.value = false
  } else {
    disabled.value = true
  }
}

interface RetMap {
  currentPage: number
  total: number
  data: TokenDeposited[]
}

interface TokenDeposited {
  timestamp: string
  amountIn: string
  fee: string
  fromToken: string
  toToken: string
  transactionHash: string
  chainName: string
  destination: string
  sender: string
}

const onSubmit = () => {
  console.log(formInline)
  loading.value = true
  httpRequest.get<RetMap>({
    url: '/api/tokenDeposited',
    params: formInline
  })
    .then((res) => {
      // console.log(res)  
      count.value = res.data.total
      res.data.data.flatMap(
        each => {
          each.timestamp = new Date(parseInt(each.timestamp) * 1000).toLocaleString()
          const contract = each.fromToken
          // console.log("-----------------------------contract: ", contract)
          each.fromToken = tokenNameMap.get(each.chainName)?.get(contract)!
          const decimal = (tokenDecimalsMap.get(each.chainName)?.get(contract))!
          each.amountIn = converter(parseInt(each.amountIn) / (10 ** decimal))
          each.fee = converter(parseInt(each.fee) / (10 ** decimal))
        }
      )
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