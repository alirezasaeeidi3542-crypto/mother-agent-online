import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Mother Agent Dashboard</h1>
      <p>سیستم مادر و ایجنت‌ها آنلاین هستند</p>
      <Link href="/agents">مشاهده ایجنت‌ها</Link>
    </div>
  )
}
