<template>
  <div class=" modal fade" id="messageModal" ref="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="messageModalLabel">{{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p v-for="message in messages">{{message}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary mr-2" @click="closeDialog">Cancel</button>
          <button type="button" class="btn btn-primary" @click="closeDialog">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages() {
      return this.$store.getters.messages;
    },
    title() {
      return this.$store.getters.title;
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch("clearMessages");
      $(this.$refs.messageModal).modal("toggle");
    }
  },
  updated() {
    if (this.$store.getters.messages.length >= 1) {
      $(this.$refs.messageModal).modal("toggle");
    }
  }
};
</script>

<style>
</style>
