
/* FUSS Platform Prototype - Vanilla JS SPA
   Pages: login, register, dashboard, browse, request, messages, profile, reviews, admin
   Data is mocked in-memory + localStorage. */
const $ = (sel, el=document)=>el.querySelector(sel);
const $$ = (sel, el=document)=>Array.from(el.querySelectorAll(sel));

const App = {
  state: {
    user: JSON.parse(localStorage.getItem('fuss_user') || 'null'),
    notifications: 3,
    messages: 5,
  },
  data: {
    skills: [
      {name:"Python Programming", rating:4.9, provider:"Sarah Johnson", category:"Technology"},
      {name:"Spanish Conversation", rating:4.2, provider:"Mike Rodriguez", category:"Languages"},
      {name:"Graphic Design", rating:5.0, provider:"Emma Wilson", category:"Creative"},
      {name:"Math Tutoring", rating:4.6, provider:"James Kim", category:"Academic"},
    ],
    requests: [
      {title:"Math Tutoring", detail:"Calculus II help needed for upcoming exam", duration:"2 hours • 30 points", status:"Pending"},
      {title:"Essay Review", detail:"Psychology assignment proofreading", duration:"1 hour • 15 points", status:"Confirmed"},
      {title:"Guitar Lessons", detail:"Beginner guitar techniques", duration:"1.5 hours • 20 points", status:"In Progress"},
    ],
    conversations: {
      "Sarah Johnson":[
        {from:"them", text:"Hey Alex! Thanks for accepting my Python tutoring request. I'm really struggling with object‑oriented programming concepts."},
        {from:"me", text:"No problem, Sarah! OOP can be tricky. Let's start with the basics — classes and objects. When would be a good time for our first session?"},
        {from:"them", text:"Perfect! How about tomorrow at 2 PM? I'm free after my morning classes."},
        {from:"me", text:"That works! Let's meet at the library study rooms on Level 2."}
      ]
    }
  }
};

function saveSession(){
  localStorage.setItem('fuss_user', JSON.stringify(App.state.user));
  }

/* ---------- Layout shell ---------- */
function shell(content, active="dashboard"){
  const u = App.state.user;
  const loggedIn = !!u;
  return `
  <div class="app-shell">
    <header class="topbar">
      <div class="container nav">
        <div class="brand">
          <div class="brand-badge">+</div>
          <div>FUSS Platform</div>
        </div>
        ${loggedIn ? `
          <a href="#/dashboard" class="${active==='dashboard'?'active':''}">Dashboard</a>
          <a href="#/browse" class="${active==='browse'?'active':''}">Browse Skills</a>
          <a href="#/profile" class="${active==='profile'?'active':''}">Profile</a>
          <a href="#/messages" class="${active==='messages'?'active':''}">Messages</a>
          <a href="#/admin" class="${active==='admin'?'active':''}">Admin</a>
          <div class="nav-right">
            <div class="points">🪙 <span id="points">${App.state.points}</span> Credits</div>
            <div class="badge gray">🔔 ${App.state.notifications}</div>
            <div class="badge">💬 ${App.state.messages}</div>
            <div class="avatar" title="${u?.name||''}">${(u?.name||'A')[0]}</div>
            <a class="nav" href="#/logout">Log out</a>
          </div>` 
        : `
          <a href="#/login" class="${active==='login'?'active':''}">Login</a>
          <a href="#/register" class="${active==='register'?'active':''}">Register</a>
          <div class="nav-right"></div>
        `}
      </div>
    </header>
    <main class="main">
      <div class="container">${content}</div>
    </main>
    <footer class="footer">
      © 2025 FUSS Platform. Flinders University Skill Sharing Platform
    </footer>
  </div>`;
}

/* ---------- Pages ---------- */
const Pages = {};

