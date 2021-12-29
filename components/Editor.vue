<template>
 <div>
    <div v-if="editor" class="editor">
      <button type="button" @click.prevent="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        code
      </button>
      <button type="button" @click.prevent="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button type="button" @click.prevent="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button type="button" @click.prevent="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        bullet list
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        ordered list
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        code block
      </button>
      <button type="button" @click.prevent="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        blockquote
      </button>
      <button type="button" @click.prevent="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button type="button" @click.prevent="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button type="button" @click.prevent="editor.chain().focus().undo().run()">
        undo
      </button>
      <button type="button" @click.prevent="editor.chain().focus().redo().run()">
        redo
      </button>

      <button type="button" @click.prevent="setLink" :class="{ 'is-active': editor.isActive('link') }">
        Link
      </button>
      <button type="button" @click.prevent="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
        Unlink
      </button>
    </div>
    <span v-if="limit" class="body-length" v-text="(limit - value.length)"></span>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
// This is for nuxt-2 and vue-3
// for vue-3 in codecourse blog project
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
        }),
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },

  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style lang="css">
/* Basic editor styles */
.body-length{ float: right; margin-right: 6px;}
.editor{ margin-bottom: 5px; }
.editor button { font-size: inherit; font-family: inherit; color: #000; margin: 0.1rem; border: 1px solid black; border-radius: 0.3rem; padding: 0.1rem 0.4rem; background: white; accent-color: black; }
.is-active { background: black !important;color: #fff !important; }
.ProseMirror { min-height: 150px !important; padding: 10px; background: #e2e7ea; border-radius: 3px; position: unset !important;}
.ProseMirror * { margin: 0 0 0.5em 0 !important; }
.ProseMirror ul, ol { padding: 0 1rem; }
.ProseMirror h1, h2, h3, h4, h5, h6 {line-height: 1.1; }
.ProseMirror code { background-color: rgba(#616161, 0.1);color: #616161; }
.ProseMirror pre { background: #0D0D0D;color: #FFF;font-family: 'JetBrainsMono', monospace; padding: 0.75rem 1rem; border-radius: 0.5rem; } 
.ProseMirror code { color: inherit;padding: 0;background: none;font-size: 0.8rem; }
.ProseMirror img { max-width: 100%;   height: auto; }
.ProseMirror blockquote { padding-left: 1rem;   border-left: 2px solid rgba(#0D0D0D, 0.1); }
.ProseMirror hr { border: none; border-top: 2px solid rgba(#0D0D0D, 0.1);margin: 2rem 0; }
</style>