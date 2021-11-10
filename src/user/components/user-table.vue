<template>
  <v-data-table
    :headers="tableHeaders"
    :items="items"
    item-key="name"
    class="elevation-1"
    :search="search"
    @click:row="$emit('clickRow',$event)"
  >
    <template v-slot:top>
      <div class="d-flex justify-space-between align-center">
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
        <slot name="top-right"></slot>
      </div>
    </template>

    <template v-slot:item.actions="{ item }">
      <slot name="actions" :item="item"></slot>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  props: {
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    tableHeaders() {
      return this.headers;
    },
  },
};
</script>
