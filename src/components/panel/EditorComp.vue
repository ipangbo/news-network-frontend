<template>
  <Toolbar
    :editor="editorRef"
    :defaultConfig="toolbarConfig"
    :mode="mode"
    style="border-bottom: 1px solid #ccc"
  />
  <Editor
    :defaultConfig="editorConfig"
    :mode="mode"
    v-model="valueHtml"
    style="height: 400px; overflow-y: hidden"
    @onCreated="handleCreated"
    @onChange="handleChange"
    @onDestroyed="handleDestroyed"
    @onFocus="handleFocus"
    @onBlur="handleBlur"
    @customAlert="customAlert"
    @customPaste="customPaste"
  />
</template>

<script setup lang="ts">
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import type { IDomEditor } from "@wangeditor/editor";

const editorRef = shallowRef();
const valueHtml = ref("<p>hello</p>");
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容.." };

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
const handleCreated = (editor: IDomEditor) => {
  console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style scoped></style>