/* Login */
Pages.login = () => shell(`
  <div class="center">
    <div class="card" style="width:min(560px, 96vw)">
      <h2 class="page-title center">Welcome Back</h2>
      <label>Email (must be @flinders.edu.au)</label>
      <input class="input" id="login-email" placeholder="your.name@flinders.edu.au"/>
      <label>Password</label>
      <input class="input" id="login-pass" type="password" placeholder="Enter your password"/>
      <div class="flex" style="justify-content:space-between; margin-top:8px">
        <label class="small"><input type="checkbox" id="remember"/> Remember me</label>
        <a class="small" href="#">Forgot your password?</a>
      </div>
      <div class="flex" style="margin-top:12px">
        <button class="btn" id="login-btn">Sign In</button>
        <button class="btn secondary" data-demo="student">Use Demo (Student)</button>
        <button class="btn secondary" data-demo="tutor">Use Demo (Tutor)</button>
      </div>
      <div class="hr"></div>
      <div class="small">New to FUSS Platform? <a class="btn link" href="#/register">Create your account</a></div>
    </div>
  </div>
`, "login");

/* Register (stepper simplified) */
Pages.register = () => shell(`
  <div class="center">
    <div class="card" style="width:min(720px, 96vw)">
      <h2 class="page-title">Join FUSS Platform</h2>
      <div id="reg-steps">
        <div class="row">
          <div>
            <label>Flinders University Email</label>
            <input class="input" id="reg-email" placeholder="your.name@flinders.edu.au"/>
          </div>
          <div>
            <label>Password</label>
            <input class="input" id="reg-pass" type="password" placeholder="Choose a password"/>
          </div>
        </div>
        <div class="row">
          <div>
            <label>First Name</label>
            <input class="input" id="reg-fn" placeholder="Alex"/>
          </div>
          <div>
            <label>Last Name</label>
            <input class="input" id="reg-ln" placeholder="Chen"/>
          </div>
        </div>
        <button class="btn" id="reg-create">Create Account</button>
      </div>
    </div>
  </div>
`, "register");

/* Dashboard */
Pages.dashboard = () => shell(`
  <h2 class="page-title">Welcome back${App.state.user?`, ${App.state.user.name}`:''}!</h2>
  <div style="font-size:40px;font-weight:900" id="balance">${App.state.points}</div>
      <div class="pill">+15 this week</div>
    </div>
    <div class="flex" style="gap:10px">
      <button class="btn secondary" id="tx-history">Transaction History</button>
      <button class="btn" id="earn-points">+ Earn Credits</button>
    </div>
  </div>

  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin-top:14px">
    <div class="card">
      <div class="section-title">Active Requests</div>
      <div class="list">
        ${App.data.requests.map(r => `
          <div class="list-item">
            <div>
              <div class="label">${r.title}</div>
              <div class="small">${r.detail}</div>
              <div class="small">${r.duration}</div>
            </div>
            <div class="status ${r.status==='Pending'?'pending':r.status==='Confirmed'?'confirmed':'progress'}">${r.status}</div>
          </div>
        `).join('')}
      </div>
      <button class="btn link" style="margin-top:10px">View All Requests</button>
    </div>

    <div class="card">
      <div class="section-title">Skill Matches</div>
      <div class="list">
        ${App.data.skills.map(s=>`
        <div class="list-item">
          <div><div class="label">${s.provider}</div><div class="small">${s.name} </div></div>
          <button class="btn right" data-connect="${s.provider}">Connect</button>
        </div>`).join('')}
      </div>
      <button class="btn link" style="margin-top:10px" onclick="location.hash='#/browse'">Browse All Skills</button>
    </div>

    <div class="card">
      <div class="section-title">Upcoming Services</div>
      <div class="list">
        <div class="list-item" style="border-left-color:#c7d2fe">
          <div>
            <div class="label">Chemistry Lab Help</div>
            <div class="small">Tomorrow • 2:00 PM - 4:00 PM • Science Building, Lab 204</div>
          </div>
          <div class="badge">Tomorrow</div>
        </div>
        <div class="list-item" style="border-left-color:#fde68a">
          <div>
            <div class="label">Web Design Review</div>
            <div class="small">Friday • 10:00 AM - 11:30 AM • Online Session</div>
          </div>
          <div class="badge warn">Friday</div>
        </div>
      </div>
      <button class="btn link" style="margin-top:10px">View Calendar</button>
    </div>
  </div>
`, "dashboard");

