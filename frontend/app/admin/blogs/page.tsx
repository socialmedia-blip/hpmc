"use client";

import { useEffect, useState } from "react";

import { Edit, Trash2, Code, ImageIcon, Plus, FileText, X } from "lucide-react";

import Fuse from "fuse.js";
import { formatHtml } from "@/app/components/utils/formatHtml";
import AddBlog from "@/app/components/AddBlog";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  datePublished: string;
  slug: string;
  coverImage?: string;
}

export default function AdminBlogsPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  /* Modals */
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const [htmlContent, setHtmlContent] = useState("");

  const [showHtmlEditor, setShowHtmlEditor] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  /* Fetch */
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`,
      );

      const data = await res.json();

      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* Search */
  const fuse = new Fuse(blogs, {
    keys: ["title", "author"],
    threshold: 0.3,
    ignoreLocation: true,
  });

  const filteredBlogs =
    searchQuery.trim() === ""
      ? blogs
      : fuse.search(searchQuery).map((r) => r.item);

  /* Pagination */
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* Update Image */
  const handleUpdateImage = async () => {
    if (!selectedImage || !editingSlug) return;

    const formData = new FormData();

    formData.append("coverImage", selectedImage);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/blog/${editingSlug}/image`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      setShowImageModal(false);

      setSelectedImage(null);

      fetchBlogs();
    } catch {
      alert("Failed to update image");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="uppercase tracking-[4px] text-xs text-[var(--primary)] mb-2">
            Admin Panel
          </p>

          <h1 className="font-serif text-4xl text-[var(--text-primary)]">
            Blogs
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search blogs..."
            className="
    h-11 px-4 w-full md:w-72
    rounded-xl
    border border-[var(--border)]
    bg-[var(--background)]
    text-[var(--text-primary)]
    placeholder:text-[var(--text-light)]
    outline-none
    transition-all
    focus:border-[var(--primary)]
    focus:ring-2
    focus:ring-[var(--primary)]/20
  "
          />

          {/* Add */}
          <button
            onClick={() => {
              setEditingBlog(null);
              setShowAddModal(true);
            }}
            className="
    h-11 px-6 rounded-xl
    bg-[var(--primary)]
    text-white
    flex items-center gap-2
    font-medium
    transition-all
    hover:opacity-90
  "
          >
            <Plus size={16} />
            Add Blog
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin mb-4" />

          <p className="text-[var(--text-secondary)]">Loading blogs...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredBlogs.length === 0 && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center">
          <FileText size={32} className="mx-auto text-[var(--muted)] mb-4" />

          <h3 className="font-serif text-2xl text-[var(--text-primary)]">
            No Blogs Found
          </h3>
        </div>
      )}

      {/* Table */}
      {!loading && filteredBlogs.length > 0 && (
        <>
          <div className="overflow-x-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <table className="w-full">
              <thead className="bg-[var(--muted)]">
                <tr>
                  <th className="px-5 py-4 text-left">Title</th>

                  <th className="px-5 py-4 text-left">Content</th>

                  <th className="px-5 py-4 text-left">Author</th>

                  <th className="px-5 py-4 text-left">Published</th>

                  <th className="px-5 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedBlogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-t border-[var(--border)] hover:bg-[var(--muted)]"
                  >
                    <td className="px-5 py-4 font-medium text-[var(--text-primary)]">
                      {blog.title}
                    </td>

                    <td className="px-5 py-4 max-w-[280px]">
                      <div
                        className="line-clamp-3 text-[var(--text-secondary)]"
                        dangerouslySetInnerHTML={{
                          __html: blog.content,
                        }}
                      />
                    </td>

                    <td className="px-5 py-4 text-[var(--text-secondary)]">
                      {blog.author}
                    </td>

                    <td className="px-5 py-4 text-[var(--text-secondary)]">
                      {new Date(blog.datePublished).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setEditingBlog(blog);

                            setShowAddModal(true);
                          }}
                          className="text-blue-500"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => {
                            setEditingSlug(blog.slug);

                            setShowImageModal(true);
                          }}
                          className="text-purple-500"
                        >
                          <ImageIcon size={16} />
                        </button>

                        <button
                          onClick={async () => {
                            setEditingSlug(blog.slug);

                            setHtmlContent(await formatHtml(blog.content));

                            setShowHtmlEditor(true);
                          }}
                          className="text-amber-500"
                        >
                          <Code size={16} />
                        </button>

                        <button
                          onClick={async () => {
                            if (!confirm("Delete this blog?")) return;

                            await fetch(
                              `${process.env.NEXT_PUBLIC_API_BASE}/blog/${blog.slug}`,
                              {
                                method: "DELETE",
                              },
                            );

                            fetchBlogs();
                          }}
                          className="text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end mt-8 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="h-10 px-5 border border-[var(--border)] disabled:opacity-40"
              >
                Prev
              </button>

              <div className="h-10 px-5 flex items-center">{currentPage}</div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="h-10 px-5 border border-[var(--border)] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Add Blog */}
      {showAddModal && (
        <AddBlog
          onClose={() => {
            setShowAddModal(false);

            setEditingBlog(null);
          }}
          onSuccess={fetchBlogs}
          existingBlog={editingBlog}
        />
      )}

      {/* HTML Modal */}
      {showHtmlEditor && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-4xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--border)]">
              <h2 className="font-serif text-2xl">HTML Editor</h2>

              <button onClick={() => setShowHtmlEditor(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="w-full h-80 border border-[var(--border)] p-4 font-mono outline-none"
              />
            </div>

            <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3">
              <button
                onClick={() => setShowHtmlEditor(false)}
                className="h-11 px-6 border border-[var(--border)]"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!editingSlug) return;

                  await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE}/blog/${editingSlug}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        content: htmlContent,
                      }),
                    },
                  );

                  setShowHtmlEditor(false);
                  fetchBlogs();
                }}
                className="
    h-11 px-6 rounded-xl
    bg-[var(--primary)]
    text-white
    font-medium
    hover:opacity-90
    transition-all
  "
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border)]">
              <h2 className="font-serif text-2xl">Update Image</h2>
            </div>

            <div className="p-6">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                className="w-full"
              />
            </div>

            <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3">
              <button
                onClick={() => setShowImageModal(false)}
                className="h-11 px-6 border border-[var(--border)]"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateImage}
                className="h-11 px-6 bg-[var(--primary)] text-[var(--card)] border border-[var(--border)]"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
