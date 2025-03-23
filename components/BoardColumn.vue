<script setup lang="ts">
const boardStore = useBoardStore()

defineProps({
    column:{
        type:Object,
        required:true
    },
    columnIndex:{
        type:Number,
        required:true
    }
})
const editNameState= ref(false)
const deleteColumn = (columnIndex) => {
    boardStore.deleteColumn(columnIndex)
}
</script>
<template>
     <UContainer class="column">
            <div class="column-header mb-4">
                <div>
                    <UInput v-if="editNameState" v-model="column.name" type="text" placeholder="edit column name" />
                    <h2 v-else class="mb-4">{{ column.name }}</h2>
                </div>
                <div>
                    <UButton class="bg-emerald-500 mr-2" icon="mdi:pencil-box" @click="editNameState =!editNameState"/>
                    <UButton class="bg-red-500" icon="mdi:trash-can" @click="deleteColumn(columnIndex)"/>
                </div>
            </div>
            <ul>
                <li v-for="task in column.tasks"
                :key="task.id">
               <UCard class="mb-4 bg-white"> <strong>{{ task.name }}</strong>
                <p>{{ task.description }}</p>
            </UCard>
                </li>
            </ul>
        </UContainer>
</template>