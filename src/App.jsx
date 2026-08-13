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
  { value: '2',    label: 'หลักสูตร (ปวช./ปวส.)', icon: '💡', color: '#059669', bg: '#d1fae5' },
  { value: '95%',  label: 'อัตราการมีงานทำ', icon: '🚀', color: '#d97706', bg: '#fef3c7' },
]

const curriculumData = [
  {
    id: 'bcom-voc', badge: 'ปวช.', icon: '💻',
    title: 'คอมพิวเตอร์ธุรกิจ (ปวช.)', subtitle: 'Business Computer (Vocational Certificate)', duration: '3 ปี',
    color: '#4f46e5', bg: '#ede9fe',
    desc: 'หลักสูตรประกาศนียบัตรวิชาชีพ (ปวช.) สาขาวิชาคอมพิวเตอร์ธุรกิจ เรียนรู้พื้นฐานด้านคอมพิวเตอร์ โปรแกรมสำนักงาน การพัฒนาเว็บไซต์ การออกแบบกราฟิก และเทคโนโลยีสารสนเทศเพื่อการจัดการธุรกิจ',
    career: ['เจ้าหน้าที่บริการ IT', 'พนักงานพัฒนาเว็บเบื้องต้น', 'นักออกแบบกราฟิกเบื้องต้น', 'เจ้าหน้าที่ธุรการ/บัญชีดิจิทัล'],
    yearPlans: [
      { year: 'ปีที่ 1', subjects: ['พื้นฐานคอมพิวเตอร์และสารสนเทศ', 'โปรแกรมสำนักงาน', 'คณิตศาสตร์ IT', 'ภาษาอังกฤษเพื่อการสื่อสาร'] },
      { year: 'ปีที่ 2', subjects: ['การพัฒนาเว็บไซต์เบื้องต้น', 'ระบบฐานข้อมูล', 'คอมพิวเตอร์กราฟิก', 'การวิเคราะห์และออกแบบระบบ'] },
      { year: 'ปีที่ 3', subjects: ['การประยุกต์ใช้คอมพิวเตอร์ในงานธุรกิจ', 'ฝึกงานในสถานประกอบการ', 'โครงงานคอมพิวเตอร์ธุรกิจ', 'วิชาชีพเฉพาะสาขา'] },
    ],
  },
  {
    id: 'bcom-hvoc', badge: 'ปวส.', icon: '📊',
    title: 'คอมพิวเตอร์ธุรกิจ (ปวส.)', subtitle: 'Business Computer (High Vocational Certificate)', duration: '2 ปี',
    color: '#059669', bg: '#d1fae5',
    desc: 'หลักสูตรประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.) สาขาวิชาคอมพิวเตอร์ธุรกิจ มุ่งเน้นการพัฒนาระบบสารสนเทศ การวิเคราะห์ข้อมูล การจัดการฐานข้อมูลขั้นสูง และนวัตกรรมเทคโนโลยีสารสนเทศในองค์กร',
    career: ['นักพัฒนาระบบสารสนเทศ (System Developer)', 'นักวิเคราะห์ข้อมูลธุรกิจ (Data Analyst)', 'ผู้ดูแลระบบฐานข้อมูล (Database Admin)', 'นักพัฒนาเว็บไซต์และแอปพลิเคชัน'],
    yearPlans: [
      { year: 'ปีที่ 1', subjects: ['การพัฒนาระบบสารสนเทศทางธุรกิจ', 'การจัดการฐานข้อมูลขั้นสูง', 'เครือข่ายคอมพิวเตอร์และการสื่อสาร', 'การวิเคราะห์และประมวลผลข้อมูล'] },
      { year: 'ปีที่ 2', subjects: ['เทคโนโลยีธุรกิจดิจิทัลและนวัตกรรม', 'ระบบความปลอดภัยสารสนเทศ', 'โครงงานวิจัยคอมพิวเตอร์ธุรกิจ', 'ฝึกชำนาญการ/ฝึกสหกิจศึกษา'] },
    ],
  },
]

