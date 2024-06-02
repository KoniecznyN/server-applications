<template>
  <main>
    <div class="card" aria-id="contentIdForA11y3">
      <div class="card-header" role="button" aria-controls="contentIdForA11y3">
        <p class="card-header-title">
          <template v-if="!loading">O autorze</template>
        </p>
      </div>
      <div class="card-content">
        <div class="content">
          <template v-if="!loading">
            Jestem młodym fanatykiem wędkarstwa (wcale nie). W wolnej chwili
            przeglądam na internecie oferty lamp lawowych. Lubię doniczki oraz
            gdy pada deszcz.
            <a>#jesteśmywtymrazem</a>.
          </template>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">
          <template v-if="!loading">To jest stopka (fajnie wyglądała)</template>
        </a>
      </footer>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card {
  width: 50%;
}
</style>
