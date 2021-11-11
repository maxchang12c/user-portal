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
        <v-avatar class="my-6" size="140">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
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
      },
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "National ID", value: "id" },
        { text: "Email", value: "email" },
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
      this.previewData = { ...item };
    },
    async deleteCustomer({ id }) {
      try {
        if (id) {
          const { ret } = await userApi.deleteCustomer({
            id,
          });
          if (ret == 0) this.getList();
          else throw "delete failed";
        }
      } catch (e) {
        throw e;
      } finally {
        this.previewData = {
          name: "",
          email: "",
          id: "",
        };
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
