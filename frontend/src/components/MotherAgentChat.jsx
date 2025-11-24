import React, { useEffect, useRef, useState } from "react";

// 🔹 مقادیر واقعی
const API_URL = "https://mlklwxbqakyovoqxaccx.supabase.co/functions/v1/agent_mother";
const AUTH_ID = "alirezasaeeidi3542-crypto"; // مقدار واقعی auth_id یا user_id در Supabase

export default function MotherAgentChat() {
  const [messages, setMessages] = useState([
    { id: "m1", role: "agent", text: "سلام! من Mother Agent Dr.saeeidi هستم — چطور می‌توانم کمکتان کنم؟" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setError(null);
    const userMsg = { id: Date.now().toString(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, auth_id: AUTH_ID })
      });

      if (!res.ok) throw new Error("شبکه پاسخ نداد");
      const data = await res.json();
      const reply = data.reply || "متأسفم، پاسخ دریافت نشد.";

      const agentMsg = { id: (Date.now()+1).toString(), role: "agent", text: reply };
      setMessages(prev => [...prev, agentMsg]);

    } catch (err) {
      console.error(err);
      setError(err.message || "خطا");
      setMessages(prev => [...prev, { id: (Date.now()+2).toString(), role: "agent", text: "متأسفم، خطا رخ داد." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* Left panel - Info & Branding */}
        <div className="hidden md:flex flex-col gap-4 p-6 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white md:w-1/3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">MA</div>
            <div>
              <h2 className="text-lg font-semibold">Mother Agent Dr.saeeidi</h2>
              <p className="text-sm text-indigo-100/90">سیستم هوشمند مدیریت و پشتیبانی فروش</p>
            </div>
          </div>

          <div className="mt-2 text-sm leading-relaxed">
            <p className="mb-2">این ایجنت با تمرکز روی سرعت، دقت و یکپارچگی با Supabase طراحی شده است.</p>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>پاسخ‌های سریع و دقیق</li>
              <li>حفظ حریم خصوصی کاربران</li>
              <li>قابل توسعه برای ایجنت‌های فرعی</li>
            </ul>
          </div>

          <div className="mt-auto text-xs opacity-90">
            <p>نسخه: <span className="font-medium">Mother Agent Dr.saeeidi — v0.1</span></p>
            <p>بهینه‌شده برای موبایل و دسکتاپ</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold">MA</div>
              <div>
                <h3 className="text-sm font-semibold">Mother Agent Dr.saeeidi</h3>
                <p className="text-xs text-gray-500">پاسخ‌دهی هوشمند و فوری</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={listRef} className="p-4 overflow-y-auto flex-1 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-2xl mx-auto flex flex-col gap-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] break-words ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none'}`}>
                    <div className="text-sm leading-relaxed">{msg.text}</div>
                    <div className="text-[10px] opacity-60 mt-1 text-right">{msg.role === 'user' ? 'شما' : 'Mother Agent'}</div>
                  </div>
                </div>
              ))}
              {loading && <div className="text-sm text-gray-500">در حال تایپ...</div>}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            {error && <div className="mb-2 text-sm text-red-600">خطا: {error}</div>}
            <div className="flex gap-3 items-center">
              <input
                placeholder="پیام خود را اینجا بنویسید..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button onClick={sendMessage} disabled={loading} className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
                {loading ? 'در حال ارسال...' : 'ارسال'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
