import { ComponentType, FC } from 'react'
import { Classes, TemplateStringsPlaceHolders } from './classNames'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type PropsOf<
  Tag extends React.ComponentType<any>
  > = Tag extends React.FC<infer Props>
  ? Props & React.Attributes
  : Tag extends React.ComponentClass<infer Props>
    ? (Tag extends new (...args: any[]) => infer Instance
      ? Props & React.ClassAttributes<Instance>
      : never)
    : never

type FCWithClassNameOptional<P extends { className?: string }> = FC<PartialBy<P, 'className'>>
type ReactComponent = ComponentType<any>
type HTMLBasicElement = keyof JSX.IntrinsicElements

export type Tag = ReactComponent | HTMLBasicElement

type CreateClassedComponentFrom<Props> = <ExtraProps>(
  classes: Classes<ExtraProps & Props>,
  ...placeholders: TemplateStringsPlaceHolders<ExtraProps & Props>
) => FCWithClassNameOptional<ExtraProps & Props>

type CreateClassedComponentFromHtmlBasicElement<Tag extends HTMLBasicElement,
  Props extends JSX.IntrinsicElements[Tag] = JSX.IntrinsicElements[Tag]> = CreateClassedComponentFrom<Props>

type CreateClassedComponentFromReactComponent<Tag extends ReactComponent,
  Props extends PropsOf<Tag> = PropsOf<Tag>> = CreateClassedComponentFrom<Props>

interface BaseCreateClassed {
  <Tag extends HTMLBasicElement>(tag: Tag): CreateClassedComponentFromHtmlBasicElement<Tag>

  <Tag extends ReactComponent>(tag: Tag): CreateClassedComponentFromReactComponent<Tag>
}

