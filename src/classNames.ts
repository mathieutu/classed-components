import * as classNames from 'classnames'

type BasicClassValue = string | { [id: string]: any } | undefined | boolean
type ClassesValue<P> = BasicClassValue | ClassesValueArray<P> | ((props: P) => Classes<P>)
export type Classes<P> = ClassesValue<P> | ClassesValueArray<P> | TemplateStringsArray

export interface ClassesValueArray<P> extends Array<ClassesValue<P>> {
}

const isTemplateString = (classes: Classes<any>): classes is TemplateStringsArray => (
  Array.isArray(classes) && Object.prototype.hasOwnProperty.call(classes, 'raw')
)

export const processClasses = <P>(
  classes: Classes<P>,
  props: P, templateStringPlaceholders: ClassesValueArray<P> = [],
): BasicClassValue => {
  if (isTemplateString(classes)) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return processAsTemplateString(classes, props, templateStringPlaceholders)
  }

  if (typeof classes === 'function') {
    return processClasses(classes(props), props)
  }

  if (Array.isArray(classes)) {
    return classes.map((classesValue) => processClasses(classesValue, props))
  }

  return classes
}

const preparePlaceholders = <P>(templateStringPlaceholders: ClassesValueArray<P>, props: P) => (
  templateStringPlaceholders.map((placeholder) => classNames(processClasses(placeholder, props)))
)

const compileClassnames = (placeholders: string[], classes: TemplateStringsArray) => {
  const className = placeholders.reduce((acc, placeholder, i) => acc + classes[i] + placeholder, '')

  return (className + classes[classes.length - 1]).replace(/\s+/g, ' ').trim()
}

const processAsTemplateString = <P>(
  classes: TemplateStringsArray,
  props: P,
  templateStringPlaceholders: ClassesValueArray<P>,
): string => {
  const placeholders = preparePlaceholders(templateStringPlaceholders, props)

  return compileClassnames(placeholders, classes)
}