/* Browse Skills */
Pages.browse = () => shell(`
  <h2 class="page-title">Browse Skills</h2>
  <input class="input" id="search" placeholder="Search for skills, tutoring, services…"/>
  <div class="chips" style="margin:12px 0 8px">
    ${["All Skills","Academic","Non-Academic","Tutoring","Languages","Technology","Creative"].map((c,i)=>`
      <div class="chip ${i===0?'active':''}" data-chip="${c}">${c}</div>`).join('')}
  </div>
  <div class="row">
    <div>
      <label>Specific Topic</label>
      <select id="topic">
        <option>All Topics</option>
        <option>Programming</option>
        <option>Math</option>
        <option>Design</option>
        <option>Spanish</option>
      </select>
    </div>
    </div>
  <div class="hr"></div>
  <div id="skill-results" class="grid cards"></div>
`, "browse");

function renderSkillResults(){
  const q = ($('#search')?.value||'').toLowerCase();
  const catActive = $('.chip.active')?.dataset.chip || 'All Skills';
  let items = App.data.skills.filter(s =>
    s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q)
  );
  if(catActive !== 'All Skills'){
    items = items.filter(s => (s.category===catActive) || (catActive==="Tutoring" && /tutor/i.test(s.name)));
  }
  const wrap = $('#skill-results'); if(!wrap) return;
  wrap.innerHTML = items.map(s=>`
    <div class="card">
      <div class="flex" style="justify-content:space-between">
        <div>
          <div class="section-title">${s.name}</div>
          <div class="small">by ${s.provider} </div>
        </div>
        <button class="btn" onclick="location.hash='#/request?provider=${encodeURIComponent(s.provider)}&skill=${encodeURIComponent(s.name)}'">Request</button>
      </div>
    </div>`).join('');
}

/* Request Service */
Pages.request = (params={}) => {
  const rate = 15;
  const provider = params.provider || "Alex Thompson";
  const skill = params.skill || "Python Programming Tutoring";
  return shell(`
  <div class="row">
    <div class="card">
      <div class="flex" style="gap:12px">
        <div class="avatar" style="width:48px;height:48px">A</div>
        <div>
          <div class="section-title">${provider}</div>
          <div class="small">3rd Year Engineering</div>
          <div class="small">⭐ 4.8 (24 reviews)</div>
        </div>
      </div>
      <div class="hr"></div>
      <div class="section-title">${skill}</div>
      <div class="badge warn">Credit Rate • 🪙 ${rate} per hour</div>
      <div class="hr"></div>
      <div class="small">Recent Reviews</div>
      <div class="list" style="margin-top:8px">
        <div class="list-item"><div>"Excellent tutor! Very patient and explains concepts clearly."</div></div>
        <div class="list-item"><div>"Helped me understand data structures. Highly recommend!"</div></div>
      </div>
    </div>

    <div class="card">
      <h3 class="section-title">Request Service</h3>
      <div class="row">
        <div>
          <label>Preferred Date</label>
          <input class="input" type="date" id="rq-date"/>
        </div>
        <div>
          <label>Preferred Time</label>
          <select id="rq-time" class="input">
            <option value="">Select time slot</option>
            <option>09:00</option><option>10:00</option><option>14:00</option><option>16:00</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div>
          <label>Estimated Duration (hours)</label>
          <select id="rq-dur" class="input">
            <option value="">Select duration</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label>Total Cost</label>
          <input class="input" id="rq-cost" placeholder="Select duration" disabled/>
        </div>
      </div>
      <label>Location Preference</label>
      <select id="rq-loc" class="input">
        <option value="">Select location</option>
        <option>Online</option><option>Library — Level 2</option><option>Science Building</option>
      </select>
      <div class="hr"></div>
      <label>Detailed Requirements</label>
      <textarea id="rq-notes" rows="4" class="input" placeholder="Please describe what you need help with…"></textarea>
      <div class="flex" style="margin-top:10px; justify-content:flex-end">
        <button class="btn secondary" onclick="history.back()">Cancel</button>
        <button class="btn" id="rq-submit">Submit Request</button>
      </div>
    </div>
  </div>
  `, "request");
};

