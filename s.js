class CSSPreprocessor {
  static shortcuts = {
  // Позиционирование и геометрия
  pos: 'position',
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left',
  z: 'z-index',
  v: 'visibility',
  inset: 'inset',
  insetx: 'inset-inline',
  insety: 'inset-block',

  // Размеры
  w: 'width',
  h: 'height',
  mw: 'max-width',
  mh: 'max-height',
  minw: 'min-width',
  minh: 'min-height',
  boxs: 'box-sizing',

  // Отступы (margin)
  m: 'margin',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mx: 'margin-inline',
  my: 'margin-block',
  mgap: 'margin-gap',

  // Внутренние отступы (padding)
  p: 'padding',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
  px: 'padding-inline',
  py: 'padding-block',
  pgap: 'padding-gap',

  // Фон
  bg: 'background',
  bgc: 'background-color',
  bgi: 'background-image',
  bgr: 'background-repeat',
  bgs: 'background-size',
  bga: 'background-attachment',
  bgp: 'background-position',
  bgx: 'background-origin',
  bgy: 'background-clip',
  bgblend: 'background-blend-mode',

  // Границы
  b: 'border',
  bt: 'border-top',
  br: 'border-right',
  bb: 'border-bottom',
  bl: 'border-left',
  brad: 'border-radius',
  bw: 'border-width',
  bc: 'border-color',
  bs: 'border-style',
  btw: 'border-top-width',
  brw: 'border-right-width',
  bbw: 'border-bottom-width',
  blw: 'border-left-width',
  btc: 'border-top-color',
  brc: 'border-right-color',
  bbc: 'border-bottom-color',
  blc: 'border-left-color',
  bts: 'border-top-style',
  brs: 'border-right-style',
  bbs: 'border-bottom-style',
  bls: 'border-left-style',
  bdash: 'border-dasharray',

  // Тени
  sh: 'box-shadow',
  ts: 'text-shadow',

  // Типографика
  ff: 'font-family',
  fs: 'font-size',
  fw: 'font-weight',
  fh: 'font-height',
  ls: 'letter-spacing',
  ws: 'word-spacing',
  lh: 'line-height',
  ta: 'text-align',
  td: 'text-decoration',
  tt: 'text-transform',
  vw: 'vertical-align',
  c: 'color',
  op: 'opacity',
  whs: 'white-space',
  textw: 'text-wrap',
  texto: 'text-overflow',
  textu: 'text-underline-position',

  // Переполнение и обрезка
  ow: 'overflow',
  ox: 'overflow-x',
  oy: 'overflow-y',
  tow: 'text-overflow',
  clip: 'clip',
  clippath: 'clip-path',

  // Трансформации
  trf: 'transform',
  trl: 'translate',
  trlx: 'translateX',
  trly: 'translateY',
  rot: 'rotate',
  scl: 'scale',
  skw: 'skew',
  org: 'transform-origin',
  pers: 'perspective',
  preserve3d: 'transform-style',

  // Анимации
  an: 'animation',
  anm: 'animation-name',
  and: 'animation-duration',
  ane: 'animation-timing-function',
  ani: 'animation-iteration-count',
  andl: 'animation-delay',
  anfd: 'animation-fill-mode',
  anps: 'animation-play-state',
  tn: 'transition',
  tp: 'transition-property',
  tdr: 'transition-duration',
  tfn: 'transition-timing-function',
  tdl: 'transition-delay',

  // Гибкие контейнеры (Flexbox)
  d: 'display',
  fxd: 'flex-direction',
  jcc: 'justify-content',
  alc: 'align-content',
  ais: 'align-items',
  as: 'align-self',
  fg: 'flex-grow',
  fb: 'flex-basis',
  fsh: 'flex-shrink',
  ord: 'order',
  wrap: 'flex-wrap',

  // Grid-разметка
  gtd: 'grid-template-columns',
  gtr: 'grid-template-rows',
  gta: 'grid-template-areas',
  gc: 'grid-column',
  gr: 'grid-row',
  gap: 'gap',
  cgap: 'column-gap',
  rgap: 'row-gap',
  gauto: 'grid-auto-flow',
  gauc: 'grid-auto-columns',
  gaur: 'grid-auto-rows',

  // Фильтры и эффекты
  flt: 'filter',
  blr: 'blur',
  con: 'contrast',
  sat: 'saturate',
  htg: 'hue-rotate',
  inv: 'invert',
  gray: 'grayscale',
  sep: 'sepia',
  bright: 'brightness',

  // Псевдоэлементы и псевдоклассы
  before: '::before',
  after: '::after',
  firstl: '::first-line',
  firstc: '::first-letter',
  sel: '::selection',
  hover: ':hover',
  focus: ':focus',
  active: ':active',
  disabled: ':disabled',
  checked: ':checked',

  // Прочие
  cur: 'cursor',
  usr: 'user-select',
  ap: 'appearance',
  res: 'resize',
  out: 'outline',
  outw: 'outline-width',
  outc: 'outline-color',
  outs: 'outline-style',
  cnt: 'content',
  q: 'quotes',
  ptr: 'pointer-events',
  usrsl: 'user-select',
  isol: 'isolation',
  mixblend: 'mix-blend-mode',
  willchange: 'will-change',
  backdrop: 'backdrop-filter',
  scrollb: 'scroll-behavior',
  overscroll: 'overscroll-behavior'
};

  static process(css) {
    return css.replace(
      /([^\-]|^)([a-z]+)\s*:\s*/g,  // Ключевое изменение: ([^\-]|^)
      (match, prefix, shortcut) => {
        if (CSSPreprocessor.shortcuts[shortcut]) {
          return `${prefix}${CSSPreprocessor.shortcuts[shortcut]}: `;
        }
        return match;
      }
    );
  }

  static processAllStyleTags() {
    const styleTags = document.querySelectorAll('style');
    styleTags.forEach(tag => {
      const currentCSS = tag.textContent || tag.innerText || '';
      const processedCSS = CSSPreprocessor.process(currentCSS);
      tag.textContent = processedCSS;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  CSSPreprocessor.processAllStyleTags();
});
