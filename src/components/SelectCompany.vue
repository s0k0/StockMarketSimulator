<template>
  <select class="select-company" v-model="selectedCompany" @change="changeCompany">
    <option value="" disabled>Select a company</option>
    <option
      v-for="company in companyList"
      :value="company.isin"
      :key="company.isin"
      >{{ company.name }}</option
    >
  </select>
</template>

<script>
import companies from "../data/companyList.json";

export default {
  name: "SelectCompany",
  data: function() {
    return {
      selectedCompany: ''
    };
  },
  computed: {
    companyList: function() {
      return companies.list;
    }
  },
  methods: {
    changeCompany() {
      this.$emit('selectCompany', this.selectedCompany)
    }
  }
};
</script>

<style scoped>
.select-company {
  border: 2px solid white;
  width: 60%;
  padding: 12px;
  margin-bottom: 12px;
}
</style>
