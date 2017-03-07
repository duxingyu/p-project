(function() {
  const serachInp = getId('j-serachInp');
  const serachBox = getId('j-serachBox');
  const closeBtn = getId('j-closeBtn');
  const asideInfo = getId('j-asideInfo');
  const asideTab = getId('j-asideTab');
  let asideTabLi = asideTab.getElementsByTagName('li');
  let asideTabList = asideTab.nextElementSibling.children;

  serachInp.addEventListener('click', getHotkey);
  serachInp.addEventListener('click', e => {
    serachBox.style.display = 'block';
    e.stopPropagation();
  });

  serachBox.addEventListener('click', e => e.stopPropagation());

  function closeSerchBox() {
    serachBox.style.display = 'none';
  }
  closeBtn.addEventListener('click', closeSerchBox);
  document.addEventListener('click', closeSerchBox);

  // 侧边栏信息切换
  asideInfo.addEventListener('click', () => asideInfo.parentNode.classList.toggle('show'));
  // 侧边栏选项卡切换
  asideTab.addEventListener('mouseover', e => {
    let li = e.target;
    if (li.tagName === 'LI') {
      [...asideTabLi].forEach((v, i) => {
        const crt = li === v;
        v.classList.toggle('show', crt);
        asideTabList[i].classList.toggle('crt', crt);
      });
    }
  });

  // 全部商品分类
  const sortAll = getId('j-sortAll');
  const sortDetail = getId('j-sortDetail');
  let sortAllSec = sortDetail.getElementsByTagName('section');
  let sortAllList = [...sortAll.getElementsByTagName('li')];
  const oT = getRootTop(sortDetail);

  sortAllList.forEach((v, i) => {
    v.addEventListener('mouseenter', () => {
      sortAllList.forEach(v => v.className = '');
      v.classList.add('crt');
      sortDetail.style.visibility = 'visible';
      sortDetail.style.top = oT > window.scrollY ? '36px' : window.scrollY - oT + 36 + 'px';
      if (allsort) {
        getBriefNav(i);
        getBrandImg(i);
        getActImg(i);
        getDetailNav(i);
      }
    });
    v.addEventListener('mouseleave', () => v.classList.remove('crt'));
  });
  sortDetail.addEventListener('mouseenter', e => {
    let crt = e.relatedTarget;
    if (crt.tagName === 'LI') {
      sortAllList.forEach(v => v.classList.toggle('crt', v === crt));
    }
  });
  sortAll.addEventListener('mouseleave', () => {
    sortDetail.style.visibility = 'hidden';
    sortAllList.forEach(v => v.className = '');
  });

  function getBriefNav(num) {
    const briefNav = sortAllSec[0].querySelector('ul');
    let arr = allsort.nodes[num].nodes[1].tag;
    let oHtml = '';
    for (let i = 0; i < arr.length; i++) {
      oHtml += `<li><a href=${arr[i].linkUrl}>${arr[i].elementName}</a></li>`;
    }
    briefNav.innerHTML = oHtml;
  }

  function getBrandImg(num) {
    const brandImg = sortAllSec[2];
    let arr = allsort.nodes[num].nodes[2].tag;
    let oHtml = '';
    for (let i = 0; i < arr.length; i++) {
      oHtml += `<a href=${arr[i].linkUrl}><img src=https://image.suning.cn${arr[i].picUrl}></a>`;
    }
    brandImg.innerHTML = oHtml;
  }

  function getActImg(num) {
    const actImg = sortAllSec[3];
    let arr = allsort.nodes[num].nodes[3].tag;
    let oHtml = '';
    for (let i = 0; i < arr.length; i++) {
      oHtml += `<a href=${arr[i].linkUrl}><img src=https://image.suning.cn${arr[i].picUrl}></a>`;
    }
    actImg.innerHTML = oHtml;
  }

  function getDetailNav(num) {
    const detailNav = sortAllSec[1];
    let arr = allsort.nodes[num].nodes;
    let oHtml = '';

    for (let i = 4; i < arr.length; i++) {
      if (!arr[i].tag) {
        continue;
      }
      let dtname = arr[i].tag[0];
      oHtml += `<dl class="clearfix"><dt><a href=${dtname.linkUrl}>${dtname.elementName}</a></dt><dd>`;
      let ddname = arr[i].nodes[0].tag;

      if (!arr[i].nodes[0].tag) {
        continue;
      }
      for (let j = 0; j < ddname.length; j++) {
        oHtml += `<a href=${ddname[j].linkUrl} class=${ddname[j].elementDesc}>${ddname[j].elementName}</a>`;
      }
      oHtml += '</dd></dl>';
    }
    detailNav.innerHTML = oHtml;
  }

  // 大屏广告轮播图效果
  const adbg = getId('j-adbg');
  const sldl = getId('j-sldl');
  let sldlLi = [...sldl.getElementsByTagName('li')];
  // 翻页
  const spag = getId('j-spag');
  let spagLi = [...spag.getElementsByTagName('a')];
  // 上一页/下一页
  const prev = sldl.nextElementSibling;
  const next = prev.nextElementSibling;

  let timer = null;
  let num = -1;

  // 轮播效果主函数，传参用于鼠标移入翻页效果
  function change(number = num) {
    adbg.style.background = sldlLi[number].dataset.bg;
    sldlLi.forEach((v, i) => v.style.display = i == number ? 'block' : 'none');
    spagLi.forEach((v, i) => v.classList.toggle('crt', i === number));
    num = number;
  }
  // 用于上一页/下一页及定时器效果
  function angleBtn() {
    num = this === prev ? ((num - 1) % 6) : ((num + 1) % 6);
    if (num === -1) num = 5;
    change(num);
  }
  spagLi.forEach((v, i) => v.addEventListener('mouseenter', () => change(i)));

  prev.addEventListener('click', angleBtn);
  next.addEventListener('click', angleBtn);

  timer = setInterval(angleBtn, 3000);

  sldl.parentNode.addEventListener('mouseout', () => timer = setInterval(angleBtn, 3000));
  sldl.parentNode.addEventListener('mouseover', () => clearInterval(timer));
})();

// 搜素框下搜索关键词列表
jsonp('https://ds.suning.cn/ds/hotkeywords/0--showHotkeywords.xjsonp?callback=showHotkeywords');

function showHotkeywords(data) {

  getId('j-serachKeyWord').innerHTML = data.html;

  setTimeout(() => getId('j-serachInp').placeholder = getId('searchDefaultKeyword').value, 0);

  showHotkeywords = null;
}

// 搜索热搜词列表
function getHotkey() {

  jsonp('https://ds.suning.cn/ds/searchHotkeywords/0-searchHotkeywords.jsonp?callback=searchHotkeywords');

  this.removeEventListener('click', getHotkey);
  getHotkey = null;
}

function searchHotkeywords(data) {

  const serachHot = getId('j-serachHot');
  let oHtml = '';

  data.forEach(val =>
    oHtml += `<dd><a href="https://www.serach.suning.com/${val.urlKeyword}/">${val.keyword}</a></dd>`);
  serachHot.innerHTML += oHtml;
}

// 全部商品分类导航
jsonp('https://lib.suning.com/api/jsonp/cb/sortList_v5-threeSortLoad.jsonp?callback=threeSortLoad');
// 用于存储全部商品列表数据
let allsort = null;

function threeSortLoad(data) {
  allsort = data.allsort;
  threeSortLoad = null;
}
