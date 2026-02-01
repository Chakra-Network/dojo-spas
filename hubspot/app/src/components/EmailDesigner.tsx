import { useState } from "react";
import {
  Plus,
  Eye,
  Edit3,
  Trash2,
  Type,
  Image,
  MousePointerClick,
  Minus,
  ArrowUp,
  ArrowDown,
  ToggleLeft,
  ToggleRight,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import type { EmailTemplate, ContentBlock, SegmentationRule } from "../lib/types";
import { formatDate, generateId } from "../lib/utils";

interface EmailDesignerProps {
  templates: EmailTemplate[];
  selectedTemplateId: string | null;
  onSelectTemplate: (id: string | null) => void;
  onUpdateTemplate: (template: EmailTemplate) => void;
  onCreateTemplate: (template: EmailTemplate) => void;
}

const blockTypeIcons: Record<ContentBlock["type"], typeof Type> = {
  header: Type,
  text: FileText,
  image: Image,
  button: MousePointerClick,
  divider: Minus,
  spacer: ArrowDown,
};

/* ── Preview Mode ───────────────────────────────────────────────── */
function EmailPreview({ template }: { template: EmailTemplate }) {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-gray-100 rounded-t-lg px-4 py-3 border border-gray-200 border-b-0">
        <p className="text-xs text-gray-500">Subject</p>
        <p className="text-sm font-semibold text-gray-800">{template.subject}</p>
        <p className="text-xs text-gray-400 mt-0.5">{template.preheader}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-b-lg p-6 space-y-4">
        {template.blocks.map((block) => {
          switch (block.type) {
            case "header":
              return <h2 key={block.id} className="text-xl font-bold text-gray-900">{block.content}</h2>;
            case "text":
              return (
                <div key={block.id} className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {block.content}
                </div>
              );
            case "image":
              return (
                <div key={block.id} className="rounded-lg overflow-hidden bg-gray-100">
                  <div className="w-full h-40 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-400">
                    <Image className="w-8 h-8" />
                  </div>
                </div>
              );
            case "button":
              return (
                <div key={block.id} className="text-center">
                  <button
                    className="px-6 py-2.5 rounded-md text-sm font-semibold text-white"
                    style={{ backgroundColor: block.style?.backgroundColor ?? "#ff7a59" }}
                  >
                    {block.content}
                  </button>
                </div>
              );
            case "divider":
              return <hr key={block.id} className="border-gray-200" />;
            case "spacer":
              return <div key={block.id} className="h-6" />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

/* ── Block Editor ───────────────────────────────────────────────── */
function BlockEditor({
  block,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  block: ContentBlock;
  onUpdate: (b: ContentBlock) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const Icon = blockTypeIcons[block.type];
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 group">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs font-medium text-gray-500 uppercase">{block.type}</span>
        <div className="ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onMoveUp} className="p-1 hover:bg-gray-200 rounded"><ArrowUp className="w-3 h-3 text-gray-500" /></button>
          <button onClick={onMoveDown} className="p-1 hover:bg-gray-200 rounded"><ArrowDown className="w-3 h-3 text-gray-500" /></button>
          <button onClick={onDelete} className="p-1 hover:bg-red-100 rounded"><Trash2 className="w-3 h-3 text-red-400" /></button>
        </div>
      </div>
      {(block.type === "header" || block.type === "text" || block.type === "button") && (
        <textarea
          value={block.content}
          onChange={(e) => onUpdate({ ...block, content: e.target.value })}
          className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-sm text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-orange-400"
          rows={block.type === "text" ? 4 : 1}
        />
      )}
      {block.type === "image" && (
        <input
          type="text"
          value={block.content}
          onChange={(e) => onUpdate({ ...block, content: e.target.value })}
          className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400"
          placeholder="Image URL"
        />
      )}
    </div>
  );
}

/* ── Segmentation Editor ────────────────────────────────────────── */
function SegmentEditor({
  rules,
  onUpdate,
}: {
  rules: SegmentationRule[];
  onUpdate: (rules: SegmentationRule[]) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span>Segmentation Rules ({rules.filter((r) => r.enabled).length} active)</span>
        {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {expanded && (
        <div className="px-4 pb-3 space-y-2">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-2 text-xs">
              <button
                onClick={() =>
                  onUpdate(rules.map((r) => (r.id === rule.id ? { ...r, enabled: !r.enabled } : r)))
                }
                className="shrink-0"
              >
                {rule.enabled ? (
                  <ToggleRight className="w-5 h-5 text-orange-500" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-gray-300" />
                )}
              </button>
              <span className={rule.enabled ? "text-gray-700" : "text-gray-400"}>
                {rule.field} <span className="font-medium">{rule.operator.replace("_", " ")}</span> "{rule.value}"
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function EmailDesigner({
  templates,
  selectedTemplateId,
  onSelectTemplate,
  onUpdateTemplate,
  onCreateTemplate,
}: EmailDesignerProps) {
  const [previewMode, setPreviewMode] = useState(false);
  const selected = templates.find((t) => t.id === selectedTemplateId) ?? null;

  const handleCreate = () => {
    const newTemplate: EmailTemplate = {
      id: `et-${Date.now()}`,
      subject: "New Email Subject",
      preheader: "Preview text goes here",
      blocks: [
        { id: generateId(), type: "header", content: "Hello, {{first_name}}!" },
        { id: generateId(), type: "text", content: "Start writing your email content here..." },
        { id: generateId(), type: "button", content: "Click Here", style: { backgroundColor: "#ff7a59", color: "#ffffff", borderRadius: "6px" } },
      ],
      segmentation: [],
      lastModified: new Date().toISOString(),
      author: "You",
      status: "draft",
    };
    onCreateTemplate(newTemplate);
  };

  const addBlock = (type: ContentBlock["type"]) => {
    if (!selected) return;
    const defaults: Record<ContentBlock["type"], string> = {
      header: "New Heading",
      text: "New paragraph text...",
      image: "",
      button: "Button Text",
      divider: "",
      spacer: "",
    };
    const newBlock: ContentBlock = {
      id: generateId(),
      type,
      content: defaults[type],
      ...(type === "button"
        ? { style: { backgroundColor: "#ff7a59", color: "#ffffff", borderRadius: "6px" } }
        : {}),
    };
    onUpdateTemplate({
      ...selected,
      blocks: [...selected.blocks, newBlock],
      lastModified: new Date().toISOString(),
    });
  };

  const statusColors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-600",
    ready: "bg-green-100 text-green-700",
    sent: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="p-6 text-gray-900 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Email Designer</h1>
          <p className="text-sm text-gray-500 mt-0.5">{templates.length} templates</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> New Template
        </button>
      </div>

      <div className="flex-1 flex gap-5 overflow-hidden min-h-0">
        {/* Template list */}
        <div className="w-72 shrink-0 overflow-y-auto space-y-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                onSelectTemplate(t.id);
                setPreviewMode(false);
              }}
              className={`w-full text-left px-3.5 py-3 rounded-lg border transition-colors ${
                selected?.id === t.id
                  ? "bg-orange-50 border-orange-300"
                  : "bg-white border-gray-100 hover:border-orange-200"
              }`}
            >
              <p className="text-sm font-medium text-gray-800 truncate">{t.subject}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColors[t.status]}`}>
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
                <span className="text-[10px] text-gray-400">{formatDate(t.lastModified)}</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{t.author} · {t.blocks.length} blocks</p>
            </button>
          ))}
        </div>

        {/* Editor / Preview */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <FileText className="w-10 h-10 mb-3" />
              <p className="text-sm">Select a template to edit</p>
            </div>
          ) : previewMode ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">Preview</h2>
                <button
                  onClick={() => setPreviewMode(false)}
                  className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Back to Editor
                </button>
              </div>
              <EmailPreview template={selected} />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">Editing</h2>
                <button
                  onClick={() => setPreviewMode(true)}
                  className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
              </div>

              {/* Subject & Preheader */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500">Subject Line</label>
                  <input
                    type="text"
                    value={selected.subject}
                    onChange={(e) =>
                      onUpdateTemplate({
                        ...selected,
                        subject: e.target.value,
                        lastModified: new Date().toISOString(),
                      })
                    }
                    className="w-full mt-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Preheader Text</label>
                  <input
                    type="text"
                    value={selected.preheader}
                    onChange={(e) =>
                      onUpdateTemplate({
                        ...selected,
                        preheader: e.target.value,
                        lastModified: new Date().toISOString(),
                      })
                    }
                    className="w-full mt-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Content blocks */}
              <div className="space-y-2">
                {selected.blocks.map((block, idx) => (
                  <BlockEditor
                    key={block.id}
                    block={block}
                    onUpdate={(updated) =>
                      onUpdateTemplate({
                        ...selected,
                        blocks: selected.blocks.map((b) => (b.id === updated.id ? updated : b)),
                        lastModified: new Date().toISOString(),
                      })
                    }
                    onDelete={() =>
                      onUpdateTemplate({
                        ...selected,
                        blocks: selected.blocks.filter((b) => b.id !== block.id),
                        lastModified: new Date().toISOString(),
                      })
                    }
                    onMoveUp={() => {
                      if (idx === 0) return;
                      const blocks = [...selected.blocks];
                      [blocks[idx - 1], blocks[idx]] = [blocks[idx], blocks[idx - 1]];
                      onUpdateTemplate({ ...selected, blocks, lastModified: new Date().toISOString() });
                    }}
                    onMoveDown={() => {
                      if (idx === selected.blocks.length - 1) return;
                      const blocks = [...selected.blocks];
                      [blocks[idx], blocks[idx + 1]] = [blocks[idx + 1], blocks[idx]];
                      onUpdateTemplate({ ...selected, blocks, lastModified: new Date().toISOString() });
                    }}
                  />
                ))}
              </div>

              {/* Add block */}
              <div className="flex flex-wrap gap-1.5">
                {(["header", "text", "image", "button", "divider", "spacer"] as const).map((type) => {
                  const Icon = blockTypeIcons[type];
                  return (
                    <button
                      key={type}
                      onClick={() => addBlock(type)}
                      className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-white border border-gray-200 rounded px-2.5 py-1.5 hover:border-orange-300 hover:text-orange-600 transition-colors"
                    >
                      <Icon className="w-3 h-3" /> {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  );
                })}
              </div>

              {/* Segmentation */}
              <SegmentEditor
                rules={selected.segmentation}
                onUpdate={(rules) =>
                  onUpdateTemplate({
                    ...selected,
                    segmentation: rules,
                    lastModified: new Date().toISOString(),
                  })
                }
              />

              {/* Status toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                {(["draft", "ready", "sent"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      onUpdateTemplate({
                        ...selected,
                        status: s,
                        lastModified: new Date().toISOString(),
                      })
                    }
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      selected.status === s
                        ? statusColors[s] + " border-transparent"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
