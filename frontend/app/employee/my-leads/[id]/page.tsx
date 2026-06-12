"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, RefreshCw, Phone, Mail, MessageCircle } from "lucide-react";

interface Note {
  text: string;
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

interface Lead {
  _id: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  products?: string[];
  message?: string;
  leadStatus: string;
  createdAt: string;
  assignedTo?: {
    name: string;
    email: string;
  };
  notes: Note[];
}

export default function LeadDetailsPage() {
  const { id } = useParams();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("new");

  const fetchLead = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("employeeToken");

      const res = await fetch(`${API_BASE}/employee/${id}/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setLead(data.lead);
        setStatus(data.lead.leadStatus || "new");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchLead();
  }, [id]);

  const updateStatus = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("employeeToken");

      await fetch(`${API_BASE}/employee/${id}/lead-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leadStatus: status,
        }),
      });

      fetchLead();
    } finally {
      setSaving(false);
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;

    try {
      setSaving(true);

      const token = localStorage.getItem("employeeToken");

      await fetch(`${API_BASE}/employee/${id}/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: note,
        }),
      });

      setNote("");
      fetchLead();
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      </div>
    );
  }

  if (!lead) return <div>Lead not found</div>;

  return (
    <section className="pb-20">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/employee/my-leads" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          Back
        </Link>

        <button
          onClick={fetchLead}
          className="rounded-xl bg-[var(--primary)] px-4 py-2 text-white"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="rounded-3xl border p-8">
        <h1 className="text-3xl font-bold">{lead.name}</h1>
        <p className="mt-2">{lead.companyName}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`tel:${lead.phone}`} className="rounded-xl border px-4 py-2">
            <Phone size={16} />
          </a>

          <a
            href={`mailto:${lead.email}`}
            className="rounded-xl border px-4 py-2"
          >
            <Mail size={16} />
          </a>

          <a
            href={`https://wa.me/${lead.phone}`}
            target="_blank"
            className="rounded-xl border px-4 py-2"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border p-6">
          <h2 className="mb-4 text-xl font-bold">Lead Information</h2>

          <div className="space-y-3">
            <p>
              <strong>Email:</strong> {lead.email}
            </p>
            <p>
              <strong>Phone:</strong> {lead.phone}
            </p>
            <p>
              <strong>Company:</strong> {lead.companyName}
            </p>
            <p>
              <strong>Status:</strong> {lead.leadStatus}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border p-6">
          <h2 className="mb-4 text-xl font-bold">Update Status</h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="follow-up">Follow Up</option>
            <option value="qualified">Qualified</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>

          <button
            onClick={updateStatus}
            disabled={saving}
            className="mt-4 rounded-xl bg-[var(--primary)] px-5 py-3 text-white"
          >
            Update Status
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border p-6">
        <h2 className="mb-4 text-xl font-bold">Add Note</h2>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border p-3"
        />

        <button
          onClick={addNote}
          className="mt-4 rounded-xl bg-[var(--primary)] px-5 py-3 text-white"
        >
          Save Note
        </button>
      </div>

      <div className="mt-6 rounded-3xl border p-6">
        <h2 className="mb-4 text-xl font-bold">Notes Timeline</h2>

        <div className="space-y-4">
          {lead.notes?.map((n, i) => (
            <div key={i} className="rounded-2xl border p-4">
              <div className="font-semibold">
                {n.createdBy?.name || "Employee"}
              </div>
              <p className="mt-2">{n.text}</p>
              <p className="mt-2 text-xs opacity-70">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
