import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, RefreshCw, Database, Search, AlertCircle, Download } from 'lucide-react';
import { Input } from "@/components/ui/input";

type MessageStatus = 'new' | 'read' | 'contacted';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  projecttype: string;
  status?: MessageStatus;
  created_at: string;
}

const ADMIN_SECRET = 'admin123';

function toCsv(rows: Record<string, any>[]) {
  const headers = Object.keys(rows[0] ?? {});
  const escape = (v: any) => {
    const s = String(v ?? '');
    const needsQuotes = /[",\n\r]/.test(s);
    const escaped = s.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map(h => escape(row[h])).join(','));
  }
  return lines.join('\n');
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      setLocation('/admin');
      return;
    }

    fetchMessages();
  }, [setLocation]);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/messages?secret=${ADMIN_SECRET}`);
      const contentType = response.headers.get('content-type') || '';
      const raw = await response.text();
      const data = contentType.includes('application/json') ? JSON.parse(raw) : null;

      if (!response.ok) {
        throw new Error(data?.error || raw || 'Failed to fetch messages');
      }

      if (!data) {
        throw new Error(raw || 'Unexpected non-JSON response from server');
      }

      setMessages(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load data from Neon DB');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: MessageStatus) => {
    setUpdatingId(id);
    setError(null);

    try {
      const response = await fetch(`/api/messages?secret=${ADMIN_SECRET}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });

      const contentType = response.headers.get('content-type') || '';
      const raw = await response.text();
      const data = contentType.includes('application/json') ? JSON.parse(raw) : null;

      if (!response.ok) {
        throw new Error(data?.error || raw || 'Failed to update status');
      }

      if (!data) {
        throw new Error(raw || 'Unexpected non-JSON response from server');
      }

      setMessages(prev => prev.map(m => (m.id === id ? { ...m, status: data.status } : m)));
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setLocation('/admin');
  };

  const filteredMessages = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(msg =>
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.phone?.includes(searchTerm)
    );
  }, [messages, searchTerm]);

  const handleExport = () => {
    const rows = filteredMessages.map(m => ({
      id: m.id,
      name: m.name,
      email: m.email,
      phone: m.phone,
      projectType: m.projecttype || '',
      status: m.status || 'new',
      message: m.message,
      created_at: m.created_at
    }));

    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sparx-contact-messages-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const statusTone = (status: MessageStatus) => {
    if (status === 'new') return 'bg-red-50 text-red-700 border-red-200';
    if (status === 'read') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-green-50 text-green-700 border-green-200';
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Top Bar */}
      <div className="bg-zinc-900 text-white p-4 border-b border-zinc-800 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-none flex items-center justify-center font-bold font-display text-lg">SE</div>
          <div>
            <h1 className="font-bold uppercase tracking-wider text-sm">Sparx Admin</h1>
            <p className="text-xs text-zinc-500">Database Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">
            <Database size={12} className="text-green-500" />
            <span>Connected to: Neon DB</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Messages Inbox</h2>
            <p className="text-zinc-500">Manage inquiries from the website contact form.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchMessages} disabled={loading}>
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
            <Button variant="outline" onClick={handleExport} disabled={loading || filteredMessages.length === 0}>
              <Download size={16} className="mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 border border-red-200 rounded flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <Card className="border-zinc-200 shadow-sm rounded-none">
          <CardHeader className="border-b border-zinc-100 bg-white">
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <CardTitle>Recent Messages</CardTitle>
              <div className="relative w-64 max-w-full">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9 bg-zinc-50 border-zinc-200 focus:ring-secondary"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Project Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Contact Info</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-zinc-500">
                      Loading data from Neon DB...
                    </TableCell>
                  </TableRow>
                ) : filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-zinc-500">
                      No messages found in database.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((msg) => {
                    const s = (msg.status || 'new') as MessageStatus;
                    return (
                      <TableRow key={msg.id} className="group hover:bg-blue-50/50 transition-colors">
                        <TableCell className="font-mono text-xs text-zinc-500">#{msg.id}</TableCell>
                        <TableCell className="font-medium text-zinc-900">{msg.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs font-normal border-zinc-300 text-zinc-600 bg-white">
                            {msg.projecttype || 'General'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <select
                            value={s}
                            disabled={updatingId === msg.id}
                            onChange={(e) => updateStatus(msg.id, e.target.value as MessageStatus)}
                            className={`text-xs border px-2 py-1 bg-white ${statusTone(s)} disabled:opacity-60`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="contacted">Contacted</option>
                          </select>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col text-xs text-zinc-600">
                            <span>{msg.email}</span>
                            <span className="font-mono">{msg.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-zinc-600 group-hover:text-zinc-900" title={msg.message}>
                          {msg.message}
                        </TableCell>
                        <TableCell className="text-right text-xs text-zinc-500 whitespace-nowrap">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
