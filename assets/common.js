/* =============================================================
   common.js — 全站共享交互（index / about / contact 三页通用）
   功能：导航滚动加深、移动端汉堡菜单、回到顶部
   依赖元素（缺失时自动跳过）：
     #header                       导航栏
     #menu-btn / #mobile-menu      汉堡按钮与下拉菜单
     #back-to-top                  回到顶部按钮，可用 data-offset
                                   指定显示阈值（默认 300px）
   ============================================================= */
(function () {
  'use strict';

  /* —— 导航滚动加深 + 回到顶部显隐（合并为单个滚动监听） —— */
  const header = document.getElementById('header');
  const backBtn = document.getElementById('back-to-top');
  const backOffset = Number(backBtn?.dataset.offset || 300);

  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    if (backBtn) {
      const visible = window.scrollY > backOffset;
      backBtn.classList.toggle('opacity-0', !visible);
      backBtn.classList.toggle('invisible', !visible);
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (backBtn) {
    backBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* —— 图片右键 / 拖拽保护（捕获阶段，全局生效） ——
     拦截范围：所有 <img>、作品卡片、详情弹窗。
     捕获阶段执行，保证先于浏览器原生右键菜单，阻止“图片另存为 / 复制图片”。 */
  const isProtected = (target) =>
    target instanceof Element &&
    target.closest('img, .portfolio-card, #image-modal');

  document.addEventListener('contextmenu', (e) => {
    if (isProtected(e.target)) e.preventDefault();
  }, true);

  document.addEventListener('dragstart', (e) => {
    if (isProtected(e.target)) e.preventDefault();
  }, true);

  /* —— 移动端菜单 —— */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    const icon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });

    // 点击任意导航链接后收起菜单（页内锚点需要，跨页链接无副作用）
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      });
    });
  }
})();
