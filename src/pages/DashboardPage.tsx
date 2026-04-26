import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { itemsApi } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Item {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [creating, setCreating] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/login");
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    itemsApi.list().then((res) => {
      if (res.success && res.data) setItems(res.data);
      setFetching(false);
    });
  }, [isAuthenticated]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setCreating(true);
    const res = await itemsApi.create(form);
    if (res.success && res.data) {
      setItems((prev) => [res.data!, ...prev]);
      setForm({ name: "", description: "" });
    }
    setCreating(false);
  };

  const handleDelete = async (id: string) => {
    await itemsApi.remove(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-surface-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Signed in as <span className="text-brand-600 dark:text-brand-400">{user?.email}</span>
          </p>
        </div>

        {/* API Health */}
        <ApiHealthCard />

        {/* Create Item */}
        <div className="bg-white dark:bg-surface-dark-secondary rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Create Item</h2>
          <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Item name…"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="flex-1"
            />
            <Input
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="flex-1"
            />
            <Button type="submit" loading={creating} className="shrink-0">
              Add
            </Button>
          </form>
        </div>

        {/* Items List */}
        <div className="bg-white dark:bg-surface-dark-secondary rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white">Your Items</h2>
            <span className="text-sm text-slate-500">{items.length} total</span>
          </div>

          {fetching ? (
            <div className="py-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading…
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <p className="text-4xl mb-3">📦</p>
              <p>No items yet. Create one above.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((item) => (
                <li key={item.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-surface-secondary dark:hover:bg-surface-dark-tertiary transition-colors">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{item.name}</p>
                    {item.description && (
                      <p className="text-sm text-slate-500 truncate">{item.description}</p>
                    )}
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── API Health Sub-component ──────────────────────────────────────────────────
function ApiHealthCard() {
  const [status, setStatus] = useState<{ status: string; environment: string; uptime: number } | null>(null);

  useEffect(() => {
    fetch("/api/v1/health")
      .then((r) => r.json())
      .then((d) => setStatus(d.data))
      .catch(() => null);
  }, []);

  return (
    <div className="bg-white dark:bg-surface-dark-secondary rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6 shadow-sm flex items-center gap-4">
      <div className={`w-3 h-3 rounded-full ${status?.status === "ok" ? "bg-green-500 animate-pulse" : "bg-slate-300"}`} />
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          API Status:{" "}
          <span className={status?.status === "ok" ? "text-green-600 dark:text-green-400" : "text-slate-400"}>
            {status?.status ?? "checking…"}
          </span>
        </p>
        {status && (
          <p className="text-xs text-slate-400">
            env: {status.environment} · uptime: {status.uptime}s
          </p>
        )}
      </div>
    </div>
  );
}
