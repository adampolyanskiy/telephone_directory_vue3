<script setup lang="ts">
import { VALIDATION_LEN, VALIDATION_MESSAGES, VALIDATION_REGEX } from '@/constants';
import type { Contact } from '@/interfaces';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, numeric, required } from '@vuelidate/validators';
import format from 'string-template';
import { reactive, watchEffect } from 'vue';

const $props = defineProps<{
  contact?: Contact;
}>();

console.log($props.contact);

const formValue = reactive<Contact>(
  $props.contact
    ? $props.contact
    : {
        firstname: '',
        lastname: '',
        middlename: '',
        address: '',
        homephone: '',
        cellphone: ''
      }
);

const rules = {
  firstname: {
    required: helpers.withMessage(VALIDATION_MESSAGES.REQUIRED_FIELD, required),
    minLength: helpers.withMessage(
      format(VALIDATION_MESSAGES.MIN_LENGTH, VALIDATION_LEN.FIRSTNAME.MIN),
      minLength(VALIDATION_LEN.FIRSTNAME.MIN)
    ),
    maxLength: helpers.withMessage(
      format(VALIDATION_MESSAGES.MIN_LENGTH, VALIDATION_LEN.FIRSTNAME.MAX),
      maxLength(VALIDATION_LEN.FIRSTNAME.MAX)
    ),
    cyrillic: helpers.withMessage(
      VALIDATION_MESSAGES.CYRILLIC_ONLY,
      helpers.regex(VALIDATION_REGEX.CYRILLIC)
    )
  },
  lastname: {
    required: helpers.withMessage(VALIDATION_MESSAGES.REQUIRED_FIELD, required),
    minLength: helpers.withMessage(
      format(VALIDATION_MESSAGES.MIN_LENGTH, VALIDATION_LEN.LASTNAME.MIN),
      minLength(VALIDATION_LEN.LASTNAME.MIN)
    ),
    maxLength: helpers.withMessage(
      format(VALIDATION_MESSAGES.MIN_LENGTH, VALIDATION_LEN.LASTNAME.MAX),
      maxLength(VALIDATION_LEN.LASTNAME.MAX)
    ),
    cyrillic: helpers.withMessage(
      VALIDATION_MESSAGES.CYRILLIC_ONLY,
      helpers.regex(VALIDATION_REGEX.CYRILLIC)
    )
  },
  middlename: {
    required: helpers.withMessage(VALIDATION_MESSAGES.REQUIRED_FIELD, required),
    minLength: helpers.withMessage(
      format(VALIDATION_MESSAGES.MIN_LENGTH, VALIDATION_LEN.MIDDLENAME.MIN),
      minLength(VALIDATION_LEN.MIDDLENAME.MIN)
    ),
    maxLength: helpers.withMessage(
      format(VALIDATION_MESSAGES.MIN_LENGTH, VALIDATION_LEN.MIDDLENAME.MAX),
      maxLength(VALIDATION_LEN.MIDDLENAME.MAX)
    ),
    cyrillic: helpers.withMessage(
      VALIDATION_MESSAGES.CYRILLIC_ONLY,
      helpers.regex(VALIDATION_REGEX.CYRILLIC)
    )
  },
  address: {
    required: helpers.withMessage(VALIDATION_MESSAGES.REQUIRED_FIELD, required),
    minLength: helpers.withMessage(
      format(VALIDATION_MESSAGES.MIN_LENGTH, VALIDATION_LEN.ADDRESS.MIN),
      minLength(VALIDATION_LEN.ADDRESS.MIN)
    ),
    maxLength: helpers.withMessage(
      format(VALIDATION_MESSAGES.MIN_LENGTH, VALIDATION_LEN.ADDRESS.MAX),
      maxLength(VALIDATION_LEN.ADDRESS.MAX)
    )
  },
  homephone: {
    required: helpers.withMessage(VALIDATION_MESSAGES.REQUIRED_FIELD, required),
    numeric,
    number: helpers.withMessage(
      VALIDATION_MESSAGES.PHONE_LENGTH,
      helpers.regex(VALIDATION_REGEX.TELEPHONE)
    )
  },
  cellphone: {
    required: helpers.withMessage(VALIDATION_MESSAGES.REQUIRED_FIELD, required),
    numeric,
    number: helpers.withMessage(
      VALIDATION_MESSAGES.PHONE_LENGTH,
      helpers.regex(VALIDATION_REGEX.TELEPHONE)
    )
  }
};

