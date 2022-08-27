<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <!-- v-bind로 객체형태로 선언 가능, replace로 history stack 관리 가능-->
        <RouterLink
          class="nav-link"
          active-class="active"
          aria-current="page"
          :to="{ name: 'NestedOne', replace: true }"
          >Nested1</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedTwo', replace: true }"
          >Nested1</RouterLink
        >
      </li>
    </ul>
    <hr class="my-4" />
    <RouterView></RouterView>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
