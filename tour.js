// Photos supplied by YG to credited publications; city provenance checked 2026-11-13.
const tourPhotos={
  "GOYANG": {
    "file": "goyang",
    "source": "https://en.yna.co.kr/view/AEN20260823006000315",
    "publisher": "韓聯社",
    "label": "高陽站・舞台瞬間"
  },
  "OAKLAND": {
    "file": "oakland",
    "source": "https://baynewslab.com/다시-모인-빅뱅-오클랜드서-화려한-공연20주년-무대/",
    "publisher": "SF Bay News Lab",
    "label": "奧克蘭站・現場回顧"
  },
  "TAIPEI": {
    "file": "taipei",
    "source": "https://www.starnewskorea.com/en/music/2026/10/12/2026101215044545118",
    "publisher": "STARNEWS",
    "label": "台北站・現場照片集"
  }
};
const tourSource='https://ygbigbang.com/concert/worldtour/';
const jp='https://ygex.jp/bigbang/20th-anniv/';
// Dates and show times transcribed from the official itinerary, checked 2026-11-13.
const tourStops=[
['高陽','GOYANG','亞洲','韓國','高陽綜合運動場','2026-08-21 19:30,2026-08-22 19:30,2026-08-23 19:00'],
['奧克蘭','OAKLAND','北美洲','美國','Oakland–Alameda County Coliseum','2026-09-04 20:00,2026-09-05 20:00'],
['東盧瑟福','EAST RUTHERFORD','北美洲','美國','MetLife Stadium','2026-09-11 20:00'],
['巴黎','PARIS','歐洲','法國','Stade de France','2026-09-19 20:00'],
['倫敦','LONDON','歐洲','英國','Tottenham Hotspur Stadium','2026-09-26 19:00'],
['台北','TAIPEI','亞洲','台灣','臺北大巨蛋','2026-10-09 18:00,2026-10-10 18:00,2026-10-11 18:00'],
['新加坡','SINGAPORE','亞洲','新加坡','Singapore National Stadium','2026-10-17 19:00,2026-10-18 19:00'],
['河內','HANOI','亞洲','越南','My Dinh National Stadium','2026-10-24 19:30,2026-10-25 19:30'],
['雪梨','SYDNEY','大洋洲','澳洲','Accor Stadium','2026-10-31 19:30'],
['曼谷','BANGKOK','亞洲','泰國','Rajamangala National Stadium','2026-11-07 19:00,2026-11-08 19:00'],
['香港','HONG KONG','亞洲','香港','啟德主場館','2026-11-13 19:00,2026-11-14 18:00,2026-11-15 18:00,2026-11-17 19:00','https://hkt.hkticketing.com/en/'],
['大阪','OSAKA','亞洲','日本','京瓷巨蛋大阪','2026-11-27 18:00,2026-11-28 17:00,2026-11-29 17:00',jp],
['名古屋','NAGOYA','亞洲','日本','Vantelin Dome Nagoya','2026-12-05 17:00,2026-12-06 17:00',jp],
['東京','TOKYO','亞洲','日本','東京巨蛋','2026-12-13 17:00,2026-12-14 18:00,2026-12-15 18:00',jp],
['福岡','FUKUOKA','亞洲','日本','Mizuho PayPay Dome Fukuoka','2026-12-26 17:00,2026-12-27 17:00',jp],
['吉隆坡','KUALA LUMPUR','亞洲','馬來西亞','TM Stadium Nasional','2027-01-09 20:00,2027-01-10 19:00','https://www.fantopia.io/events-tickets?eventsKey=0peucdui'],
['雅加達','JAKARTA','亞洲','印尼','Jakarta International Stadium','2027-01-16 19:00,2027-01-17 19:00','https://bigbanginjakarta.com/'],
['馬尼拉','MANILA','亞洲','菲律賓','SMDC Festival Grounds','2027-02-20 19:00','https://ticketmaster.ph/activity/detail/27ph_bigbang2027'],
['高雄','KAOHSIUNG','亞洲','台灣','高雄國家體育場（世運主場館）','2027-02-26 18:30,2027-02-27 18:30,2027-02-28 18:30','https://bigbang.bstage.in/contents/6a8e4a6343f12b6e1b69c4c0'],
['洛杉磯','LOS ANGELES','北美洲','美國','SoFi Stadium','2027-03-13 19:00','https://www.ticketmaster.com/event/0A00655ED2B19A8C']
].map(([city,en,region,country,venue,dates,ticket],index)=>({city,en,region,country,venue,dates:dates.split(','),ticket,id:index}));
function renderTourPhotos(s){
 const p=tourPhotos[s.en];
 if(!p)return '';
 return `<figure class="tour-photo"><a class="tour-photo-image" href="assets/tour-${p.file}.jpg" target="_blank" rel="noopener noreferrer" aria-label="開啟${p.label}完整照片"><img src="assets/tour-${p.file}.jpg" alt="BIGBANG XX : COSMOS ${p.label}，照片由 YG Entertainment 提供" loading="lazy" decoding="async"><span>點開看完整照片 ↗</span></a><figcaption><strong>${p.label}</strong><span>照片提供：YG Entertainment</span><a href="${p.source}" target="_blank" rel="noopener noreferrer">來源：${p.publisher} ↗</a></figcaption></figure>`;
}
function renderTours(){
 const year=document.querySelector('#tour-year').value,region=document.querySelector('#tour-region').value,period=document.querySelector('#tour-period').value;
 const list=tourStops.map(s=>({...s,shown:s.dates.filter(d=>(year==='all'||d.startsWith(year))&&(period==='all'||(period==='upcoming'?d.slice(0,10)>='2026-11-13':d.slice(0,10)<'2026-11-13')))})).filter(s=>s.shown.length&&(region==='all'||s.region===region)&&(s.city+s.en+s.country+s.venue).toLowerCase().includes(document.querySelector('#search').value.toLowerCase()));
 document.querySelector('#tour-count').textContent=`${list.length} 個城市 · ${list.reduce((n,s)=>n+s.shown.length,0)} 場演出`;
 document.querySelector('#tour-list').innerHTML=list.map(s=>`<article class="tour-stop"><div class="tour-city"><span>${s.country} / ${s.region}</span><h3>${s.city}</h3><small>${s.en}</small><p>${s.venue}</p></div><div class="tour-dates">${s.shown.map(d=>`<div><time datetime="${d.replace(' ','T')}">${d.slice(0,10).replaceAll('-','.')} <b>${d.slice(11)}</b></time><small>${d.slice(0,10)<'2026-11-13'?'日期已過':d.slice(0,10)==='2026-11-13'?'查核當日':'已公告'}</small></div>`).join('')}</div><div class="tour-actions"><a href="${tourSource}" target="_blank" rel="noopener noreferrer">官方場次 ↗</a>${s.ticket?`<a class="ticket" href="${s.ticket}" target="_blank" rel="noopener noreferrer">${s.city==='高雄'?'高雄售票公告':s.country==='日本'?'日本票務資訊':'官方售票入口'} ↗</a>`:'<small>查核時官方標示售罄</small>'}${s.city==='高雄'?'<small>02.26 售票資訊待公布</small><a href="https://kham.com.tw/application/UTK02/UTK0201_.aspx?PRODUCT_ID=P1EMCIC6" target="_blank" rel="noopener noreferrer">02.27 寬宏售票 ↗</a><a href="https://kham.com.tw/application/UTK02/UTK0201_.aspx?PRODUCT_ID=P1EVUYWG" target="_blank" rel="noopener noreferrer">02.28 寬宏售票 ↗</a>':''}</div>${renderTourPhotos(s)}</article>`).join('')||'<div class="tour-empty">找不到符合的場次，請調整年份、地區或搜尋關鍵字。</div>';
}
document.querySelectorAll('.tour-controls select').forEach(s=>s.addEventListener('change',renderTours));
