<template>
  <div class="d-flex">
    <v-card
      :min-height="'500'"
      max-width="250"
      class="d-flex justify-center mr-4 flex-grow-1"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <div class="d-flex flex-column align-center">
        <v-avatar color="primary" class="my-6" size="140">
          <span v-if="previewData.namePrefix" class="white--text text-h2">
            {{ previewData.namePrefix }}</span
          >
          <v-icon v-else color="white" size="80"> mdi-account-circle </v-icon>
        </v-avatar>
        <div class="preview">
          <div class="subtitle-1">Name: {{ previewData.name }}</div>
          <div>Id: {{ previewData.id }}</div>
          <div>Email: {{ previewData.email }}</div>
        </div>
      </div>
    </v-card>
    <div class="flex-grow-1">
      <UserTable
        :items="customers"
        :headers="headers"
        :isLoading="loading.delete"
        @clickRow="viewCustomer"
        @hoverInfo="assignPreviewValue"
      >
        <template #top-right>
          <v-btn
            class="mx-4"
            small
            depressed
            color="primary"
            @click="
              $router.push({
                name: 'user-detail',
                params: {
                  type: 'add',
                },
              })
            "
          >
            Register
          </v-btn>
        </template>
        <template #actions="{ item }">
          <v-btn
            class="ml-2"
            small
            depressed
            color="error"
            @click.stop="deleteCustomer(item)"
          >
            Delete
          </v-btn>
        </template>
      </UserTable>
    </div>
  </div>
</template>
<script>
import UserTable from "@/user/components/user-table";
import { userApi } from "@/api/user/index.js";

export default {
  name: "UserMain",
  components: {
    UserTable,
  },
  data() {
    return {
      customers: [],
      loading: { delete: false },
      previewData: {
        name: "",
        email: "",
        id: "",
        namePrefix: "",
      },
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
          width: 200,
        },
        { text: "National ID", value: "id", width: 200 },
        { text: "Email", value: "email", width: 200 },
        { text: "DOB", value: "dob" },
        {
          text: "",
          align: "center",
          value: "actions",
        },
      ],
    };
  },
  created() {
    this.getList();
  },

  methods: {
    assignPreviewValue(item) {
      this.previewData = {
        ...item,
        namePrefix: item.name ? item.name.substring(0, 1) : null,
      };
    },
    async deleteCustomer({ id }) {
      try {
        if (id) {
          this.loading.delete = true;
          const { ret } = await userApi.deleteCustomer({
            id,
          });
          if (ret == 0) await this.getList();
          else throw "delete failed";
        }
      } catch (e) {
        throw e;
      } finally {
        this.previewData = {
          name: "",
          email: "",
          id: "",
          namePrefix: "",
        };
        this.loading.delete = false;
      }
    },
    async getList() {
      const userList = await userApi.getCustomerList({
        page: 1,
      });
      this.customers = userList;
    },
    viewCustomer({ id }) {
      this.$router.push({
        name: "user-detail",
        params: {
          type: "edit",
        },
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
<style lang="scss">
.preview {
  max-width: 200px;
}
</style>
