import { useState, useEffect } from 'react'
import './index.css'

/* =========================================================
   DATA
========================================================= */
const navItems = [
  { id: 'home',       label: 'หน้าแรก',       icon: '🏠' },
  { id: 'curriculum', label: 'หลักสูตร',       icon: '📚' },
  { id: 'staff',      label: 'คณาจารย์',       icon: '👨‍🏫' },
  { id: 'news',       label: 'ข่าวสาร',        icon: '📰' },
  { id: 'portfolio',  label: 'ผลงานนักศึกษา', icon: '🎨' },
  { id: 'downloads',  label: 'ดาวน์โหลด',     icon: '📥' },
  { id: 'contact',    label: 'ติดต่อเรา',      icon: '📬' },
]

const stats = [
  { value: '250+', label: 'นักศึกษา',        icon: '🎓', color: '#4f46e5', bg: '#ede9fe' },
  { value: '7',    label: 'คณาจารย์',        icon: '👨‍🏫', color: '#0891b2', bg: '#cffafe' },
  { value: '3',    label: 'สาขาวิชา',        icon: '💡', color: '#059669', bg: '#d1fae5' },
  { value: '95%',  label: 'อัตราการมีงานทำ', icon: '🚀', color: '#d97706', bg: '#fef3c7' },
]

const curriculumData = [
  {
    id: 'bcom', badge: 'ปวช.', icon: '💻',
    title: 'คอมพิวเตอร์ธุรกิจ', subtitle: 'Business Computer', duration: '3 ปี',
    color: '#4f46e5', bg: '#ede9fe',
    desc: 'เรียนรู้พื้นฐานด้านคอมพิวเตอร์ โปรแกรมสำนักงาน การพัฒนาเว็บไซต์ และระบบบัญชี เพื่อรองรับตลาดแรงงานยุคดิจิทัล',
    career: ['นักพัฒนาเว็บไซต์', 'เจ้าหน้าที่ IT', 'นักออกแบบกราฟิก', 'เจ้าหน้าที่บัญชี'],
    yearPlans: [
      { year: 'ปีที่ 1', subjects: ['พื้นฐานคอมพิวเตอร์', 'โปรแกรมสำนักงาน', 'คณิตศาสตร์ IT', 'ภาษาอังกฤษ'] },
      { year: 'ปีที่ 2', subjects: ['การพัฒนาเว็บไซต์', 'ฐานข้อมูล', 'กราฟิกดีไซน์', 'การตลาดดิจิทัล'] },
      { year: 'ปีที่ 3', subjects: ['โปรแกรมประยุกต์', 'ฝึกงาน', 'โครงงาน', 'วิชาชีพเฉพาะ'] },
    ],
  },
  {
    id: 'it', badge: 'ปวส.', icon: '🖥️',
    title: 'เทคโนโลยีสารสนเทศ', subtitle: 'Information Technology', duration: '2 ปี',
    color: '#0891b2', bg: '#cffafe',
    desc: 'ศึกษาด้านการพัฒนาระบบสารสนเทศ การจัดการฐานข้อมูล เครือข่ายคอมพิวเตอร์ และการวิเคราะห์ข้อมูล',
    career: ['นักพัฒนาซอฟต์แวร์', 'Database Admin', 'Network Admin', 'Data Analyst'],
    yearPlans: [
      { year: 'ปีที่ 1', subjects: ['พัฒนาระบบสารสนเทศ', 'เครือข่ายคอมพิวเตอร์', 'ฐานข้อมูลขั้นสูง', 'การวิเคราะห์ข้อมูล'] },
      { year: 'ปีที่ 2', subjects: ['AI & Machine Learning', 'Cloud Computing', 'โครงงานวิจัย', 'ฝึกสหกิจศึกษา'] },
    ],
  },
  {
    id: 'dm', badge: 'ปวส.', icon: '📊',
    title: 'การตลาดดิจิทัล', subtitle: 'Digital Marketing', duration: '2 ปี',
    color: '#059669', bg: '#d1fae5',
    desc: 'ผสมผสานความรู้ด้านการตลาดและเทคโนโลยี Social Media, E-Commerce และการวิเคราะห์ข้อมูลธุรกิจ',
    career: ['Digital Marketer', 'Content Creator', 'SEO Specialist', 'E-Commerce Manager'],
    yearPlans: [
      { year: 'ปีที่ 1', subjects: ['หลักการตลาดดิจิทัล', 'Social Media Marketing', 'Content Creation', 'E-Commerce'] },
      { year: 'ปีที่ 2', subjects: ['SEO & SEM', 'Data-Driven Marketing', 'โครงงานธุรกิจ', 'ฝึกสหกิจศึกษา'] },
    ],
  },
]

