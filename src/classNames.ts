type BasicClassValue = string | { [id: string]: any }
type ClassesValue<P> = BasicClassValue | ClassesArray<P> | ((props: P) => Classes<P>)
export type Classes<P> = ClassesValue<P> | ClassesArray<P> | TemplateStringsArray

interface ClassesArray<P> extends Array<ClassesValue<P>> {
}

export type TemplateStringsPlaceHolders<P> = (string | ((props: P) => string))[]

const isTemplateString = (classes: Classes<any>): classes is TemplateStringsArray => classes.hasOwnProperty('raw')

export const processClasses = <P>(
  classes: Classes<P>,
  props: P, templateStringPlaceholders: TemplateStringsPlaceHolders<P> = [],
): BasicClassValue => {
  if (isTemplateString(classes)) {
    return processAsTemplateString(classes, props, templateStringPlaceholders)
  }

  if (Array.isArray(classes)) {
    return classes.map(classesValue => processClasses(classesValue, props))
  }

  return processClassesValue(classes, props)
}

const preparePlaceholders = <P>(templateStringPlaceholders: TemplateStringsPlaceHolders<P>, props: P) => {
  return templateStringPlaceholders.map(placeholder => {
    return typeof placeholder === 'string' ? placeholder : placeholder(props)
  })
}

const compileClassnames = (placeholders: string[], classes: TemplateStringsArray) => {
  let className: string = ''

  placeholders.forEach((placeholder, i) => className += classes[i] + placeholder)

  return className + classes[classes.length - 1]
}

const processAsTemplateString = <P>(
  classes: TemplateStringsArray,
  props: P,
  templateStringPlaceholders: TemplateStringsPlaceHolders<P>,
): string => {
  const placeholders = preparePlaceholders(templateStringPlaceholders, props)

  return compileClassnames(placeholders, classes)
}

const processClassesValue = <P>(classesValue: ClassesValue<P>, props: P): BasicClassValue => {
  if (typeof classesValue === 'function') {
    return classesValue(props)
  }

  return classesValue
}
