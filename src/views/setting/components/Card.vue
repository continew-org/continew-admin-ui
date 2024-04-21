<template>
  <div class="card">
    <div class="card_header">
      <slot name="header"></slot>
    </div>
    <div class="card_body">
      <slot name="body"> </slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<style scoped lang="scss">
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: var(--color-bg-1);
  border: 1px solid var(--color-neutral-2);
  .card_header {
    padding: 18px 20px;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(232, 244, 255, 0.5)),
      to(hsla(0, 0%, 100%, 0))
    );
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    background: linear-gradient(180deg, rgba(232, 244, 255, 0.5), hsla(0, 0%, 100%, 0));
  }
  .card_body {
    flex: 1;
    padding: 15px 28px;
  }
  .card_footer {
    padding: 15px 28px;
    border-top: 1px solid var(--color-neutral-2);
  }
}
</style>
