<template>
  <div class="common-layout full-height">
    <el-container class="full-height">
      <el-header class="header">
        <HeaderComp></HeaderComp>
      </el-header>
      <el-container class="complemented-height">
        <el-main class="zero-padding">
          <div class="editor-box">
            <div id="toolbar-container">
              <!--工具栏挂载位置-->
            </div>
            <div id="editor-container">
              <div id="title-container">
                <input id="title-input" placeholder="请输入标题" />
                <input id="author-input" placeholder="发布单位" />
              </div>
              <div id="editor-text-area">
                <!--编辑器挂载位置-->
              </div>
            </div>
            <div class="info-box">
              <h4>摘要</h4>
              <div id="abstract-container">
                <textarea
                  id="abstract-textarea"
                  placeholder="请输入摘要，推荐不超过200字"
                ></textarea>
              </div>
              <h4>文章发布</h4>
              <div class="info-option-box">
                <div class="info-option">
                  <el-switch
                    v-model="isDraft"
                    class="mb-2"
                    size="large"
                    active-text="以草稿发布"
                  />
                </div>
                <div class="info-option">
                  <el-select
                    v-model="category"
                    class="m-2 category-select"
                    placeholder="请选择类别"
                    size="large"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div class="info-option">
                  <el-button type="primary" style="width: 80px">发布</el-button>
                </div>
              </div>
            </div>
            <textarea id="textarea-1" class="hidden-textarea"></textarea>
            <textarea id="textarea-2" class="hidden-textarea"></textarea>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import HeaderComp from "@/components/panel/HeaderComp.vue";
import "@wangeditor/editor/dist/css/style.css";
import { createEditor, createToolbar } from "@wangeditor/editor";
import { ref } from "vue";
import type {
  IEditorConfig,
  IDomEditor,
  IToolbarConfig,
} from "@wangeditor/editor";
import { onMounted } from "vue";

const isDraft = ref();
const category = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
onMounted(() => {
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {};
  editorConfig.placeholder = "请输入内容";
  editorConfig.onChange = (editor: IDomEditor) => {
    const content = editor.children;
    const contentStr = JSON.stringify(content);
    let textArea1Element = document.getElementById(
      "textarea-1"
    ) as HTMLTextAreaElement;
    if (textArea1Element) {
      textArea1Element.value = contentStr;
    }
    const html = editor.getHtml();
    let textArea2Element = document.getElementById(
      "textarea-2"
    ) as HTMLTextAreaElement;
    if (textArea2Element) {
      textArea2Element.value = html;
    }
  };
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 创建编辑器
  const editor = createEditor({
    selector: "#editor-text-area",
    config: editorConfig,
    mode: "default", // 或 'simple' 参考下文
  });
  // 创建工具栏
  const toolbar = createToolbar({
    editor,
    selector: "#toolbar-container",
    config: toolbarConfig,
    mode: "default", // 或 'simple' 参考下文
  });
});
</script>

<style scoped>
.full-height {
  height: 100vh;
}
.complemented-height {
  height: 92vh;
}
.header {
  border-bottom: 1px solid #eee;
  height: 8vh;
}
.zero-padding {
  padding: 0;
}
.editor-box {
  padding: 0;
  background-color: rgb(245, 245, 245);
  overflow-y: auto;
  position: relative;
}

#editor-container {
  width: 850px;
  margin: 30px auto 30px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}
#title-container {
  padding: 20px 0 10px 0;
  border-bottom: 1px solid #e8e8e8;
}
#title-container input {
  font-size: 26px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}
#title-container #author-input {
  margin-top: 18px;
  margin-left: 3px;
  font-size: 14px;
}
#editor-text-area {
  min-height: 900px;
  margin-top: 20px;
}
.hidden-textarea {
  display: none;
}
.info-box {
  width: 850px;
  margin: 0 auto;
}
h4 {
  font-weight: 700;
  font-size: 24px;
}
#abstract-container {
  margin: 30px auto 30px auto;
  background-color: #fff;
  padding: 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}
#abstract-textarea {
  width: 100%;
  min-height: 300px;
  font-size: 18px;
  border: 0;
  outline: none;
  line-height: 2em;
}
.info-option-box {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
</style>

<style>
.w-e-bar-show.w-e-toolbar {
  justify-content: center;
}
#w-e-textarea-1 {
  min-height: 500px;
}
</style>