/* Messages */
Pages.messages = () => {
  const names = Object.keys(App.data.conversations);
  const first = names[0];
  const conv = App.data.conversations[first];
  return shell(`
  <h2 class="page-title">Messages</h2>
  <div class="messages">
    <div class="card">
      <input class="input" placeholder="Search conversations…"/>
      <div class="hr"></div>
      <div class="list">
        ${names.map(n=>`
        <div class="list-item">
          <div class="avatar">S</div>
          <div>
            <div class="label">${n}</div>
            <div class="small">Python Programming</div>
          </div>
          <div class="badge right">2</div>
        </div>
        `).join('')}
      </div>
    </div>
    <div class="card">
      <div class="section-title">${first} <span class="badge ok">Active now</span></div>
      <div class="thread" id="thread">
        ${conv.map(m=>`<div class="bubble ${m.from==='me'?'me':'them'}">${m.text}</div>`).join('')}
      </div>
      <div class="flex" style="margin-top:8px">
        <input id="msg-input" class="input" placeholder="Type your message…"/>
        <button class="btn" id="msg-send">Send</button>
      </div>
    </div>
    <div class="card">
      <div class="section-title">Sarah Johnson</div>
      <div class="small">Computer Science Student • ★ 5.0 (12 reviews)</div>
      <div class="hr"></div>
      <div class="list">
        <div class="list-item"><div class="label">Python Programming — Basics</div><div class="right small">Rated 5 stars</div></div>
        <div class="list-item"><div class="label">Python Programming — OOP</div><div class="right small">In Progress</div></div>
      </div>
      <div class="hr"></div>
      <button class="btn">Schedule Session</button>
      <button class="btn secondary">Write Review</button>
    </div>
  </div>
  `,"messages");
};

/* Profile */
Pages.profile = () => {
  const u = App.state.user || {name:"Emma Thompson", email:"emma.thompson@flinders.edu.au", bio:""};
  const [first, ...rest] = (u.name||"Emma Thompson").split(" ");
  const last = rest.join(" ") || "Thompson";
  return shell(`
  <h2 class="page-title">Profile Management</h2>
  <div class="card">
    <div class="section-title">Personal Information</div>
    <div class="row">
      <div>
        <label>First Name</label>
        <input class="input" id="pf-first" value="${first}"/>
      </div>
      <div>
        <label>Last Name</label>
        <input class="input" id="pf-last" value="${last}"/>
      </div>
    </div>
    <label>Email Address</label>
    <input class="input" id="pf-email" value="${u.email||'alex.chen@flinders.edu.au'}" disabled/>
    <label>Bio</label>
    <textarea class="input" id="pf-bio" rows="4">${u.bio||"Third‑year Psychology student with a passion for mental health advocacy…"}</textarea>
    <div class="flex" style="justify-content:flex-end">
      <button class="btn" id="pf-save">Save Personal Information</button>
    </div>
  </div>
  `,"profile");
};

/* Reviews */
Pages.reviews = () => shell(`
  <h2 class="page-title">Peer Reviews & Ratings</h2>
  <div class="grid cards">
    <div class="card center"><div class="section-title">Average Rating</div><div style="font-size:36px;font-weight:900">4.8</div></div>
    <div class="card center"><div class="section-title">Total Reviews</div><div style="font-size:36px;font-weight:900">34</div></div>
    <div class="card center"><div class="section-title">Pending Reviews</div><div style="font-size:36px;font-weight:900">3</div></div>
    <div class="card center"><div class="section-title">Positive Reviews</div><div style="font-size:36px;font-weight:900">92%</div></div>
  </div>

  <div class="row" style="margin-top:12px">
    <div class="card">
      <div class="section-title">Python Programming Session</div>
      <div class="small">with Sarah Johnson • Completed • 2 days ago • 25 FUSSs</div>
      <div class="hr"></div>
      <div class="section-title">Service Summary</div>
      <div class="card" style="background:#f8fbff">Helped Sarah understand OOP concepts including classes and inheritance.</div>
    </div>
    <div class="card">
      <div class="section-title">Leave a Review</div>
      <div class="flex-col">
        <div>
          <label>Service Quality</label>
          <div class="stars" data-stars="quality">${"★★★★★".split("").map((s,i)=>`<span class="star" data-i="${i+1}">★</span>`).join("")}</div>
        </div>
        <div>
          <label>Communication</label>
          <div class="stars" data-stars="comm">${"★★★★★".split("").map((s,i)=>`<span class="star" data-i="${i+1}">★</span>`).join("")}</div>
        </div>
        <div>
          <label>Timeliness</label>
          <div class="stars" data-stars="time">${"★★★★★".split("").map((s,i)=>`<span class="star" data-i="${i+1}">★</span>`).join("")}</div>
        </div>
        <label>Written Feedback (Optional)</label>
        <textarea id="rv-text" class="input" rows="4" placeholder="Write your feedback…"></textarea>
        <div class="flex" style="justify-content:flex-end">
          <button class="btn" id="rv-submit">Submit Review</button>
        </div>
      </div>
    </div>
  </div>
`, "reviews");

