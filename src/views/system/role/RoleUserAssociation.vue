<template>  
    <a-modal  
            v-model:visible="visible"  
            title="关联用户"  
            :mask-closable="false"  
            :esc-to-close="false"  
            :modal-style="{ maxWidth: '625px' }"  
            :body-style="{ maxHeight: '70vh' }"  
            width="90%"  
            draggable  
            @before-ok="save"
            @close="close"  
        >  
        <a-transfer :data="transferData"  :model-value="values" :title="['未选择','已选择']" @change="handleChange">  
        <template #source="{ data, selectedKeys, onSelect }">  
            <a-tree  
            size="medium"
            :checkable="true"  
            checked-strategy="child"
            :checked-keys="selectedKeys"  
            :data="getTreeData()"
            @check="(keys) => onSelect(keys)"  
            />  
        </template>  
        </a-transfer>  
    </a-modal>  
</template>  

<script lang="ts" setup>  
import { bindUsers, listDeptWithUsersTree, listRoleUsers } from '@/apis';  
import { ref } from 'vue';  
import type { TransferItem } from '@arco-design/web-vue/es/transfer/interface';
import { Message, type TreeNodeData } from '@arco-design/web-vue';

const visible = ref(false);  
const roleId = ref('');
const treeData = ref<TreeNodeData[]>([]);  
const transferData = ref<TransferItem[]>([]);  
const values = ref<string[]>(['']);  
const close = () => {  
    visible.value = false;  
};  
const save = async () => {
    const newValues = values.value.map((item) => item.replace('user_', ''));
    const res = await bindUsers(roleId.value, newValues);
    if (res.success) {
        Message.success('修改成功')
        visible.value = false;  
        return false;
    }else{
        Message.error(res.msg)
    }
};  
const handleChange =  (value: string[]) => {
    values.value = value
}
const getTransferData = (treeData: TreeNodeData[], transferDataSource: TransferItem[] = []) => {
    treeData.forEach((item) => {  
        if (item["isUser"] === true) {  
            transferDataSource.push({ label: item.title ?? '', value: String(item.key) ?? '', disabled: false });
        }  
        if (item.children) {  
            getTransferData(item.children, transferDataSource);  
        }  
    });  
    return transferDataSource;
};  

const getTreeData = () => {
    const travel = (_treeData: TreeNodeData[] = []) => { 
        const treeDataSource: TreeNodeData[] = [];  
        _treeData.forEach((item) => {
            const disabled = values.value.filter((v) => v === item.key).length > 0;
            treeDataSource.push({ title: item.title, key: item.key, children: travel(item.children) , disabled: disabled});  
        });
        return treeDataSource;  
    };
    
    return travel(treeData.value);  
};  

const onAssociation = async (id: string) => {  
    visible.value = true;  
    roleId.value = id;
    values.value = []
    getDeptList();
    listUsers(roleId.value);
};  
const getDeptList = async () => {
    const res = await listDeptWithUsersTree({ status: 1 });  
    treeData.value = res.data;  
    transferData.value = getTransferData(treeData.value);  
};

const listUsers = async (roleId: string) => {
    const res = await listRoleUsers(roleId);   
    res.data.forEach(item => {
        values.value.push( "user_" + item)
    })
    
};


defineExpose({  
    onAssociation  
});  
</script>  

<style lang="scss" scoped>  
:deep(.arco-transfer-view) {  
    height: 40vh;  
    width: 300px;  
}  
</style>