const v$ = useVuelidate(rules, formValue);

console.log(v$);

const $emit = defineEmits<{
  valid: [value: boolean];
}>();

watchEffect(async () => {
  const isValid = await v$.value.$validate();
  $emit('valid', isValid);
});
</script>

<template>
  <AppForm>
    <AppTextInput
      id="firstname"
      v-model="formValue.firstname"
      :valid="!v$.firstname.$error"
      label="Имя"
      :minlength="VALIDATION_LEN.FIRSTNAME.MIN"
      :maxlength="VALIDATION_LEN.FIRSTNAME.MAX"></AppTextInput>
    <p
      v-for="error of v$.firstname.$errors"
      :key="error.$uid"
      class="mt-1 text-sm text-red-600 dark:text-red-500">
      {{ error.$message }}
    </p>
    <AppTextInput
      id="lastname"
      v-model="formValue.lastname"
      :valid="!v$.lastname.$error"
      label="Фамилия"
      :minlength="VALIDATION_LEN.LASTNAME.MIN"
      :maxlength="VALIDATION_LEN.LASTNAME.MAX"></AppTextInput>
    <p
      v-for="error of v$.lastname.$errors"
      :key="error.$uid"
      class="mt-1 text-sm text-red-600 dark:text-red-500">
      {{ error.$message }}
    </p>
    <AppTextInput
      id="middlename"
      v-model="formValue.middlename"
      :valid="!v$.middlename.$error"
      label="Отчество"
      :minlength="VALIDATION_LEN.MIDDLENAME.MIN"
      :maxlength="VALIDATION_LEN.MIDDLENAME.MAX"></AppTextInput>
    <p
      v-for="error of v$.middlename.$errors"
      :key="error.$uid"
      class="mt-1 text-sm text-red-600 dark:text-red-500">
      {{ error.$message }}
    </p>
    <AppTextInput
      id="address"
      v-model="formValue.address"
      :valid="!v$.address.$error"
      label="Адрес"></AppTextInput>
    <p
      v-for="error of v$.address.$errors"
      :key="error.$uid"
      class="mt-1 text-sm text-red-600 dark:text-red-500">
      {{ error.$message }}
    </p>
    <AppTextInput
      id="homephone"
      v-model="formValue.homephone"
      :valid="!v$.homephone.$error"
      type="text"
      label="Домашний телефон"
      :minlength="VALIDATION_LEN.HOMEPHONE.MIN"
      :pattern="VALIDATION_REGEX.TELEPHONE"
      :maxlength="VALIDATION_LEN.HOMEPHONE.MAX"></AppTextInput>
    <p
      v-for="error of v$.homephone.$errors"
      :key="error.$uid"
      class="mt-1 text-sm text-red-600 dark:text-red-500">
      {{ error.$message }}
    </p>
    <AppTextInput
      id="cellphone"
      v-model="formValue.cellphone"
      :valid="!v$.cellphone.$error"
      type="text"
      label="Мобильный телефон"
      :minlength="VALIDATION_LEN.CELLPHONE.MIN"
      :pattern="VALIDATION_REGEX.TELEPHONE"
      :maxlength="VALIDATION_LEN.CELLPHONE.MAX"></AppTextInput>
    <p
      v-for="error of v$.cellphone.$errors"
      :key="error.$uid"
      class="mt-1 text-sm text-red-600 dark:text-red-500">
      {{ error.$message }}
    </p>
  </AppForm>
</template>

<style scoped></style>