/* Admin Overview */
Pages.admin = () => shell(`
  <h2 class="page-title">Platform Overview</h2>
  <div class="grid cards">
    <div class="card stat"><div class="n">2,847</div><div><div>Active Users</div><div class="kpi up">+12% from last month</div></div></div>
    <div class="card stat"><div class="n">1,523</div><div><div>Daily Transactions</div><div class="kpi up">+8% from yesterday</div></div></div>
    <div class="card stat"><div class="n">84,392</div><div><div>Credits Circulating</div><div class="kpi up">24h volume: 12,847</div></div></div>
    <div class="card stat"><div class="n">99.2%</div><div><div>System Health</div><div class="kpi up">Uptime this month</div></div></div>
  </div>
  <div class="row" style="margin-top:12px">
    <div class="card center" style="min-height:220px">
      <div class="small">Interactive analytics charts would be displayed here</div>
    </div>
    <div class="card">
      <div class="section-title">Top Trending Skills</div>
      <div class="rank-list">
        ${["Python Programming","Mathematics Tutoring","Essay Writing","Graphic Design"].map((t,i)=>`
          <div class="item"><div class="rank">${i+1}</div><div>${t}</div><div class="right kpi up">+${[23,18,15,12][i]}%</div></div>
        `).join('')}
      </div>
    </div>
  </div>
  <div class="card" style="margin-top:12px">
    <div class="section-title">Recent Platform Activity</div>
    <div class="list">
      <div class="list-item"><div class="label">New User Registration</div><div class="small">Sarah Wilson joined from Engineering Department</div><div class="right small">2 minutes ago</div></div>
    </div>
  </div>
`, "admin");

/* ---------- Router ---------- */
function parseParams(hash){
  const qIndex = hash.indexOf('?');
  if(qIndex===-1) return {};
  const params = {};
  const query = hash.slice(qIndex+1);
  query.split('&').forEach(kv=>{
    const [k,v] = kv.split('=');
    params[decodeURIComponent(k)] = decodeURIComponent(v||'');
  });
  return params;
}

function render(){
  const route = location.hash || '#/login';
  if(route.startsWith('#/logout')){
    App.state.user = null; App.state.points = 0; saveSession();
    location.hash = '#/login'; return;
  }
  if(!App.state.user && !route.startsWith('#/login') && !route.startsWith('#/register')){
    location.hash = '#/login'; return;
  }
  let view = '';
  if(route.startsWith('#/login')) view = Pages.login();
  else if(route.startsWith('#/register')) view = Pages.register();
  else if(route.startsWith('#/dashboard')) view = Pages.dashboard();
  else if(route.startsWith('#/browse')) { view = Pages.browse(); setTimeout(renderSkillResults,0); }
  else if(route.startsWith('#/request')) { view = Pages.request(parseParams(route)); }
  else if(route.startsWith('#/messages')) view = Pages.messages();
  else if(route.startsWith('#/profile')) view = Pages.profile();
  else if(route.startsWith('#/admin')) view = Pages.admin();
  else view = Pages.dashboard();
  $('#app').innerHTML = view;

  // attach page-specific handlers
  attachHandlers();
}

