<template>
  <!-- Modal -->
  <div class="modal fade" id="appModal" tabindex="-1" data-focus="false">
    <div class="modal-dialog modal-dialog-centered" :class="`modal-${size}`">
      <div
        class="modal-content"
        style="background-color: #f1f1f1; color: #555b62"
      >
        <div class="modal-header" :class="headerClass">
          <slot name="header" />
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            style="opacity: 0.9"
          />
        </div>
        <div class="modal-body" style="max-height: 65vh">
          <slot name="body" />
        </div>
        <div class="modal-footer" style="background-color: #f1f1f1">
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