// ข้อมูลจริงจากป้ายทำเนียบบุคลากร
const staffData = [
  {
    name: 'นางสาววีระกา ศรีสุพัฒน์',
    title: 'หัวหน้าแผนกวิชา', role: 'ครู',
    subject: 'หัวหน้าแผนกวิชาคอมพิวเตอร์ธุรกิจ',
    initials: 'วก', email: 'weeraka@kptc.ac.th', phone: '055-711-291 ต่อ 101',
    expertise: ['การบริหารแผนก', 'คอมพิวเตอร์ธุรกิจ', 'IT Management'],
    color: '#4f46e5', bg: '#ede9fe', experience: '20+ ปี', isHead: true,
  },
  {
    name: 'นายนพดล สังข์น้อย',
    title: 'รองหัวหน้าแผนก', role: 'ครูชำนาญการ',
    subject: 'การพัฒนาระบบสารสนเทศ',
    initials: 'นพ', email: 'noppadon@kptc.ac.th', phone: '055-711-291 ต่อ 102',
    expertise: ['System Analysis', 'Database Design', 'Network'],
    color: '#0891b2', bg: '#cffafe', experience: '15+ ปี', isHead: false,
  },
  {
    name: 'นางสมพร โภคะรัตน์',
    title: 'ครูชำนาญการพิเศษ', role: 'ครูชำนาญการพิเศษ',
    subject: 'โปรแกรมสำนักงานและบัญชี',
    initials: 'สพ', email: 'somporn@kptc.ac.th', phone: '055-711-291 ต่อ 103',
    expertise: ['Microsoft Office', 'บัญชีคอมพิวเตอร์', 'โปรแกรมสำนักงาน'],
    color: '#7c3aed', bg: '#f3e8ff', experience: '18+ ปี', isHead: false,
  },
  {
    name: 'นายทวิภพ พินิจลิขิต',
    title: 'ครูชำนาญการ', role: 'ครูชำนาญการ',
    subject: 'การพัฒนาเว็บไซต์และโปรแกรม',
    initials: 'ทว', email: 'tawiphop@kptc.ac.th', phone: '055-711-291 ต่อ 104',
    expertise: ['Web Development', 'PHP', 'JavaScript'],
    color: '#059669', bg: '#d1fae5', experience: '12+ ปี', isHead: false,
  },
  {
    name: 'นายฐิติพงษ์ แก้วดี',
    title: 'ครู', role: 'ครู',
    subject: 'เครือข่ายคอมพิวเตอร์',
    initials: 'ฐต', email: 'thitipong@kptc.ac.th', phone: '055-711-291 ต่อ 105',
    expertise: ['Network', 'Cisco', 'Linux Server'],
    color: '#d97706', bg: '#fef3c7', experience: '8+ ปี', isHead: false,
  },
  {
    name: 'นายกันตพงศ์ แก้วนิล',
    title: 'ครูผู้ช่วย', role: 'ครูผู้ช่วย',
    subject: 'กราฟิกและมัลติมีเดีย',
    initials: 'กต', email: 'kantapong@kptc.ac.th', phone: '055-711-291 ต่อ 106',
    expertise: ['Photoshop', 'Illustrator', 'Multimedia'],
    color: '#dc2626', bg: '#fee2e2', experience: '4+ ปี', isHead: false,
  },
  {
    name: 'นางสาวอัจฉริยาน์ เดชสรคันธ์',
    title: 'ครูพิเศษ', role: 'ครูพิเศษ',
    subject: 'การตลาดดิจิทัล',
    initials: 'อจ', email: 'atchariyan@kptc.ac.th', phone: '055-711-291 ต่อ 107',
    expertise: ['Digital Marketing', 'Social Media', 'E-Commerce'],
    color: '#db2777', bg: '#fce7f3', experience: '3+ ปี', isHead: false,
  },
]

const newsData = [
  {
    id: 1, date: '15 ก.ค. 2568', hot: true, icon: '🏆',
    title: 'นักศึกษาคว้ารางวัลชนะเลิศ การแข่งขันพัฒนาแอพพลิเคชัน ระดับภาคเหนือ',
    category: 'ความสำเร็จ', catColor: '#059669', catBg: '#d1fae5',
    desc: 'ทีมนักศึกษาแผนกคอมพิวเตอร์ธุรกิจ คว้ารางวัลชนะเลิศ จากการแข่งขันพัฒนาแอพพลิเคชันมือถือ ระดับภาคเหนือ ประจำปี 2568',
  },
  {
    id: 2, date: '10 ก.ค. 2568', hot: false, icon: '📢',
    title: 'เปิดรับสมัครนักศึกษาใหม่ ประจำปีการศึกษา 2569 ตั้งแต่บัดนี้เป็นต้นไป',
    category: 'ประกาศ', catColor: '#4f46e5', catBg: '#ede9fe',
    desc: 'เปิดรับสมัครนักศึกษาใหม่ทุกระดับ ปวช. และ ปวส. สมัครออนไลน์หรือมาสมัครด้วยตนเองที่วิทยาลัย',
  },
  {
    id: 3, date: '5 ก.ค. 2568', hot: false, icon: '🏢',
    title: 'ศึกษาดูงาน บริษัทเทคโนโลยีชั้นนำในกรุงเทพมหานคร เสริมประสบการณ์จริง',
    category: 'กิจกรรม', catColor: '#d97706', catBg: '#fef3c7',
    desc: 'นักศึกษาชั้นปีที่ 3 เดินทางศึกษาดูงาน ณ บริษัทเทคโนโลยีชั้นนำ 5 แห่งในกรุงเทพมหานคร เสริมประสบการณ์จริงในการทำงาน',
  },
  {
    id: 4, date: '1 ก.ค. 2568', hot: false, icon: '🤖',
    title: 'อบรม AI และ Machine Learning สำหรับนักศึกษาชั้นปีที่ 3 โดยวิทยากรพิเศษ',
    category: 'อบรม', catColor: '#0891b2', catBg: '#cffafe',
    desc: 'การอบรมเชิงปฏิบัติการด้าน AI และ Machine Learning โดยวิทยากรผู้เชี่ยวชาญจากภาคอุตสาหกรรม',
  },
  {
    id: 5, date: '25 มิ.ย. 2568', hot: false, icon: '📝',
    title: 'การสอบวัดทักษะ Microsoft Office Specialist (MOS) ประจำภาคเรียน',
    category: 'ประกาศ', catColor: '#4f46e5', catBg: '#ede9fe',
    desc: 'กำหนดการสอบวัดทักษะ MOS ประจำภาคเรียน สำหรับนักศึกษาที่ผ่านการลงทะเบียนแล้ว',
  },
  {
    id: 6, date: '20 มิ.ย. 2568', hot: false, icon: '❤️',
    title: 'โครงการ "เด็กคอม สู่ชุมชน" สอนผู้สูงอายุใช้เทคโนโลยี',
    category: 'กิจกรรม', catColor: '#d97706', catBg: '#fef3c7',
    desc: 'นักศึกษาออกบริการวิชาการสู่ชุมชน สอนการใช้สมาร์ทโฟนและอินเทอร์เน็ตแก่ผู้สูงอายุในจังหวัดกำแพงเพชร',
  },
]

