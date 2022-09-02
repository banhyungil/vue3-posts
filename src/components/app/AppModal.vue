<template>
  <Transition>
    <div v-if="show">
      <div class="modal-backdrop fade show"></div>
      <div
        class="modal fade show d-block"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="$emit('update:show', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="actions"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
});
defineEmits(['update:show']);
</script>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 0.5s ease;
}
.v-enter-to {
  opacity: 1;
}
</style>
