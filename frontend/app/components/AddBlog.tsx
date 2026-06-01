"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ImageIcon, X } from "lucide-react";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags?: string;
  coverImage?: string;
  coverImageAlt?: string;
  faqs?: { question: string; answer: string }[];
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  existingBlog?: BlogPost | null;
}

const AddBlog = ({ onClose, onSuccess, existingBlog = null }: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    tags: "",
    coverImageAlt: "",
    coverImage: null as File | null,
  });
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const [preview, setPreview] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);

  /* Load Existing */
  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        slug: existingBlog.slug,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        author: existingBlog.author,
        tags: existingBlog.tags || "",
        coverImageAlt: existingBlog.coverImageAlt || "",
        coverImage: null,
      });
      if (existingBlog?.faqs?.length) {
        setFaqs(existingBlog.faqs);
      }

      if (existingBlog.coverImage) {
        setPreview(existingBlog.coverImage);
      }
    }
  }, [existingBlog]);

  /* Input */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "title" && !existingBlog) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: autoSlug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated.length ? updated : [{ question: "", answer: "" }]);
  };

  /* Image */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];

      setFormData((prev) => ({
        ...prev,
        coverImage: file,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  /* Sanitize */
  const sanitizeHtml = (html: string) => {
    return html
      .replace(/&nbsp;/g, " ")
      .replace(/<wbr\s*\/?>/gi, "")
      .trim();
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);

      const blogData = new FormData();

      const cleanedContent = sanitizeHtml(formData.content);

      Object.entries({
        ...formData,
        content: cleanedContent,
      }).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          blogData.append(key, value as any);
        }
      });
      blogData.append("faqs", JSON.stringify(faqs));

      const res = await fetch(
        existingBlog
          ? `${process.env.NEXT_PUBLIC_API_BASE}/blog/${existingBlog.slug}`
          : `${process.env.NEXT_PUBLIC_API_BASE}/blog/add`,
        {
          method: existingBlog ? "PUT" : "POST",

          body: blogData,
        },
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      onSuccess();
      onClose();
    } catch {
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  /* Editor */
  const quillModules = {
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
      ["blockquote"],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "blockquote",
    "link",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div
        className="
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-2xl
          w-full max-w-4xl
          shadow-2xl
          flex flex-col
          max-h-[95vh]
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex justify-between items-start px-6 py-5 border-b border-[var(--border)]">
          <div>
            <h2 className="font-serif text-2xl text-[var(--text-primary)]">
              {existingBlog ? "Edit Blog" : "Create Blog"}
            </h2>

            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Manage blog content and SEO
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--primary)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-8"
        >
          {/* Basic */}
          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-[2px] text-[var(--text-secondary)]">
              Basic Information
            </h3>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog title"
              required
              className="
                w-full h-12 px-4
                border border-[var(--border)]
                outline-none
                focus:border-[var(--primary)]
              "
            />

            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Slug"
              required
              className="
                w-full h-12 px-4
                border border-[var(--border)]
                outline-none
                focus:border-[var(--primary)]
              "
            />

            <textarea
              rows={3}
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Meta description"
              required
              className="
                w-full p-4
                border border-[var(--border)]
                outline-none
                resize-none
                focus:border-[var(--primary)]
              "
            />
          </section>

          {/* Content */}
          <section>
            <h3 className="text-xs uppercase tracking-[2px] text-[var(--text-secondary)] mb-3">
              Blog Content
            </h3>

            <div className="border border-[var(--border)] rounded-2xl overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: value,
                  }))
                }
                modules={quillModules}
                formats={quillFormats}
                className="newsletter-editor"
              />
            </div>
          </section>

          {/* SEO */}
          <section className="grid md:grid-cols-2 gap-4">
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              required
              className="
                h-12 px-4
                border border-[var(--border)]
                outline-none
              "
            />

            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags"
              className="
                h-12 px-4
                border border-[var(--border)]
                outline-none
              "
            />

            <input
              name="coverImageAlt"
              value={formData.coverImageAlt}
              onChange={handleChange}
              placeholder="Cover image alt text"
              className="
                md:col-span-2
                h-12 px-4
                border border-[var(--border)]
                outline-none
              "
            />
          </section>

          {/* Image */}
          <section>
            <h3 className="text-xs uppercase tracking-[2px] text-[var(--text-secondary)] mb-3">
              Cover Image
            </h3>

            <label
              htmlFor="cover-image"
              className="
                flex flex-col items-center justify-center
                h-48
                border-2 border-dashed border-[var(--border)]
                rounded-2xl
                bg-[var(--muted)]
                cursor-pointer
                hover:border-[var(--primary)]
                transition
              "
            >
              {preview ? (
                <img
                  src={preview}
                  className="max-h-40 object-cover rounded-xl"
                />
              ) : (
                <>
                  <ImageIcon className="text-[var(--text-secondary)] mb-2" />

                  <p className="text-sm text-[var(--text-light)]">
                    Upload cover image
                  </p>
                </>
              )}

              <input
                id="cover-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!existingBlog}
                className="hidden"
              />
            </label>
          </section>

          {/* FAQ SECTION */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs uppercase tracking-[2px] text-[var(--text-secondary)]">
                FAQs
              </h3>

              <button
                type="button"
                onClick={addFaq}
                className="text-sm text-[var(--primary)]"
              >
                + Add FAQ
              </button>
            </div>

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[var(--border)] rounded-xl p-4 space-y-3 "
              >
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  className="w-full h-11 px-3 border border-[var(--border)] outline-none"
                />

                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  className="w-full p-3 border border-[var(--border)] outline-none resize-none"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-xs text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Footer */}
          <div className="border-t border-[var(--border)] pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                h-11 px-6
                border border-[var(--border)]
                text-[var(--text-light)]
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="
    h-11 px-6
    rounded-xl
    bg-[var(--primary)]
    text-white
    font-medium
    transition-all
    hover:opacity-90
    disabled:opacity-70
    disabled:cursor-not-allowed
  "
            >
              {submitting
                ? existingBlog
                  ? "Updating..."
                  : "Publishing..."
                : existingBlog
                  ? "Update Blog"
                  : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
