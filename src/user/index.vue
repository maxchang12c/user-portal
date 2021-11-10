<template>
  <BasicTemplate>
    <template #body>
      <div class="ma-2">
        <router-view></router-view>
      </div>
    </template>
  </BasicTemplate>
</template>

<script>
import BasicTemplate from "@/templates/basic";
export default {
  name: "User",
  components: {
    BasicTemplate,
  },
};
</script>
