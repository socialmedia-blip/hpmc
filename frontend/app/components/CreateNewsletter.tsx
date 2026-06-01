"use client";

import { X, ImageIcon } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateNewsletterModal({ onClose, onSuccess }: Props) {
  const [subject, setSubject] = useState("");

  const [content, setContent] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !content.trim()) {
      alert("Subject and content are required");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("subject", subject);

      formData.append("content", content);

      files.forEach((file) => formData.append("attachments", file));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/newsletter`,
        {
          method: "POST",
          body: formData,
        },
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      onSuccess();
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to send newsletter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div
        className="
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-2xl
          w-full max-w-4xl
          shadow-2xl
          max-h-[95vh]
          overflow-hidden
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[var(--border)]">
          <div>
            <h2 className="font-serif text-2xl text-[var(--text-primary)]">
              Create Newsletter
            </h2>

            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Write and send to all subscribers
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--primary)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Subject */}
          <section>
            <label className="block text-xs uppercase tracking-[2px] text-[var(--text-secondary)] mb-3">
              Subject
            </label>

            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Newsletter subject"
              className="
                w-full h-12 px-4
                border border-[var(--border)]
                bg-[var(--card)]
                text-[var(--text-primary)]
                outline-none
                focus:border-[var(--primary)]
              "
            />
          </section>

          {/* Editor */}
          <section>
            <label className="block text-xs uppercase tracking-[2px] text-[var(--text-secondary)] mb-3">
              Newsletter Content
            </label>

            <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--card)]">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write newsletter content here..."
                className="newsletter-editor"
                modules={{
                  toolbar: [
                    [
                      {
                        header: [1, 2, 3, false],
                      },
                    ],
                    ["bold", "italic", "underline"],
                    [
                      {
                        list: "ordered",
                      },
                      {
                        list: "bullet",
                      },
                    ],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </section>

          {/* Upload */}
          <section>
            <label className="block text-xs uppercase tracking-[2px] text-[var(--text-secondary)] mb-3">
              Attachments
            </label>

            <label
              htmlFor="newsletter-files"
              className="
                flex flex-col items-center justify-center
                h-40
                border-2 border-dashed border-[var(--border)]
                rounded-2xl
                bg-[var(--bg-secondary)]
                cursor-pointer
                hover:border-[var(--primary)]
                transition
              "
            >
              <ImageIcon
                size={26}
                className="text-[var(--text-secondary)] mb-3"
              />

              <p className="text-sm text-[var(--text-light)]">
                Click to upload files
              </p>

              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Images or documents
              </p>

              <input
                id="newsletter-files"
                type="file"
                multiple
                className="hidden"
                onChange={(e) =>
                  setFiles(e.target.files ? Array.from(e.target.files) : [])
                }
              />
            </label>

            {/* Files */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, i) => (
                  <p key={i} className="text-sm text-[var(--text-light)]">
                    • {file.name}
                  </p>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              h-11 px-6
              border border-[var(--border)]
              text-[var(--text-light)]
              hover:border-[var(--primary)]
              hover:text-[var(--primary)]
            "
          >
            Cancel
          </button>

          <button onClick={handleSubmit}>
            {loading ? "Sending..." : "Send Newsletter"}
          </button>
        </div>
      </div>
    </div>
  );
}