const portfolioData = [
  {
    id: 1, title: 'ระบบจัดการห้องสมุดออนไลน์', student: 'ทีม ByteForce', year: '2567',
    type: 'Web App', tech: ['React', 'Node.js', 'MySQL'], icon: '📚',
    color: '#4f46e5', bg: '#ede9fe', award: '🥇 รางวัลที่ 1 ระดับภาค',
    desc: 'ระบบจัดการห้องสมุดครบวงจร พร้อมระบบยืม-คืน และค้นหาหนังสือแบบ Real-time',
  },
  {
    id: 2, title: 'แอพติดตามสุขภาพ "HealthKPTC"', student: 'นายอภิชาติ บุญมา', year: '2567',
    type: 'Mobile App', tech: ['Flutter', 'Firebase', 'Python'], icon: '❤️',
    color: '#dc2626', bg: '#fee2e2', award: '🥈 รางวัลที่ 2 ระดับจังหวัด',
    desc: 'แอพพลิเคชันติดตามสุขภาพสำหรับนักศึกษา วัด BMI ติดตามอาหาร และออกกำลังกาย',
  },
  {
    id: 3, title: 'E-Commerce "ตลาดบ้านเรา"', student: 'ทีม LocalShop', year: '2567',
    type: 'E-Commerce', tech: ['Vue.js', 'Laravel', 'PostgreSQL'], icon: '🛒',
    color: '#059669', bg: '#d1fae5', award: '🏆 ชนะเลิศ ระดับภาคเหนือ',
    desc: 'แพลตฟอร์มช่วยเหลือผู้ประกอบการท้องถิ่นในจังหวัดกำแพงเพชร ขายสินค้าออนไลน์',
  },
  {
    id: 4, title: 'AI วิเคราะห์ผลผลิตทางการเกษตร', student: 'นางสาวพิมพ์ชนก สวัสดิ์', year: '2567',
    type: 'AI/ML', tech: ['Python', 'TensorFlow', 'OpenCV'], icon: '🌾',
    color: '#d97706', bg: '#fef3c7', award: '🥇 Best Innovation Award',
    desc: 'ใช้ AI วิเคราะห์รูปภาพผลผลิตเกษตร ตรวจสอบคุณภาพและคาดการณ์ราคาตลาด',
  },
  {
    id: 5, title: 'แชทบอท "น้องถาม" ตอบ FAQ', student: 'ทีม ChatGenius', year: '2568',
    type: 'Chatbot / AI', tech: ['Python', 'OpenAI API', 'React'], icon: '🤖',
    color: '#0891b2', bg: '#cffafe', award: '✨ Innovative Project 2568',
    desc: 'แชทบอทอัจฉริยะสำหรับตอบคำถามนักศึกษาใหม่เกี่ยวกับวิทยาลัย ใช้ AI ตอบ 24/7',
  },
  {
    id: 6, title: 'เกม "ผจญภัยในกำแพงเพชร"', student: 'ทีม GameDev KP', year: '2568',
    type: 'Game Dev', tech: ['Unity', 'C#', 'Blender'], icon: '🎮',
    color: '#7c3aed', bg: '#f3e8ff', award: '🎖️ Popular Choice Award',
    desc: 'เกมผจญภัย 2.5D นำเสนอประวัติศาสตร์และวัฒนธรรมของกำแพงเพชรในรูปแบบสนุกสนาน',
  },
]

/* =========================================================
   SHARED COMPONENTS
========================================================= */

/** Page header shown inside each page */
function PageHeader({ icon, title, subtitle, desc }) {
  return (
    <div className="text-center mb-12">
      <div className="sci-icon-box">{icon}</div>
      <h1 className="text-3xl sm:text-4xl font-extrabold sci-text sci-display mb-2">
        {title}
        {subtitle && <span className="gradient-text ml-2">{subtitle}</span>}
      </h1>
      {desc && <p className="sci-text-muted text-base sm:text-lg max-w-xl mx-auto mt-3 leading-relaxed">{desc}</p>}
    </div>
  )
}

