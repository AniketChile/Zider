import React from "react";
import { Controller } from "react-hook-form";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";


const theme = {
  paragraph: "mb-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
  },
};

function Editor({ value, onChange }) {
  const initialConfig = {
    namespace: "LexicalEditor",
    theme,
    editable: true,
    onError(error) {
      console.error("Lexical Error:", error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      CodeNode,
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded-lg">
        <div className="p-2 bg-gray-50 border-b text-sm text-gray-600">
          <strong>Toolbar:</strong> Use keyboard shortcuts (Ctrl+B, Ctrl+I,
          etc.)
        </div>

        <div className="p-2 min-h-[300px]">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[250px] outline-none p-2" />
            }
            placeholder={<div className="text-gray-400">Start typing...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <OnChangePlugin
            onChange={(editorState, editor) => {
              editorState.read(() => {
                const html = editor.getEditorState().toJSON();
                onChange(JSON.stringify(html));
              });
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            onChange={(content) => {
              onChange(content);
            }}
          />
        )}
      />
    </div>
  );
}
