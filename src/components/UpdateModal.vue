<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot/>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button class="updateBtn" @click="$emit('update')">更新</button>
            <button class="closeBtn" @click="$emit('close')">キャンセル</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-window {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.modal-content {
  padding: 10px 20px;
}

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
}

.updateBtn{
  font-size: 15px;
  padding-left: 25px;
  padding-right: 25px;
}
.closeBtn {
  font-size: 15px;
  margin-left: 10px;
}

</style>