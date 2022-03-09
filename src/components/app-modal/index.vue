<template>
  <!-- Modal -->
  <div class="modal fade" data-bs-backdrop="static" id="appModal">
    <div class="modal-dialog modal-dialog-centered" :class="`modal-${size}`">
      <div class="modal-content">
        <div class="modal-header" :class="headerClass">
          <slot name="header" />
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            style="opacity: 0.9"
          />
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Modal } from "bootstrap";
export default defineComponent({
  name: "AppModal",
  mounted() {
    const myModalEl = document.querySelector("#appModal");
    if (myModalEl) {
      this.modal = Modal.getOrCreateInstance(myModalEl); // Returns a Bootstrap modal instance
    }
  },
  props: {
    headerClass: {
      type: String,
    },
    size: {
      type: String,
      default: "lg",
    },
  },
  data() {
    return {
      modal: {} as Modal,
    };
  },
  methods: {
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },
  },
});
</script>
