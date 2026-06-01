"use client";

import { useEffect, useState } from "react";
import { User2, Users } from "lucide-react";
import { FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    leads: 0,
    clients: 0,
    subscribers: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/lead`).then((r) => r.json()),

      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/client`).then((r) => r.json()),

      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/subscribers`).then((r) =>
        r.json(),
      ),
    ])
      .then(([leads, clients, subscribers]) => {
        setCounts({
          leads: Array.isArray(leads) ? leads.length : 0,

          clients: typeof clients === "object" ? clients.count : 0,

          subscribers: typeof subscribers === "object" ? subscribers.count : 0,
        });
      })
      .catch((error) => {
        console.error("Dashboard Error:", error);
      });
  }, []);

  const cards = [
    {
      title: "Leads",
      icon: <FaUsers />,
      count: counts.leads,
    },
    // {
    //   title: "Clients",
    //   icon: <Users size={34} />,
    //   count: counts.clients,
    // },
    {
      title: "Subscribers",
      icon: <User2 size={34} />,
      count: counts.subscribers,
    },
  ];

  return (
    <section className="px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <p className="uppercase tracking-[4px] text-xs text-[var(--primary)] mb-3">
          Admin Panel
        </p>

        <h2 className="font-serif text-4xl text-[var(--text)]">
          Dashboard Overview
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({
  title,
  icon,
  count,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
}) => {
  return (
    <div
      className="
        bg-[var(--white)]
        border border-[var(--border)]
        rounded-2xl
        p-8
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* Icon */}
      <div
        className="
          h-16 w-16
          rounded-2xl
          bg-[var(--bg-secondary)]
          text-[var(--primary)]
          flex items-center justify-center
          text-2xl
          mb-6
        "
      >
        {icon}
      </div>

      {/* Title */}
      <p className="text-[var(--text-light)] text-sm mb-2">{title}</p>

      {/* Count */}
      <h3 className="font-serif text-4xl text-[var(--text)]">{count}</h3>
    </div>
  );
};

export default Dashboard;
