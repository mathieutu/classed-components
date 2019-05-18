import * as classNames from 'classnames'
import { createElement } from 'react'
import { Classes, ClassesValueArray, processClasses } from './classNames'
import { tags } from './tags'
import { CreateClassedComponent, Tag } from './types'

const tagDisplayName = (tag: Tag) => typeof tag === 'string' ? tag : tag.displayName || tag.name

const createClassed: any = (tag: Tag) => {
  return (classes: Classes<any>, ...placeholders: ClassesValueArray<any>) => {
    const Hoc = (props: any) => {

      const className = classNames(
        processClasses(classes, props, placeholders),
        props.className,
      )

      return createElement(tag, { ...props, className })
    }

    Hoc.displayName = `Classed(${tagDisplayName(tag)})`

    return Hoc
  }
}

tags.forEach(tagName => {
  createClassed[tagName] = createClassed(tagName)
})

export const classed: CreateClassedComponent = createClassed

export default classed
