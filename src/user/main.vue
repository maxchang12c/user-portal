<template>
  <div class="d-flex">
    <div class="flex-grow-1">
      <UserTable
        :items="customers"
        :headers="headers"
        @clickRow="viewCustomer"
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
            @click="deleteCustomer(item)"
          >
            Delete
          </v-btn>
        </template>
      </UserTable>
    </div>
    <v-card :min-height="'500'" class="d-flex justify-center ml-2 flex-grow-1">
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
        <div class="actions mb-6">
          <v-btn small depressed color="primary"> View </v-btn>
          <v-btn class="ml-2" small depressed color="error"> Delete </v-btn>
        </div>
        <div class="subtitle-1">Name: Max</div>
        <div>IC: 970534385245</div>
        <div>DOB: 1997/5/24</div>
      </div>
    </v-card>
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
    async deleteCustomer({ id }) {
      if (id) {
        const { ret } = await userApi.deleteCustomer({
          id,
        });
        if (ret == 0) this.getList();
        else throw "delete failed";
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