/* ---------- Handlers & Interactions ---------- */
function attachHandlers(){
  // Login
  const loginBtn = $('#login-btn');
  if(loginBtn){
    loginBtn.addEventListener('click', ()=>{
      const email = $('#login-email').value.trim();
      const pass = $('#login-pass').value.trim();
      if(!/@flinders\.edu\.au$/.test(email)){
        alert('Please use your @flinders.edu.au email'); return;
      }
      if(!pass){ alert('Enter your password'); return; }
      App.state.user = {name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g,m=>m.toUpperCase()), email};
      App.state.points = 0;
      saveSession();
      location.hash = '#/dashboard';
    });
    $$('.btn.secondary[data-demo]').forEach(b=>b.addEventListener('click', e=>{
      const role = e.target.getAttribute('data-demo');
      const email = role==='student' ? 'john.smith@flinders.edu.au' : 'sarah.wilson@flinders.edu.au';
      App.state.user = {name: role==='student'?'John Smith':'Sarah Wilson', email};
      App.state.points = 247; saveSession();
      location.hash = '#/dashboard';
    }));
  }

  // Register
  const regBtn = $('#reg-create');
  if(regBtn){
    regBtn.addEventListener('click', ()=>{
      const email = $('#reg-email').value.trim();
      const pass = $('#reg-pass').value.trim();
      const fn = $('#reg-fn').value.trim();
      const ln = $('#reg-ln').value.trim();
      if(!/@flinders\.edu\.au$/.test(email)) return alert('Use a valid @flinders.edu.au email');
      if(pass.length<4) return alert('Password must be at least 4 characters');
      App.state.user = {name:`${fn} ${ln}`, email, bio:''}; App.state.points = 125;
      saveSession(); location.hash = '#/dashboard';
    });
  }

  // Browse Skills: filters
  if($('#skill-results')){
    renderSkillResults();
    $('#search').addEventListener('input', renderSkillResults);
    $$('.chip').forEach(ch=>ch.addEventListener('click', e=>{
      $$('.chip').forEach(c=>c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderSkillResults();
    }));
  }

  // Request Service calculation + submit
  const dur = $('#rq-dur');
  if(dur){
    const cost = $('#rq-cost');
    dur.addEventListener('change', ()=>{
      const hours = Number(dur.value||0);
      const rate = 15;
      cost.value = hours ? String(hours*rate) : 'Select duration';
    });
    $('#rq-submit').addEventListener('click', ()=>{
      const hours = Number(dur.value||0);
      if(!hours) return alert('Select duration');
      alert('Request submitted!');
      location.hash = '#/dashboard';
    });
  }

  // Messages send
  const sendBtn = $('#msg-send');
  if(sendBtn){
    sendBtn.addEventListener('click', ()=>{
      const input = $('#msg-input');
      const text = input.value.trim();
      if(!text) return;
      const thread = $('#thread');
      thread.insertAdjacentHTML('beforeend', `<div class="bubble me">${text}</div>`);
      input.value = '';
      thread.scrollTop = thread.scrollHeight;
      // Simulated auto reply
      setTimeout(()=>{
        thread.insertAdjacentHTML('beforeend', `<div class="bubble them">Got it! See you soon.</div>`);
        thread.scrollTop = thread.scrollHeight;
      }, 600);
    });
  }

  // Profile save
  const pfSave = $('#pf-save');
  if(pfSave){
    pfSave.addEventListener('click', ()=>{
      const first = $('#pf-first').value.trim();
      const last = $('#pf-last').value.trim();
      const bio = $('#pf-bio').value.trim();
      App.state.user = {...App.state.user, name:`${first} ${last}`, bio};
      saveSession(); alert('Profile saved!');
    });
  }

  // Reviews star rating
  $$('.star', group).forEach((s,idx)=>{
        if(idx < i) s.classList.add('active'); else s.classList.remove('active');
      });
      group.dataset.value = i;
    }
  const rvSubmit = $('#rv-submit');
  if(rvSubmit){
    rvSubmit.addEventListener('click', ()=>{
      const vals = {};
      const text = $('#rv-text').value.trim();
      if(Object.values(vals).some(v=>v===0)) return alert('Please rate all categories');
      alert('Thank you for your review!');
      location.hash = '#/reviews';
    });
  }


window.addEventListener('hashchange', render);
window.addEventListener('load', render);
