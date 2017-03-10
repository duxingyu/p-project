/**
 * jsonp
 * @param {string} link
 */
function jsonp(link) {
  const sc = document.createElement('script');
  sc.src = `${link}&_=${+new Date}`;
  sc.className = 'jsonp';
  document.body.appendChild(sc).parentNode.removeChild(sc);
}
/**
 * 获取ID
 * @param {string} id 
 */
function getId(id) {
  return document.getElementById(id);
}
/**
 * 获取元素到文档顶部的高度，返回数字
 * @param {HTMLElement} node 
 */
function getRootTop(node) {
  let oT = 0;
  do {
    oT += node.offsetTop;
    node = node.offsetParent;
  } while (node.tagName !== 'BODY');
  return oT;
}
// 懒加载获取jsonp数据所需ID，链接
let topList = {
  homepage: ['j-homePage', 'https://lib.suning.com/homepage/model/homepage1_184362_lazyload184362.json?callback=lazyload184362'],
  jxhh: ['j-jxhh', 'https://tuijian.suning.com/recommend-portal/dyBase.jsonp?u=&c=148836310511822991&cityId=010&sceneIds=10-64&count=6&callback=hhCb'],
  wntj: ['j-wntj', 'https://tuijian.suning.com/recommend-portal/recommendv2/biz.jsonp?&u=&c=148836310511822991&cityId=358&sceneIds=9-7&count=10&callback=recommandListSix'],
  floor1: ['j-floor1', 'https://lib.suning.com/homepage/model/homepage1_184374_lazyload184374.json?callback=lazyload184374'],
  recommandlist: ['j-recommandList', 'https://tuijian.suning.com/recommend-portal/recommendv2/biz.jsonp?&u=&c=148836310511822991&cityId=9252&sceneIds=12-14&count=48&callback=recommandAll']
};
// 根据ID计算出顶部和底部到文档顶部的高度

(function getTop() {
  for (let attr in topList) {
    const id = topList[attr][0];
    topList[attr][0] = getRootTop(getId(id));
    topList[attr][2] = getComputedStyle(getId(id)).height + topList[attr][0];
  }
})();
/**
 * 懒加载
 */
function lazyLoad() {
  let oT = window.scrollY;
  let oB = oT + document.documentElement.clientHeight;
  // 如果没数据了，将不需要的函数及变量设为null，移除事件
  if (!Object.keys(topList).length) {
    window.removeEventListener('scroll', lazyLoad);
    lazyLoad = null;
    topList = null;
    return;
  }
  // 遍历topList，如果在窗口区域，则获取相应数据，并删除对应属性
  for (let attr in topList) {
    const crt = topList[attr];
    if (!(crt[0] > oB || crt[2] < oT)) {
      jsonp(crt[1]);
      delete topList[attr];
    }
  }
}

lazyLoad();
window.addEventListener('scroll', lazyLoad);

(function() {
  // 回到顶部
  const toTop = getId('j-top');
  toTop.addEventListener('click', () => {
    let timer = null;

    timer = setInterval(() => {
      let v = -100;
      if (window.scrollY <= -v) {
        v = -window.scrollY;
        clearInterval(timer);
      }
      window.scrollBy(0, v);
    }, 20);
  });
})();