/** Reusable badge */
function Badge({ label, color, bg }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ color, background: bg }}>
      {label}
    </span>
  )
}

/* =========================================================
   NAVBAR
========================================================= */
function Navbar({ activePage, onNav }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sci-nav w-full">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => onNav('home')} className="flex items-center gap-3 group">
            <div className="sci-logo-box">💻</div>
            <div className="hidden sm:block text-left">
              <div className="font-bold sci-text text-sm leading-tight sci-display">คอมพิวเตอร์ธุรกิจ</div>
              <div className="text-cyan-400 text-xs">วท.กำแพงเพชร</div>
            </div>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className={`sci-nav-link ${activePage === item.id ? 'sci-nav-link-active' : ''}`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
                {activePage === item.id && (
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full sci-pulse-dot" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNav('contact')}
              className="hidden sm:inline-flex sci-btn-primary"
            >
              📝 สมัครเรียน
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-9 h-9 rounded-lg border border-cyan-500/30 flex flex-col items-center justify-center gap-1.5 hover:bg-cyan-500/10 transition-colors"
              aria-label="เมนู"
            >
              <span className={`w-4 h-0.5 bg-cyan-300 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-4 h-0.5 bg-cyan-300 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-0.5 bg-cyan-300 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="sci-card-static mt-2 p-2 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNav(item.id); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activePage === item.id
                    ? 'sci-nav-link-active'
                    : 'sci-text-muted hover:bg-cyan-500/10 hover:text-cyan-400'
                }`}
              >
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

/* =========================================================
   PAGE: HOME
========================================================= */
function HomePage({ onNav }) {
  const [typed, setTyped] = useState('')
  const words = ['คอมพิวเตอร์ธุรกิจ', 'เทคโนโลยีสารสนเทศ', 'การตลาดดิจิทัล']
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const w = words[wi]
    const t = setTimeout(() => {
      if (!del) {
        if (ci < w.length) { setTyped(w.slice(0, ci + 1)); setCi(c => c + 1) }
        else setTimeout(() => setDel(true), 2000)
      } else {
        if (ci > 0) { setTyped(w.slice(0, ci - 1)); setCi(c => c - 1) }
        else { setDel(false); setWi(i => (i + 1) % words.length) }
      }
    }, del ? 55 : 90)
    return () => clearTimeout(t)
  }, [ci, del, wi])

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <div className="hero-bg py-20 sm:py-28 text-white text-center relative overflow-hidden">
        {/* Decorative dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {[...Array(12)].map((_, i) => (
            <div key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: 4 + (i % 5) * 3,
                height: 4 + (i % 5) * 3,
                left: `${8 + i * 8}%`,
                top: `${15 + (i % 4) * 18}%`,
                opacity: 0.08 + (i % 3) * 0.04,
                animation: `floatDot ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="hero-badge mb-8">
            <span className="sci-pulse-dot" />
            🎓 วิทยาลัยเทคนิคกำแพงเพชร
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-3 sci-display">
            แผนกวิชา
          </h1>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 flex items-center justify-center gap-2 min-h-[1.3em] sci-display">
            <span className="hero-typed">{typed}</span>
            <span className="hero-typed cursor">|</span>
          </div>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            มุ่งมั่นผลิตบุคลากรด้านเทคโนโลยีสารสนเทศที่มีคุณภาพ<br className="hidden sm:block" />
            พร้อมรับมือกับโลกธุรกิจดิจิทัลในยุคศตวรรษที่ 21
          </p>

          <div className="hero-3d-stage" aria-hidden="true">
            <div className="hero-orbit">
              <div className="hero-ball" />
              <div className="hero-cube">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <button onClick={() => onNav('curriculum')} className="w-full sm:w-auto sci-btn-hero-primary">
              📚 ดูหลักสูตร
            </button>
            <button onClick={() => onNav('contact')} className="w-full sm:w-auto sci-btn-hero-ghost">
              📬 ติดต่อเรา
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="sci-section">
        <div className="container-center py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center group sci-stat">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 text-2xl sci-stat-icon"
                  style={{ background: s.bg + '33', border: `1px solid ${s.color}44` }}>
                  {s.icon}
                </div>
                <div className="text-3xl font-black mb-1 sci-display" style={{ color: s.color }}>{s.value}</div>
                <div className="sci-text-muted text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="sci-section-alt">
      <div className="container-center py-14">
        <h2 className="sci-section-title">🔗 ลิงก์ที่ใช้บ่อย</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '📅', label: 'ตารางเรียน', color: '#4f46e5', bg: '#ede9fe' },
            { icon: '📝', label: 'สมัครเรียน', color: '#059669', bg: '#d1fae5' },
            { icon: '🎓', label: 'ทุนการศึกษา', color: '#d97706', bg: '#fef3c7' },
            { icon: '🗺️', label: 'แผนที่วิทยาลัย', color: '#0891b2', bg: '#cffafe' },
          ].map((l, i) => (
            <button
              key={i}
              className="sci-card flex flex-col items-center gap-3 p-6 group"
            >
              <span className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                style={{ background: l.bg + '33', border: `1px solid ${l.color}44` }}>
                {l.icon}
              </span>
              <span className="text-sm font-semibold sci-text">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
      </div>

      {/* Featured sections preview */}
      <div className="sci-section">
        <div className="container-center py-14">
          <h2 className="sci-section-title">📋 เนื้อหาทั้งหมด</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {navItems.filter(n => n.id !== 'home').map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className="sci-card flex items-center gap-4 p-5 text-left group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(34,211,238,0.25)' }}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold sci-text group-hover:text-cyan-400 transition-colors">
                    {item.label}
                  </div>
                  <div className="sci-text-dim text-xs mt-0.5">คลิกเพื่อดู →</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   PAGE: CURRICULUM
========================================================= */
function CurriculumPage() {
  const [active, setActive] = useState(0)
  const c = curriculumData[active]

  return (
    <div className="page-enter">
    <div className="container-center py-12">
      <PageHeader icon="📚" title="หลักสูตร" subtitle="ที่เปิดสอน"
        desc="เลือกเรียนในสาขาที่ตรงกับความสนใจ พร้อมรับประกาศนียบัตรรับรองมาตรฐาน" />

      {/* Course tabs */}
      <div className="sci-tabs mb-8">
        {curriculumData.map((cr, i) => (
          <button
            key={cr.id}
            onClick={() => setActive(i)}
            className={`sci-tab ${active === i ? 'sci-tab-active' : ''}`}
          >
            <span className="text-2xl">{cr.icon}</span>
            <div>
              <div className={`font-bold text-sm ${active === i ? 'sci-text' : 'sci-text-muted'}`}>
                {cr.title}
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: cr.color, background: cr.bg + '44' }}>
                {cr.badge} · {cr.duration}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Info */}
        <div className="sci-card-static p-7">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: c.bg + '33', border: `1px solid ${c.color}44` }}>
              {c.icon}
            </div>
            <div>
              <h2 className="text-xl font-extrabold sci-text">{c.title}</h2>
              <p className="sci-text-dim text-sm">{c.subtitle}</p>
              <Badge label={`${c.badge} · ระยะเวลา ${c.duration}`} color={c.color} bg={c.bg + '44'} />
            </div>
          </div>
          <p className="sci-text-muted leading-relaxed mb-6 text-sm">{c.desc}</p>
          <div>
            <h3 className="text-xs font-bold sci-text-dim uppercase tracking-widest mb-3">
              อาชีพที่รองรับ
            </h3>
            <div className="flex flex-wrap gap-2">
              {c.career.map((job, i) => (
                <span key={i} className="sci-chip">{job}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Year plan */}
        <div className="space-y-4">
          <h3 className="text-base font-bold sci-text">📋 แผนการเรียนแต่ละชั้นปี</h3>
          {c.yearPlans.map((yp, yi) => (
            <div key={yi} className="sci-card-static p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                  style={{ background: c.color, boxShadow: `0 0 16px ${c.color}66` }}>
                  {yi + 1}
                </div>
                <span className="font-bold sci-text">{yp.year}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {yp.subjects.map((s, si) => (
                  <div key={si} className="flex items-center gap-2 text-sm sci-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

/* =========================================================
   PAGE: STAFF (ดึงจาก API)
========================================================= */
function StaffPage() {
  const [staffList, setStaffList] = useState(staffData)
  useEffect(() => {
    fetch('/api/staff').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setStaffList(data.map(s => ({ ...s, bg: s.bg_color || s.bg })))
      }
    }).catch(() => {})
  }, [])
  const head = staffList.find(s => s.is_head || s.isHead)
  const rest = staffList.filter(s => !(s.is_head || s.isHead))

  return (
    <div className="page-enter">
    <div className="container-center py-12">
      <PageHeader icon="👨‍🏫" title="ทำเนียบ" subtitle="บุคลากร"
        desc="แผนกวิชาคอมพิวเตอร์ธุรกิจ วิทยาลัยเทคนิคกำแพงเพชร" />

      {/* Head teacher */}
      {head && (
        <div className="mb-8">
          <div className="sci-card-static overflow-hidden"
            style={{ borderColor: head.color + '60' }}>
            <div className="h-1.5 w-full" style={{ background: head.color, boxShadow: `0 0 12px ${head.color}` }} />
            <div className="p-7">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                    style={{ background: head.color, boxShadow: `0 0 24px ${head.color}66` }}>
                    {head.initials}
                  </div>
                  <div className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#0a0f1e', boxShadow: '0 0 12px rgba(251,191,36,0.5)' }}>
                    👑 หัวหน้า
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl font-extrabold sci-text">{head.name}</h2>
                    <Badge label={head.role} color={head.color} bg={head.bg + '44'} />
                  </div>
                  <p className="sci-text-muted text-sm mb-3">{head.subject} · ประสบการณ์ {head.experience}</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm sci-text-muted mb-3">
                    <span className="flex items-center gap-2"><span>📧</span>{head.email}</span>
                    <span className="flex items-center gap-2"><span>📞</span>{head.phone}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {head.expertise.map((e, i) => (
                      <span key={i} className="sci-chip-sm">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((staff, i) => (
          <div key={i} className="sci-card overflow-hidden">
            <div className="h-1" style={{ background: staff.color, boxShadow: `0 0 8px ${staff.color}88` }} />
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black text-white flex-shrink-0"
                  style={{ background: staff.color, boxShadow: `0 0 16px ${staff.color}55` }}>
                  {staff.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold sci-text text-sm leading-snug mb-1">{staff.name}</h3>
                  <Badge label={staff.role} color={staff.color} bg={staff.bg + '44'} />
                </div>
              </div>

              <div className="space-y-1.5 text-xs sci-text-muted mb-4">
                <div className="flex items-start gap-2"><span>📚</span><span>{staff.subject}</span></div>
                <div className="flex items-center gap-2"><span>⏱</span><span>ประสบการณ์ {staff.experience}</span></div>
                <div className="flex items-start gap-2"><span>📧</span><span className="truncate">{staff.email}</span></div>
                <div className="flex items-center gap-2"><span>📞</span><span>{staff.phone}</span></div>
              </div>

              <div className="pt-3 border-t border-cyan-500/15">
                <div className="text-xs sci-text-dim mb-2 font-medium uppercase tracking-wider">ความเชี่ยวชาญ</div>
                <div className="flex flex-wrap gap-1.5">
                  {staff.expertise.map((e, ei) => (
                    <span key={ei} className="sci-chip-sm">{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

/* =========================================================
   PAGE: NEWS (ดึงจาก API)
========================================================= */
function NewsPage() {
  const [filter, setFilter] = useState('ทั้งหมด')
  const [newsList, setNewsList] = useState(newsData)
  const cats = ['ทั้งหมด', 'ความสำเร็จ', 'ประกาศ', 'กิจกรรม', 'อบรม']
  useEffect(() => {
    fetch('/api/news').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setNewsList(data.map(n => ({
          ...n,
          catColor: n.category_color,
          catBg: n.category_bg,
          desc: n.description,
          hot: n.is_hot,
          date: n.published_at ? new Date(n.published_at).toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'numeric' }) : '',
        })))
      }
    }).catch(() => {})
  }, [])
  const filtered = filter === 'ทั้งหมด' ? newsList : newsList.filter(n => n.category === filter)

  return (
    <div className="page-enter">
    <div className="container-center py-12">
      <PageHeader icon="📰" title="ข่าวสาร" subtitle="และกิจกรรม"
        desc="ติดตามความเคลื่อนไหวและกิจกรรมล่าสุดของแผนกวิชา" />

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {cats.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`sci-filter-btn ${filter === cat ? 'sci-filter-btn-active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(item => (
          <article key={item.id} className="sci-card overflow-hidden flex flex-col">
            <div className="h-1" style={{ background: item.catColor, boxShadow: `0 0 8px ${item.catColor}88` }} />
            <div className="p-5 flex flex-col flex-1">
              {item.hot && (
                <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 px-2.5 py-1 rounded-full mb-3 self-start"
                  style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)' }}>
                  🔥 ข่าวเด่น
                </div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 flex-shrink-0"
                style={{ background: (item.catBg||'#ede9fe') + '33', border: `1px solid ${item.catColor||'#4f46e5'}44` }}>
                {item.icon}
              </div>
              <div className="flex items-center justify-between mb-3">
                <Badge label={item.category} color={item.catColor||'#4f46e5'} bg={(item.catBg||'#ede9fe') + '44'} />
                <span className="sci-text-dim text-xs">📅 {item.date}</span>
              </div>
              <h3 className="font-bold sci-text leading-snug mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="sci-text-muted text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{item.desc}</p>
              <button className="sci-link flex items-center gap-1 mt-auto">
                อ่านเพิ่มเติม <span>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
    </div>
  )
}

/* =========================================================
   PAGE: PORTFOLIO (ดึงจาก API)
========================================================= */
function PortfolioPage() {
  const [selected, setSelected] = useState(null)
  const [portList, setPortList] = useState(portfolioData)
  useEffect(() => {
    fetch('/api/portfolios').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setPortList(data.map(p => ({ ...p, bg: p.bg_color || p.bg, desc: p.description })))
      }
    }).catch(() => {})
  }, [])

  return (
    <div className="page-enter">
    <div className="container-center py-12">
      <PageHeader icon="🎨" title="ผลงาน" subtitle="นักศึกษา"
        desc="โปรเจกต์จบ แอพพลิเคชัน และเว็บไซต์ที่นักศึกษาสร้างเพื่อโชว์ศักยภาพ" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {portList.map(p => (
          <div key={p.id}
            className="sci-card overflow-hidden cursor-pointer group"
            onClick={() => setSelected(p)}>
            <div className="h-1.5" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}88` }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: (p.bg||'#ede9fe') + '33', border: `1px solid ${p.color}44` }}>
                  {p.icon}
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ color: p.color, background: (p.bg||'#ede9fe') + '44' }}>
                  {p.type}
                </span>
              </div>
              <div className="text-xs font-semibold mb-1.5" style={{ color: '#fbbf24' }}>{p.award}</div>
              <h3 className="font-bold sci-text mb-1 group-hover:text-cyan-400 transition-colors text-sm leading-snug">
                {p.title}
              </h3>
              <p className="sci-text-dim text-xs mb-3">👤 {p.student} · {p.year}</p>
              <p className="sci-text-muted text-sm line-clamp-2 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {(p.tech||[]).map((t, i) => (
                  <span key={i} className="sci-chip-sm"
                    style={{ borderColor: p.color + '50', background: (p.bg||'#ede9fe') + '22' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="sci-modal-overlay" onClick={() => setSelected(null)}>
          <div className="sci-modal" onClick={e => e.stopPropagation()}>
            <div className="h-2" style={{ background: selected.color, boxShadow: `0 0 16px ${selected.color}` }} />
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                  style={{ background: selected.bg + '33', border: `1px solid ${selected.color}44` }}>
                  {selected.icon}
                </div>
                <button onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-xl border border-cyan-500/30 flex items-center justify-center sci-text-dim hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                  ✕
                </button>
              </div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#fbbf24' }}>{selected.award}</div>
              <h3 className="text-xl font-extrabold sci-text mb-1">{selected.title}</h3>
              <p className="sci-text-dim text-sm mb-4">👤 {selected.student} · {selected.year}</p>
              <p className="sci-text-muted leading-relaxed mb-6 text-sm">{selected.desc}</p>
              <div className="flex flex-wrap gap-2">
                {selected.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl text-sm font-medium"
                    style={{ color: selected.color, background: selected.bg + '44', border: `1px solid ${selected.color}40` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

/* =========================================================
   PAGE: DOWNLOADS (ดาวน์โหลดเอกสาร)
========================================================= */
function DownloadsPage() {
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ทั้งหมด')
  const cats = ['ทั้งหมด', 'ตารางเรียน', 'แบบฟอร์ม', 'เอกสารฝึกงาน', 'เอกสารสมัครเรียน', 'ทั่วไป']

  useEffect(() => {
    fetch('/api/downloads').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setDownloads(data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'ทั้งหมด' ? downloads : downloads.filter(d => d.category === filter)
  const fileIcon = (type) => type === 'pdf' ? '📄' : type === 'doc' || type === 'docx' ? '📝' : '📎'

  return (
    <div className="page-enter">
    <div className="container-center py-12">
      <PageHeader icon="📥" title="ดาวน์โหลด" subtitle="เอกสาร"
        desc="แบบฟอร์ม ตารางเรียน เอกสารฝึกงาน และเอกสารอื่นๆ" />

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {cats.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`sci-filter-btn ${filter === cat ? 'sci-filter-btn-active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 sci-text-dim">⏳ กำลังโหลด...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 sci-text-dim">
          <div className="text-5xl mb-4">📭</div>
          <p>ยังไม่มีไฟล์ในหมวดหมู่นี้</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(d => (
            <div key={d.id} className="sci-card overflow-hidden">
              <div className="h-1" style={{ background: '#7c3aed' }} />
              <div className="p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)' }}>
                    {fileIcon(d.file_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold sci-text text-sm mb-1 leading-snug">{d.title}</h3>
                    <Badge label={d.category} color="#7c3aed" bg="rgba(124,58,237,0.15)" />
                  </div>
                </div>
                {d.description && <p className="sci-text-muted text-sm mb-3 line-clamp-2">{d.description}</p>}
                <div className="flex items-center justify-between text-xs sci-text-dim mb-4">
                  <span>📎 {d.file_name}</span>
                  <span>{d.file_size ? (d.file_size/1024).toFixed(0) + ' KB' : ''}</span>
                </div>
                <a href={`/api/downloads/${d.id}/file`}
                  className="sci-btn-primary w-full text-center text-sm py-2.5 rounded-lg inline-block"
                  style={{ textDecoration: 'none' }}>
                  📥 ดาวน์โหลด ({d.download_count || 0} ครั้ง)
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

/* =========================================================
   PAGE: CONTACT
========================================================= */
function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'ทั่วไป', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', phone: '', type: 'ทั่วไป', message: '' })
  }

  const contactInfo = [
    { icon: '📍', label: 'ที่อยู่', value: 'วิทยาลัยเทคนิคกำแพงเพชร\nอ.เมือง จ.กำแพงเพชร 62000', color: '#4f46e5', bg: '#ede9fe' },
    { icon: '📞', label: 'โทรศัพท์', value: '055-711-291', color: '#059669', bg: '#d1fae5' },
    { icon: '📧', label: 'อีเมล', value: 'computer@kptc.ac.th', color: '#0891b2', bg: '#cffafe' },
    { icon: '🕐', label: 'เวลาทำการ', value: 'จันทร์–ศุกร์ 08:00–17:00 น.', color: '#d97706', bg: '#fef3c7' },
    { icon: '📘', label: 'Facebook', value: 'แผนกคอมพิวเตอร์ธุรกิจ วท.กพ.', color: '#7c3aed', bg: '#f3e8ff' },
  ]

  return (
    <div className="page-enter">
    <div className="container-center py-12">
      <PageHeader icon="📬" title="ติดต่อ" subtitle="แผนกวิชา"
        desc="ที่ตั้งแผนก แผนที่ เบอร์โทรศัพท์ และฟอร์มส่งข้อความถึงเรา" />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Info + Map */}
        <div className="space-y-3">
          {contactInfo.map((info, i) => (
            <div key={i} className="sci-card flex items-start gap-4 p-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: info.bg + '33', border: `1px solid ${info.color}44` }}>
                {info.icon}
              </div>
              <div>
                <div className="sci-label mb-0.5">{info.label}</div>
                <div className="sci-text font-medium text-sm whitespace-pre-line">{info.value}</div>
              </div>
            </div>
          ))}

          {/* Map */}
          <div className="sci-card-static overflow-hidden">
            <div className="h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.8!2d99.5196!3d16.4833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDI5JzAwLjAiTiA5OcKwMzEnMTAuNiJF!5e0!3m2!1sth!2sth!4v1625000000000"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }}
                allowFullScreen loading="lazy"
                title="แผนที่วิทยาลัยเทคนิคกำแพงเพชร"
              />
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="sci-card-static overflow-hidden">
          <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #0891b2, #7c3aed)', boxShadow: '0 0 16px rgba(34,211,238,0.4)' }} />
          <div className="p-7">
            <h2 className="text-lg font-extrabold sci-text sci-display mb-6">✉️ ส่งข้อความถึงเรา</h2>

            {sent && (
              <div className="mb-5 p-4 rounded-xl text-sm flex items-center gap-3"
                style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
                <span className="text-2xl">✅</span>
                ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็ว
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="sci-label">ชื่อ-นามสกุล *</label>
                  <input type="text" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="กรอกชื่อของคุณ" required className="sci-input" />
                </div>
                <div>
                  <label className="sci-label">เบอร์โทร</label>
                  <input type="tel" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="0X-XXXX-XXXX" className="sci-input" />
                </div>
              </div>

              <div>
                <label className="sci-label">อีเมล *</label>
                <input type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="example@email.com" required className="sci-input" />
              </div>

              <div>
                <label className="sci-label">ประเภทการติดต่อ</label>
                <select value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="sci-input">
                  {['ทั่วไป', 'สอบถามหลักสูตร', 'สมัครเรียน', 'ฝึกงาน/สหกิจ', 'อื่นๆ'].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="sci-label">ข้อความ *</label>
                <textarea rows={5} value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="กรอกข้อความที่ต้องการส่ง..." required
                  className="sci-input resize-none" />
              </div>

              <button type="submit" className="w-full sci-btn-primary py-3.5 text-base font-bold">
                📨 ส่งข้อความ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

/* =========================================================
   FOOTER
========================================================= */
function Footer({ onNav }) {
  return (
    <footer className="sci-footer">
      <div className="container-center py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="sci-logo-box text-xl">💻</div>
              <div>
                <div className="font-bold sci-text text-sm sci-display">แผนกวิชาคอมพิวเตอร์ธุรกิจ</div>
                <div className="sci-text-muted text-xs">วิทยาลัยเทคนิคกำแพงเพชร</div>
              </div>
            </div>
            <p className="sci-text-muted text-sm leading-relaxed">
              สังกัดสำนักงานคณะกรรมการการอาชีวศึกษา กระทรวงศึกษาธิการ<br />
              มุ่งผลิตบุคลากรดิจิทัลคุณภาพสูง
            </p>
          </div>

          <div>
            <h4 className="sci-text font-semibold mb-4 text-sm sci-display">ลิงก์ด่วน</h4>
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.id}>
                  <button onClick={() => onNav(item.id)} className="sci-footer-link">
                    <span>{item.icon}</span>{item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="sci-text font-semibold mb-4 text-sm sci-display">ติดต่อ</h4>
            <div className="space-y-2 text-sm sci-text-muted">
              <p>📍 อ.เมือง จ.กำแพงเพชร 62000</p>
              <p>📞 055-711-291</p>
              <p>📧 computer@kptc.ac.th</p>
              <p>🕐 จ-ศ 08:00–17:00 น.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-500/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="sci-text-dim text-xs">© 2568 แผนกวิชาคอมพิวเตอร์ธุรกิจ วิทยาลัยเทคนิคกำแพงเพชร</p>
          <p className="sci-text-dim text-xs">พัฒนาโดย <span className="text-cyan-400">นักศึกษาแผนกคอมพิวเตอร์ธุรกิจ</span> ❤️</p>
        </div>
      </div>
    </footer>
  )
}

/* =========================================================
   APP — page-based routing
========================================================= */
function App() {
  const [page, setPage] = useState('home')

  // Breadcrumb scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const renderPage = () => {
    switch (page) {
      case 'home':       return <HomePage onNav={setPage} />
      case 'curriculum': return <CurriculumPage />
      case 'staff':      return <StaffPage />
      case 'news':       return <NewsPage />
      case 'portfolio':  return <PortfolioPage />
      case 'downloads':  return <DownloadsPage />
      case 'contact':    return <ContactPage />
      default:           return <HomePage onNav={setPage} />
    }
  }

  const currentNav = navItems.find(n => n.id === page)

  return (
    <div className="app-shell">
      <div className="app-inner">
        <Navbar activePage={page} onNav={setPage} />

        {/* Breadcrumb (ยกเว้นหน้าแรก) */}
        {page !== 'home' && (
          <div className="sci-breadcrumb">
            <div className="container-center py-3">
              <div className="flex items-center justify-center gap-2 text-sm sci-text-muted">
                <button onClick={() => setPage('home')} className="hover:text-cyan-400 transition-colors font-medium">
                  🏠 หน้าแรก
                </button>
                <span className="text-cyan-500/30">/</span>
                <span className="sci-text font-semibold">
                  {currentNav?.icon} {currentNav?.label}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 w-full">
          {renderPage()}
        </main>

        <Footer onNav={setPage} />
      </div>
    </div>
  )
}

export default App
