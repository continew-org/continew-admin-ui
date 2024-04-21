<template>
  <a-model v-model:visible="visible">
    <div class="cropper">
      // 裁剪左侧内容
      <div class="cropper_left">
        <vueCropper
          :tyle="{ width: '400px' }"
          ref="cropperRef"
          :img="options.img"
          :info="true"
          :info-true="options.infoTrue"
          :auto-crop="options.autoCrop"
          :fixed-box="options.fixedBox"
          :can-move="options.canMoveBox"
          :can-scale="options.canScale"
          :fixed-number="fixedNumber"
          :fixed="options.fixed"
          :full="options.full"
          :center-box="options.centerBox"
          @real-time="previewHandle"
        />
        <div class="reupload_box">
          <div class="reupload_text" @click="uploadFile('reload')">重新上传</div>
          <div>
            <el-icon class="rotate_right" @click="changeScale(1)">
              <CirclePlus />
            </el-icon>
            <el-icon class="rotate_right" @click="changeScale(-1)">
              <Remove />
            </el-icon>
            <el-icon class="rotate_right" @click="rotateRight">
              <RefreshRight />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="cropper_right">
        <div class="preview_text">预览</div>
        <div :style="getStyle" class="previewImg">
          <div :style="previewFileStyle">
            <img :style="previews.img" :src="previews.url" alt="" />
          </div>
        </div>
      </div>
    </div>
  </a-model>
</template>
<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import VueCropper from 'vue-cropper'
import { ref } from 'vue'

const visible = ref(true)
</script>
