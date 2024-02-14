import { clsx } from 'clsx'
import { createElement, forwardRef } from 'react'
import { Classes, ClassesValueArray, processClasses } from './classNames'
import { filterPropsToForward, tags } from './tags'
import { CreateClassedComponent, Tag } from './types'

const tagDisplayName = (tag: Tag) => (typeof tag === 'string' ? tag : tag.displayName || tag.name)

const createClassed: any = (tag: Tag) => (classes: Classes<any>, ...placeholders: ClassesValueArray<any>) => {
  const Hoc = forwardRef((props: { className?: string }, ref) => {
    const className = clsx(
      processClasses(classes, props, placeholders),
      props.className,
    )

    const propsToForward = filterPropsToForward(tag, props)

    return createElement(tag, { ...propsToForward, ref, className })
  })

  Hoc.displayName = `Classed(${tagDisplayName(tag)})`

  return Hoc
}

tags.forEach((tagName) => {
  createClassed[tagName] = createClassed(tagName)
})

export const classed: CreateClassedComponent = createClassed

export default classed