// ข้อมูลจริงจากป้ายทำเนียบบุคลากร
const staffData = [
  {
    name: 'นางสาวจีระภา ศรีสุพัฒน์',
    title: 'หัวหน้าแผนกวิชา', role: 'ครู (หัวหน้าแผนกวิชา)',
    subject: 'หัวหน้าแผนกวิชาคอมพิวเตอร์ธุรกิจ',
    initials: 'จภ', email: 'weeraka@kptc.ac.th', phone: '055-711-291 ต่อ 101',
    expertise: ['การบริหารแผนก', 'คอมพิวเตอร์ธุรกิจ', 'IT Management'],
    color: '#4f46e5', bg: '#ede9fe', experience: '20+ ปี', isHead: true,
    image: '/2.png',
  },
  {
    name: 'นายนพดล สังข์น้อย',
    title: 'รองหัวหน้าแผนก', role: 'ครูชำนาญการ (รองหัวหน้าแผนกฯ)',
    subject: 'การพัฒนาระบบสารสนเทศ',
    initials: 'นพ', email: 'noppadon@kptc.ac.th', phone: '055-711-291 ต่อ 102',
    expertise: ['System Analysis', 'Database Design', 'Network'],
    color: '#0891b2', bg: '#cffafe', experience: '15+ ปี', isHead: false,
    image: '/3.png',
  },
  {
    name: 'นางสมพร โมกขะรัตน์',
    title: 'ครูชำนาญการพิเศษ', role: 'ครูชำนาญการพิเศษ',
    subject: 'โปรแกรมสำนักงานและบัญชี',
    initials: 'สพ', email: 'somporn@kptc.ac.th', phone: '055-711-291 ต่อ 103',
    expertise: ['Microsoft Office', 'บัญชีคอมพิวเตอร์', 'โปรแกรมสำนักงาน'],
    color: '#7c3aed', bg: '#f3e8ff', experience: '18+ ปี', isHead: false,
    image: '/4.png',
  },
  {
    name: 'นายทวีภพ พินิจลิขิต',
    title: 'ครูชำนาญการ', role: 'ครูชำนาญการ',
    subject: 'การพัฒนาเว็บไซต์และโปรแกรม',
    initials: 'ทว', email: 'tawiphop@kptc.ac.th', phone: '055-711-291 ต่อ 104',
    expertise: ['Web Development', 'PHP', 'JavaScript'],
    color: '#059669', bg: '#d1fae5', experience: '12+ ปี', isHead: false,
    image: '/5.png',
  },
  {
    name: 'นายฐิติพงษ์ แก้วดี',
    title: 'ครู', role: 'ครู',
    subject: 'เครือข่ายคอมพิวเตอร์',
    initials: 'ฐต', email: 'thitipong@kptc.ac.th', phone: '055-711-291 ต่อ 105',
    expertise: ['Network', 'Cisco', 'Linux Server'],
    color: '#d97706', bg: '#fef3c7', experience: '8+ ปี', isHead: false,
    image: '/6.png',
  },
  {
    name: 'นายกันตพงศ์ แก้วนิล',
    title: 'ครูผู้ช่วย', role: 'ครูผู้ช่วย',
    subject: 'กราฟิกและมัลติมีเดีย',
    initials: 'กต', email: 'kantapong@kptc.ac.th', phone: '055-711-291 ต่อ 106',
    expertise: ['Photoshop', 'Illustrator', 'Multimedia'],
    color: '#dc2626', bg: '#fee2e2', experience: '4+ ปี', isHead: false,
    image: '/7.png',
  },
  {
    name: 'นางสาวณัฐธยาน์ เถกิงสรคันธ์',
    title: 'ครูพิเศษ', role: 'ครูพิเศษ',
    subject: 'การตลาดดิจิทัล',
    initials: 'ณฐ', email: 'atchariyan@kptc.ac.th', phone: '055-711-291 ต่อ 107',
    expertise: ['Digital Marketing', 'Social Media', 'E-Commerce'],
    color: '#db2777', bg: '#fce7f3', experience: '3+ ปี', isHead: false,
    image: '/8.png',
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
   AUTO CAROUSEL COMPONENT (สำหรับเลื่อนผลงานและข่าวอัตโนมัติ)
========================================================= */
function AutoCarousel({ items, renderItem, columns }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(columns || 3)

  useEffect(() => {
    if (columns) {
      setItemsPerView(columns)
      return
    }
    const updateView = () => {
      if (window.innerWidth < 768) setItemsPerView(1)
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else setItemsPerView(3)
    }
    updateView()
    window.addEventListener('resize', updateView)
    return () => window.removeEventListener('resize', updateView)
  }, [columns])

  useEffect(() => {
    if (!items || items.length <= itemsPerView) return
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev >= items.length - itemsPerView ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [items, itemsPerView])

  if (!items || items.length === 0) return null

  if (items.length <= itemsPerView) {
    return (
      <div className="flex flex-wrap justify-center -mx-3">
        {items.map((item, idx) => (
          <div key={idx} className="px-3 w-full md:w-1/2 lg:w-1/3 mb-6" style={columns === 1 ? { width: '100%' } : {}}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-hidden relative py-2 -mx-3 px-3">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="flex-none px-3 py-2" style={{ width: `${100 / itemsPerView}%` }}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: items.length - itemsPerView + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'bg-cyan-400 w-8' : 'bg-slate-600 w-2.5 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   PAGE: HOME (หน้าหลัก)
========================================================= */
function HomePage({ onNav }) {
  const [latestNews, setLatestNews] = useState([])
  const [latestPortfolios, setLatestPortfolios] = useState([])
  const [heroStaff, setHeroStaff] = useState(staffData)

  useEffect(() => {
    // ดึงข่าวสาร
    fetch('/api/news').then(r => r.json()).then(data => {
      if (Array.isArray(data)) {
        setLatestNews(data.slice(0, 9).map(n => ({
          id: n.id,
          tag: n.category || 'ข่าวสาร',
          date: n.published_at ? new Date(n.published_at).toLocaleDateString('th-TH', { day:'numeric', month:'short', year:'numeric' }) : '',
          title: n.title,
          image: n.cover_image_url
        })))
      }
    }).catch(() => {})

    // ดึงผลงาน
    fetch('/api/portfolios').then(r => r.json()).then(data => {
      if (Array.isArray(data)) {
        setLatestPortfolios(data.slice(0, 9).map(p => ({
          id: p.id,
          title: p.title,
          desc: p.description,
          icon: p.icon || '🎨',
          image: p.cover_image_url
        })))
      }
    }).catch(() => {})

    // ดึงข้อมูลอาจารย์
    fetch('/api/staff').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setHeroStaff(data.map((s, idx) => ({ ...staffData[idx], ...s, bg: s.bg_color || s.bg, image: staffData[idx]?.image })))
      }
    }).catch(() => {})
  }, [])

  return (
    <div className="page-enter bg-[#0a0f1e] min-h-screen text-slate-200">
      
      {/* 1. Hero Section (อวกาศ & 3D ลอย) */}
      <section className="relative pt-32 pb-10 px-4 overflow-hidden flex flex-col items-center min-h-[90vh] justify-center bg-[#060a16]">
        
        {/* พื้นหลัง: เส้น Grid และดวงดาว */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)', maskImage: 'linear-gradient(to bottom, white, transparent)' }}
        ></div>
        <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-70 blur-[1px]"></div>
        <div className="absolute top-1/3 right-[20%] w-2 h-2 bg-slate-300 rounded-full opacity-80"></div>
        <div className="absolute bottom-1/4 left-[25%] w-1 h-1 bg-white rounded-full opacity-50"></div>
        <div className="absolute top-20 right-[10%] w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
        
        {/* แสง Ambient สีฟ้า */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 text-center w-full max-w-5xl mx-auto flex flex-col items-center">
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight">
            แผนกวิชา
          </h1>
          {/* แก้ไขข้อความให้แสดงครบเต็มๆ แล้วครับ */}
          <h1 className="text-4xl md:text-6xl font-black text-cyan-400 mb-6 flex items-center justify-center">
            คอมพิวเตอร์ธุรกิจ (ปวช.)
          </h1>
          
          <p className="text-sm md:text-base text-slate-300 max-w-lg mx-auto leading-relaxed mb-8 font-medium">
            มุ่งมั่นผลิตบุคลากรด้านเทคโนโลยีสารสนเทศที่มีคุณภาพ<br className="hidden md:block" />
            พร้อมรับมือกับโลกธุรกิจดิจิทัลในยุคศตวรรษที่ 21
          </p>

          {/* Teacher Carousel in Hero Section */}
          <div className="w-full max-w-sm mx-auto mt-4 mb-4 px-4">
            <AutoCarousel 
              items={heroStaff}
              columns={1}
              renderItem={(staff) => (
                <div className="sci-card-static overflow-hidden w-full max-w-sm mx-auto shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300"
                  style={{ borderColor: (staff.color || '#0891b2') + '60' }}>
                  <div className="h-1.5 w-full" style={{ background: staff.color || '#0891b2', boxShadow: `0 0 12px ${staff.color || '#0891b2'}` }} />
                  
                  <div className="w-full relative bg-slate-800/50 flex justify-center pt-6">
                    {staff.photo_url || staff.image ? (
                      <img src={staff.photo_url || staff.image} alt={staff.name} className="w-full h-auto max-h-[350px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]" />
                    ) : (
                      <div className="w-full aspect-[3/4] max-h-[350px] flex items-center justify-center text-6xl font-black text-white"
                        style={{ background: staff.color || '#0891b2' }}>
                        {staff.initials}
                      </div>
                    )}
                    {(staff.is_head || staff.isHead) && (
                      <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-bold shadow-lg"
                        style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#0a0f1e', boxShadow: '0 0 12px rgba(251,191,36,0.6)' }}>
                        👑 หัวหน้าแผนก
                      </div>
                    )}
                  </div>

                  <div className="p-6 text-center bg-slate-900/90 backdrop-blur-md">
                    <h2 className="text-xl font-extrabold text-white mb-2">{staff.name}</h2>
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                        style={{ color: staff.color || '#0891b2', background: (staff.bg || '#cffafe') + '44', border: `1px solid ${staff.color || '#0891b2'}40` }}>
                        {staff.role}
                      </span>
                    </div>
                    {staff.expertise && staff.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {staff.expertise.map((e, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-slate-300">
                            {e}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* 2. Quick Links */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'schedule', icon: '📅', label: 'ตารางเรียน' },
            { id: 'contact', icon: '📝', label: 'สมัครเรียน' },
            { id: 'scholarship', icon: '🎓', label: 'ทุนการศึกษา' },
            { id: 'map', icon: '🗺️', label: 'แผนที่วิทยาลัย' },
          ].map((link, i) => (
            <button 
              key={i} 
              onClick={() => onNav(link.id === 'contact' ? 'contact' : 'home')}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-cyan-500/30 backdrop-blur-md transition-all hover:-translate-y-1 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{link.icon}</span>
              <span className="font-semibold text-cyan-50">{link.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Portfolio (Slider) */}
      <section className="py-16 px-4 relative z-10 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3">
            <span className="text-4xl">🎨</span> ผลงานนักศึกษาที่โดดเด่น
          </h2>
          
          {latestPortfolios.length === 0 ? (
            <div className="text-center text-slate-500 py-10">กำลังโหลดผลงาน... หรือยังไม่มีผลงาน</div>
          ) : (
            <AutoCarousel 
              items={latestPortfolios} 
              renderItem={(p) => (
                <div className="rounded-2xl overflow-hidden bg-slate-800/40 border border-white/10 backdrop-blur-md flex flex-col group hover:border-cyan-500/40 transition-colors h-full">
                  <div className="w-full aspect-video bg-slate-900/80 flex items-center justify-center text-5xl relative overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <span className="group-hover:scale-125 transition-transform duration-500">{p.icon}</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-cyan-100 mb-2">{p.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5 line-clamp-2">{p.desc}</p>
                    <button onClick={() => onNav('portfolio')} className="w-full mt-auto py-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all">
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              )}
            />
          )}
        </div>
      </section>

      {/* 4. Latest News (Slider) */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-3">
            <span className="text-4xl">📰</span> ข่าวสารและกิจกรรมล่าสุด
          </h2>
          
          {latestNews.length === 0 ? (
            <div className="text-center text-slate-500 py-10">กำลังโหลดข่าวสาร... หรือยังไม่มีข่าวสาร</div>
          ) : (
            <div className="mb-12">
              <AutoCarousel 
                items={latestNews}
                renderItem={(news) => (
                  <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/5 backdrop-blur-md flex flex-col hover:-translate-y-1 hover:border-white/20 transition-all h-full cursor-pointer" onClick={() => onNav('news')}>
                    <div className="w-full h-44 bg-slate-800/80 flex items-center justify-center text-slate-500 text-sm font-medium border-b border-white/5 relative overflow-hidden">
                      {news.image ? (
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="opacity-50">[ ไม่มีรูปภาพข่าว ]</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/20">
                          {news.tag}
                        </span>
                        <span className="text-xs text-slate-400">{news.date}</span>
                      </div>
                      <h3 className="font-bold text-slate-200 leading-snug line-clamp-3">
                        {news.title}
                      </h3>
                    </div>
                  </div>
                )}
              />
            </div>
          )}
          
          <div className="text-center">
            <button onClick={() => onNav('news')} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium backdrop-blur-md transition-all">
              ดูข่าวสารทั้งหมด <span>→</span>
            </button>
          </div>
        </div>
      </section>

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
      if (Array.isArray(data)) {
        setStaffList(data.map((s, idx) => ({ ...s, bg: s.bg_color || s.bg, image: staffData[idx]?.image })))
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
        <div className="mb-10 flex justify-center">
          <div className="sci-card-static overflow-hidden w-full max-w-md"
            style={{ borderColor: head.color + '60' }}>
            <div className="h-1.5 w-full" style={{ background: head.color, boxShadow: `0 0 12px ${head.color}` }} />
            
            <div className="w-full relative bg-slate-800/50 flex justify-center">
              {head.photo_url || head.image ? (
                <img src={head.photo_url || head.image} alt={head.name} className="w-full h-auto max-h-[500px] object-contain" />
              ) : (
                <div className="w-full aspect-[3/4] flex items-center justify-center text-6xl font-black text-white"
                  style={{ background: head.color }}>
                  {head.initials}
                </div>
              )}
              <div className="absolute top-4 right-4 text-sm px-3 py-1 rounded-full font-bold shadow-lg"
                style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#0a0f1e', boxShadow: '0 0 12px rgba(251,191,36,0.6)' }}>
                👑 หัวหน้าแผนก
              </div>
            </div>

            <div className="p-6 text-center">
              <h2 className="text-2xl font-extrabold sci-text mb-3">{head.name}</h2>
              <div className="mb-4">
                <Badge label={head.role} color={head.color} bg={head.bg + '44'} />
              </div>
              {(head.subject || head.experience) && (
                <p className="sci-text-muted text-sm mb-5">
                  {head.subject} {head.subject && head.experience && '·'} {head.experience && `ประสบการณ์ ${head.experience}`}
                </p>
              )}
              
              {(head.email || head.phone) && (
                <div className="flex flex-col gap-2 text-sm sci-text-muted mb-6 items-center">
                  {head.email && <span className="flex items-center gap-2"><span>📧</span>{head.email}</span>}
                  {head.phone && <span className="flex items-center gap-2"><span>📞</span>{head.phone}</span>}
                </div>
              )}
              
              {head.expertise && head.expertise.length > 0 && (
                <div className="pt-5 border-t border-cyan-500/15">
                  <div className="text-xs sci-text-dim mb-3 font-medium uppercase tracking-wider text-left">ความเชี่ยวชาญ</div>
                  <div className="flex flex-wrap gap-2">
                    {head.expertise.map((e, i) => (
                      <span key={i} className="sci-chip-sm">{e}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rest.map((staff, i) => (
          <div key={i} className="sci-card overflow-hidden flex flex-col">
            <div className="h-1" style={{ background: staff.color, boxShadow: `0 0 8px ${staff.color}88` }} />
            
            <div className="w-full relative bg-slate-800/50 border-b border-slate-700/50 flex justify-center">
              {staff.photo_url || staff.image ? (
                <img src={staff.photo_url || staff.image} alt={staff.name} className="w-full h-auto max-h-[400px] object-contain" />
              ) : (
                <div className="w-full aspect-[3/4] flex items-center justify-center text-5xl font-black text-white"
                  style={{ background: staff.color }}>
                  {staff.initials}
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-5 text-center">
                <h3 className="font-bold sci-text text-lg leading-snug mb-2">{staff.name}</h3>
                <Badge label={staff.role} color={staff.color} bg={staff.bg + '44'} />
              </div>

              <div className="space-y-2 text-xs sci-text-muted mb-5">
                {staff.subject && <div className="flex items-start gap-2"><span>📚</span><span>{staff.subject}</span></div>}
                {staff.experience && <div className="flex items-center gap-2"><span>⏱</span><span>ประสบการณ์ {staff.experience}</span></div>}
                {staff.email && <div className="flex items-start gap-2"><span>📧</span><span className="truncate">{staff.email}</span></div>}
                {staff.phone && <div className="flex items-center gap-2"><span>📞</span><span>{staff.phone}</span></div>}
              </div>

              {staff.expertise && staff.expertise.length > 0 && (
                <div className="pt-4 border-t border-cyan-500/15 mt-auto">
                  <div className="text-xs sci-text-dim mb-3 font-medium uppercase tracking-wider">ความเชี่ยวชาญ</div>
                  <div className="flex flex-wrap gap-1.5">
                    {staff.expertise.map((e, ei) => (
                      <span key={ei} className="sci-chip-sm">{e}</span>
                    ))}
                  </div>
                </div>
              )}
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
      if (Array.isArray(data)) {
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
            {item.cover_image_url && (
              <div className="w-full relative bg-slate-800/50 border-b border-slate-700/50 flex justify-center">
                <img src={item.cover_image_url} alt={item.title} className="w-full h-48 object-contain bg-slate-900/50" />
              </div>
            )}
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
      if (Array.isArray(data)) {
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
            className="sci-card overflow-hidden cursor-pointer group flex flex-col"
            onClick={() => setSelected(p)}>
            <div className="h-1.5" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}88` }} />
            {p.cover_image_url && (
              <div className="w-full relative bg-slate-800/50 border-b border-slate-700/50 flex justify-center">
                <img src={p.cover_image_url} alt={p.title} className="w-full h-48 object-contain bg-slate-900/50" />
              </div>
            )}
            <div className="p-5 flex-1">
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
          <div className="sci-modal overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="h-2" style={{ background: selected.color, boxShadow: `0 0 16px ${selected.color}` }} />
            {selected.cover_image_url && (
              <div className="w-full relative bg-slate-800/50 border-b border-slate-700/50 flex justify-center">
                <img src={selected.cover_image_url} alt={selected.title} className="w-full h-auto max-h-[400px] object-contain bg-slate-900/50" />
              </div>
            )}
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
                {(selected.tech || []).map((t, i) => (
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
