<template>
    <RibbonGroupComponent title="Medidas" width="220px">
        <RibbonItemGroupComponent rows="1" cols="2">
            <Button label="Pontos" icon="pi pi-bookmark" severity="secondary" outlined aria-label="Bookmark"
                class="w-100" />
        </RibbonItemGroupComponent>

        <RibbonItemGroupComponent rows="1" cols="2">
            <Button label="Distância" icon="pi pi-bookmark" severity="secondary" outlined aria-label="Bookmark"
                class="w-100" />
        </RibbonItemGroupComponent>

        <RibbonItemGroupComponent rows="1" cols="2">
            <Button label="Áreas" icon="pi pi-bookmark" severity="secondary" outlined aria-label="Bookmark"
                class="w-100" />
        </RibbonItemGroupComponent>

        <RibbonItemGroupComponent rows="1" cols="2">
            <Button label="Ângulos" icon="pi pi-bookmark" severity="secondary" outlined aria-label="Bookmark"
                class="w-100" />
        </RibbonItemGroupComponent>





        <!-- <RibbonItemGroupComponent title="Testes" rows="1" cols="4">
            <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" :maxSelectedLabels="3"
                class="w-full" />
        </RibbonItemGroupComponent> -->


    </RibbonGroupComponent>
</template>

<script>
import Measure from '@/classes/map/Measure';



export default {
    name: 'MeasureComponent',
    data() {
        return {
            message: 'Hello from MeasureComponent'
        }
    },
    mounted() {
        const measure = new Measure(this.app.map);
    }
}

</script>

<style scoped></style>