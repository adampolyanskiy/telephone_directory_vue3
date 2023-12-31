<script setup lang="ts">
import { ModalService } from '@/constants';
import type { ModalService as IModalService, ModalProps } from '@/interfaces';
import { Modal } from 'flowbite';
import { inject, onMounted, ref, watchEffect } from 'vue';

const $props = defineProps<ModalProps>();

const $modal = inject<IModalService>(ModalService);
const modalElement = ref<HTMLElement | null>(null);

function closeModal(accept: boolean) {
  accept ? $modal?.accept() : $modal?.cancel();
}

onMounted(() => {
  const modal = new Modal(modalElement!.value, {
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: false
  });

  watchEffect(() => {
    if ($props.name === $modal?.active()) {
      modal.show();
    } else {
      modal.hide();
    }
  });
});
</script>

<template>
  <div
    id="modal"
    ref="modalElement"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
            {{ $props.title }}
          </h3>
          <button
            id="closeButton"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal(false)">
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <slot></slot>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            type="button"
            :disabled="acceptButtonEnabled"
            class="text-white bg-blue-700 disabled:opacity-75 disabled:hover:bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="closeModal(true)">
            {{ $props.accept }}
          </button>
          <button
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            @click="closeModal(false)">
            {{ $props.cancel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
