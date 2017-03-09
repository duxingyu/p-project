(function() {
  const activeEnter = getId('j-activeEnter');
  const prev = activeEnter.nextElementSibling;
  const next = prev.nextElementSibling;

  activeEnter.innerHTML += activeEnter.innerHTML;
  activeEnter.style.width = parseInt(getComputedStyle(activeEnter).width) * 2 + 'px';

  // next/prev处理函数
  function loop(dir) {
    let timer = null;
    return function() {
      if (timer != null) return;
      let v = dir === 'next' ? -100 : 100;
      const nodeStyle = getComputedStyle(activeEnter);
      let oL = parseInt(nodeStyle.left);
      const oW = parseInt(nodeStyle.width);
      let startDis;

      if (oL === 0) {
        oL = -oW / 2;
      } else if (oL === 1000 - oW) {
        oL += oW / 2;
      }
      startDis = oL;
      activeEnter.style.left = oL + 'px';

      timer = setInterval(() => {
        // 当到达指定位置后，清除定时器，timer设为null以便可以再次执行
        if (Math.abs(oL - startDis) === 1000) {
          clearInterval(timer);
          timer = null;
          return;
        }
        oL = oL + v;
        activeEnter.style.left = oL + 'px';
      }, 20);
    };
  }


  // 对prev/next绑定事件
  prev.addEventListener('click', loop());
  next.addEventListener('click', loop('next'));

  // 必抢清单
  const bqqd = getId('j-bqqd');
  let bqqdTab = [...bqqd.children[1].children];
  let bqqdList = [...bqqd.children[2].children];

  bqqdTab.forEach((val, index) => {
    val.addEventListener('mouseenter', () => {
      bqqdTab.forEach((v, i) => {
        v.classList.toggle('crt', i === index);
        bqqdList[i].classList.toggle('crt', i === index);
      })
    })
  })

})();

// 放心去喜欢
function lazyload184362(data) {
  const homepage = getId('j-homePage');
  homepage.innerHTML = data.data.replace(/\<script type=\"text\/html\"\>(\W+.+\W+.+\W\W)\<\/script\>/g, '$1').replace(/(\/\/image)/g, 'https:$1');
  [...homepage.getElementsByTagName('img')].forEach(val => {
    if (!val.src) {
      val.src = val.getAttribute('lazy-src')
    }
  });
  lazyload184362 = null;
}

// 精选好货

function hhCb(data) {
  const jxhh = document.getElementById('j-jxhh');
  const aLink = jxhh.getElementsByTagName('a');
  let d = data.sugGoods[0].skus;
  [...aLink].forEach((val, index) => {
    val.href = `https://news.suning.com/ditem.html?contentId=${d.contentId}`;
    val.children[0].innerHTML = d[index].txtDes;
    val.children[1].src = `https://image.suning.cn/uimg/b2c/qrqm/${d[index].vendorId}${d[index].sugGoodsCode}_200x200.jpg?ver=${d[index].picVersion}`;
  });
  hhCb = null;
}

// 为您推荐

function recommandListSix(data) {
  const wntj = document.getElementById('j-wntj').getElementsByTagName('ul')[0];
  let d = data.sugGoods[0].skus;
  let oHtml = '';

  for (let i = 0; i < 6; i++) {
    let di = d[i];
    let nam = di.sugGoodsName;
    let cod = di.sugGoodsCode;
    let dia = `<a href="https://product.suning.com/${di.vendorId}/${cod.substring(9)}.html?srcPoint=index3_none_rectopcnxh_1-1_p_0000000000_102878794_01A_4-2_0_A&src=index3_none_rectopcnxh_1-1_p_0000000000_102878794_01A_4-2_0_A" title="${nam}">`;
    oHtml +=
      `<li class="item">
        ${dia}
          <img alt="${nam}" src="https://image.suning.cn/uimg/b2c/newcatentries/${di.vendorId}-${cod}_1_160x160.jpg">
        </a>
        <p>${dia}${nam}</a></p>
        <span><i>￥</i><em>${di.price}</em></i></span>
      </li>`;
  }
  wntj.innerHTML = oHtml;
  recommandListSix = null;
}

// F1 服装百货

function lazyload184374(data) {
  const floor1 = getId('j-floor1');
  const ftab = [...floor1.children[1].children];

  floor1.children[2].innerHTML += data.data;
  let aPic = floor1.getElementsByTagName('img');
  let aP = floor1.getElementsByTagName('p');
  [...aPic].forEach(val => {
    if (val.getAttribute('lazy-src')) {
      val.src = 'https:' + val.getAttribute('lazy-src');
    }
    if (val.getAttribute('d-src')) {
      val.src = 'https:' + val.getAttribute('d-src');
    }
  });
  for (let attr of aP) {
    if (attr.getAttribute('d-content')) {
      attr.innerHTML = attr.getAttribute('d-content');
    }
  }
  const flist = [...floor1.children[2].children].splice(1);

  ftab.forEach((val, index) => {
    val.addEventListener('mouseenter', () => {
      ftab.forEach((v, i) => {
        v.classList.toggle('on', i === index);
        flist[i].style.display = i === index ? 'block' : 'none';
        let sc = flist[i].querySelector('script');
        if (sc) {
          flist[i].innerHTML = sc.innerHTML.replace(/(\/\/image)/g, 'https:$1').replace(/(price\"\>)/g, '$1<i>¥</i><span>888</span>');
        }
      });
    });
  });
  lazyload184374 = null;
}

function recommandAll(data) {
  const recommandList = document.getElementById('j-recommandList');
  let d = data.sugGoods[0].skus;
  let oHtml = '';
  let len = d.length % 6 === 0 ? d.length : d.length - (d.length % 6);

  for (let i = 0; i < len; i++) {
    let di = d[i];
    let nam = di.sugGoodsName;
    let cod = di.sugGoodsCode;
    let dia = `<a href="https://product.suning.com/${di.vendorId}/${cod.substring(9)}.html?srcPoint=index3_none_recscnxh_1-47_p_0000000000_103637781_01A_6-1_0_A&src=index3_none_recscnxh_1-47_p_0000000000_103637781_01A_6-1_0_A" title="${nam}">`;
    oHtml +=
      `<li class="item${i%6+1}">
        ${dia}
          <img alt="${nam}" src="https://image.suning.cn/uimg/b2c/newcatentries/${di.vendorId}-${cod}_1_160x160.jpg">
        </a>
        <p>${dia}${nam}</a></p>
        <span class="price"><i>￥</i><em>${di.price}</em></i></span>`;
    oHtml += di.promotionType == '1' ? '<span class="cuxiao">大聚惠</span></li>' : '</li>';
  }
  recommandList.innerHTML = oHtml;

  recommandAll = null;
}