export type ClassedTags = {
  a: CreateClassedComponentFromHtmlBasicElement<'a'>,
  abbr: CreateClassedComponentFromHtmlBasicElement<'abbr'>,
  address: CreateClassedComponentFromHtmlBasicElement<'address'>,
  area: CreateClassedComponentFromHtmlBasicElement<'area'>,
  article: CreateClassedComponentFromHtmlBasicElement<'article'>,
  aside: CreateClassedComponentFromHtmlBasicElement<'aside'>,
  audio: CreateClassedComponentFromHtmlBasicElement<'audio'>,
  b: CreateClassedComponentFromHtmlBasicElement<'b'>,
  base: CreateClassedComponentFromHtmlBasicElement<'base'>,
  bdi: CreateClassedComponentFromHtmlBasicElement<'bdi'>,
  bdo: CreateClassedComponentFromHtmlBasicElement<'bdo'>,
  big: CreateClassedComponentFromHtmlBasicElement<'big'>,
  blockquote: CreateClassedComponentFromHtmlBasicElement<'blockquote'>,
  body: CreateClassedComponentFromHtmlBasicElement<'body'>,
  br: CreateClassedComponentFromHtmlBasicElement<'br'>,
  button: CreateClassedComponentFromHtmlBasicElement<'button'>,
  canvas: CreateClassedComponentFromHtmlBasicElement<'canvas'>,
  caption: CreateClassedComponentFromHtmlBasicElement<'caption'>,
  cite: CreateClassedComponentFromHtmlBasicElement<'cite'>,
  code: CreateClassedComponentFromHtmlBasicElement<'code'>,
  col: CreateClassedComponentFromHtmlBasicElement<'col'>,
  colgroup: CreateClassedComponentFromHtmlBasicElement<'colgroup'>,
  data: CreateClassedComponentFromHtmlBasicElement<'data'>,
  datalist: CreateClassedComponentFromHtmlBasicElement<'datalist'>,
  dd: CreateClassedComponentFromHtmlBasicElement<'dd'>,
  del: CreateClassedComponentFromHtmlBasicElement<'del'>,
  details: CreateClassedComponentFromHtmlBasicElement<'details'>,
  dfn: CreateClassedComponentFromHtmlBasicElement<'dfn'>,
  dialog: CreateClassedComponentFromHtmlBasicElement<'dialog'>,
  div: CreateClassedComponentFromHtmlBasicElement<'div'>,
  dl: CreateClassedComponentFromHtmlBasicElement<'dl'>,
  dt: CreateClassedComponentFromHtmlBasicElement<'dt'>,
  em: CreateClassedComponentFromHtmlBasicElement<'em'>,
  embed: CreateClassedComponentFromHtmlBasicElement<'embed'>,
  fieldset: CreateClassedComponentFromHtmlBasicElement<'fieldset'>,
  figcaption: CreateClassedComponentFromHtmlBasicElement<'figcaption'>,
  figure: CreateClassedComponentFromHtmlBasicElement<'figure'>,
  footer: CreateClassedComponentFromHtmlBasicElement<'footer'>,
  form: CreateClassedComponentFromHtmlBasicElement<'form'>,
  h1: CreateClassedComponentFromHtmlBasicElement<'h1'>,
  h2: CreateClassedComponentFromHtmlBasicElement<'h2'>,
  h3: CreateClassedComponentFromHtmlBasicElement<'h3'>,
  h4: CreateClassedComponentFromHtmlBasicElement<'h4'>,
  h5: CreateClassedComponentFromHtmlBasicElement<'h5'>,
  h6: CreateClassedComponentFromHtmlBasicElement<'h6'>,
  head: CreateClassedComponentFromHtmlBasicElement<'head'>,
  header: CreateClassedComponentFromHtmlBasicElement<'header'>,
  hgroup: CreateClassedComponentFromHtmlBasicElement<'hgroup'>,
  hr: CreateClassedComponentFromHtmlBasicElement<'hr'>,
  html: CreateClassedComponentFromHtmlBasicElement<'html'>,
  i: CreateClassedComponentFromHtmlBasicElement<'i'>,
  iframe: CreateClassedComponentFromHtmlBasicElement<'iframe'>,
  img: CreateClassedComponentFromHtmlBasicElement<'img'>,
  input: CreateClassedComponentFromHtmlBasicElement<'input'>,
  ins: CreateClassedComponentFromHtmlBasicElement<'ins'>,
  kbd: CreateClassedComponentFromHtmlBasicElement<'kbd'>,
  keygen: CreateClassedComponentFromHtmlBasicElement<'keygen'>,
  label: CreateClassedComponentFromHtmlBasicElement<'label'>,
  legend: CreateClassedComponentFromHtmlBasicElement<'legend'>,
  li: CreateClassedComponentFromHtmlBasicElement<'li'>,
  link: CreateClassedComponentFromHtmlBasicElement<'link'>,
  main: CreateClassedComponentFromHtmlBasicElement<'main'>,
  map: CreateClassedComponentFromHtmlBasicElement<'map'>,
  mark: CreateClassedComponentFromHtmlBasicElement<'mark'>,
  menu: CreateClassedComponentFromHtmlBasicElement<'menu'>,
  menuitem: CreateClassedComponentFromHtmlBasicElement<'menuitem'>,
  meta: CreateClassedComponentFromHtmlBasicElement<'meta'>,
  meter: CreateClassedComponentFromHtmlBasicElement<'meter'>,
  nav: CreateClassedComponentFromHtmlBasicElement<'nav'>,
  noscript: CreateClassedComponentFromHtmlBasicElement<'noscript'>,
  object: CreateClassedComponentFromHtmlBasicElement<'object'>,
  ol: CreateClassedComponentFromHtmlBasicElement<'ol'>,
  optgroup: CreateClassedComponentFromHtmlBasicElement<'optgroup'>,
  option: CreateClassedComponentFromHtmlBasicElement<'option'>,
  output: CreateClassedComponentFromHtmlBasicElement<'output'>,
  p: CreateClassedComponentFromHtmlBasicElement<'p'>,
  param: CreateClassedComponentFromHtmlBasicElement<'param'>,
  picture: CreateClassedComponentFromHtmlBasicElement<'picture'>,
  pre: CreateClassedComponentFromHtmlBasicElement<'pre'>,
  progress: CreateClassedComponentFromHtmlBasicElement<'progress'>,
  q: CreateClassedComponentFromHtmlBasicElement<'q'>,
  rp: CreateClassedComponentFromHtmlBasicElement<'rp'>,
  rt: CreateClassedComponentFromHtmlBasicElement<'rt'>,
  ruby: CreateClassedComponentFromHtmlBasicElement<'ruby'>,
  s: CreateClassedComponentFromHtmlBasicElement<'s'>,
  samp: CreateClassedComponentFromHtmlBasicElement<'samp'>,
  script: CreateClassedComponentFromHtmlBasicElement<'script'>,
  section: CreateClassedComponentFromHtmlBasicElement<'section'>,
  select: CreateClassedComponentFromHtmlBasicElement<'select'>,
  small: CreateClassedComponentFromHtmlBasicElement<'small'>,
  source: CreateClassedComponentFromHtmlBasicElement<'source'>,
  span: CreateClassedComponentFromHtmlBasicElement<'span'>,
  strong: CreateClassedComponentFromHtmlBasicElement<'strong'>,
  style: CreateClassedComponentFromHtmlBasicElement<'style'>,
  sub: CreateClassedComponentFromHtmlBasicElement<'sub'>,
  summary: CreateClassedComponentFromHtmlBasicElement<'summary'>,
  sup: CreateClassedComponentFromHtmlBasicElement<'sup'>,
  table: CreateClassedComponentFromHtmlBasicElement<'table'>,
  tbody: CreateClassedComponentFromHtmlBasicElement<'tbody'>,
  td: CreateClassedComponentFromHtmlBasicElement<'td'>,
  textarea: CreateClassedComponentFromHtmlBasicElement<'textarea'>,
  tfoot: CreateClassedComponentFromHtmlBasicElement<'tfoot'>,
  th: CreateClassedComponentFromHtmlBasicElement<'th'>,
  thead: CreateClassedComponentFromHtmlBasicElement<'thead'>,
  time: CreateClassedComponentFromHtmlBasicElement<'time'>,
  title: CreateClassedComponentFromHtmlBasicElement<'title'>,
  tr: CreateClassedComponentFromHtmlBasicElement<'tr'>,
  track: CreateClassedComponentFromHtmlBasicElement<'track'>,
  u: CreateClassedComponentFromHtmlBasicElement<'u'>,
  ul: CreateClassedComponentFromHtmlBasicElement<'ul'>,
  var: CreateClassedComponentFromHtmlBasicElement<'var'>,
  video: CreateClassedComponentFromHtmlBasicElement<'video'>,
  wbr: CreateClassedComponentFromHtmlBasicElement<'wbr'>,
  circle: CreateClassedComponentFromHtmlBasicElement<'circle'>,
  clipPath: CreateClassedComponentFromHtmlBasicElement<'clipPath'>,
  defs: CreateClassedComponentFromHtmlBasicElement<'defs'>,
  ellipse: CreateClassedComponentFromHtmlBasicElement<'ellipse'>,
  foreignObject: CreateClassedComponentFromHtmlBasicElement<'foreignObject'>,
  g: CreateClassedComponentFromHtmlBasicElement<'g'>,
  image: CreateClassedComponentFromHtmlBasicElement<'image'>,
  line: CreateClassedComponentFromHtmlBasicElement<'line'>,
  linearGradient: CreateClassedComponentFromHtmlBasicElement<'linearGradient'>,
  mask: CreateClassedComponentFromHtmlBasicElement<'mask'>,
  path: CreateClassedComponentFromHtmlBasicElement<'path'>,
  pattern: CreateClassedComponentFromHtmlBasicElement<'pattern'>,
  polygon: CreateClassedComponentFromHtmlBasicElement<'polygon'>,
  polyline: CreateClassedComponentFromHtmlBasicElement<'polyline'>,
  radialGradient: CreateClassedComponentFromHtmlBasicElement<'radialGradient'>,
  rect: CreateClassedComponentFromHtmlBasicElement<'rect'>,
  stop: CreateClassedComponentFromHtmlBasicElement<'stop'>,
  svg: CreateClassedComponentFromHtmlBasicElement<'svg'>,
  text: CreateClassedComponentFromHtmlBasicElement<'text'>,
  tspan: CreateClassedComponentFromHtmlBasicElement<'tspan'>,
}

export type CreateClassedComponent = BaseCreateClassed & ClassedTags
