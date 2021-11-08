import * as React from 'react'
import { create } from 'react-test-renderer'
import { classed } from '../src'

const assertEquals = (expected: React.ReactElement, actual: React.ReactElement) => (
  expect(create(expected).toJSON()).toEqual(create(actual).toJSON())
)

describe('Basic tests', () => {
  test('it allows passing basic html tag', () => {
    const Nav = classed('nav')('')

    assertEquals(<Nav />, <nav className="" />)
  })

  test('it has handy shortcuts for basic html tag', () => {
    const Nav = classed.nav('')

    assertEquals(<Nav />, <nav className="" />)
  })

  test('it forwards the original props and children', () => {
    const A = classed.a('')

    assertEquals(<A href="#">foo</A>, <a className="" href="#">foo</a>)
  })

  test('it allows passing custom components', () => {
    const ExternalLink = (props: any) => <a target="_blank" rel="noopener noreferer" {...props} />

    const MenuLink = classed(ExternalLink)('')

    assertEquals(
      <MenuLink href="#">foo</MenuLink>,
      <a href="#" className="" target="_blank" rel="noopener noreferer">foo</a>,
    )
  })

  test('it forwards refs to the created elements', () => {
    const ref = jest.fn()
    const MenuLink = classed.a('my-class')

    create(
      <MenuLink href="#" ref={ref}>foo</MenuLink>,
      { createNodeMock: element => element } // https://reactjs.org/docs/test-renderer.html#ideas
    )

    expect(ref.mock.calls[0]).toEqual([{
      props: {
        href: '#',
        className: 'my-class',
        children: 'foo',
      },
      type: 'a'
    }])
  })

  test('in fact it just fills the className props of the provided components', () => {
    const UnClassableLink = ({ className, ...props }: any) => <a {...props}>{className}</a>

    const MenuLink = classed(UnClassableLink)`all these classes`

    assertEquals(<MenuLink href="#">foo</MenuLink>, <a href="#">all these classes</a>)
  })
})

describe('Test classes root argument syntaxes', () => {
  test('it allows passing classes as an array of string', () => {
    const Nav = classed.nav(['all', 'these', 'classes'])

    assertEquals(<Nav>foo</Nav>, <nav className="all these classes">foo</nav>)
  })

  test('it allows passing classes as a string', () => {
    const Nav = classed.nav('all these classes')

    assertEquals(<Nav>foo</Nav>, <nav className="all these classes">foo</nav>)
  })

  test('it allows passing classes as an object', () => {
    const Nav = classed.nav({ 'this one': true, 'not that one': false })

    assertEquals(<Nav>foo</Nav>, <nav className="this one">foo</nav>)
  })

  test('it allows passing classes as a function', () => {
    const Nav = classed.nav(() => 'all these classes')

    assertEquals(<Nav>foo</Nav>, <nav className="all these classes">foo</nav>)
  })

  test('it allows passing classes as a tagged template string', () => {
    const Nav = classed.nav`
      all
      these
      classes
    `

    assertEquals(<Nav>foo</Nav>, <nav className="all these classes">foo</nav>)
  })
})

describe('Test nesting of classes arg', () => {
  describe('in array', () => {
    test('it allows passing classes as an object nested in array', () => {
      const Nav = classed.nav([
        'always',
        { 'this one': true, 'not that one': false },
      ])

      assertEquals(<Nav>foo</Nav>, <nav className="always this one">foo</nav>)
    })

    test('it allows passing classes as an array nested in array', () => {
      const Nav = classed.nav([
        'always',
        ['this', 'one'],
      ])

      assertEquals(<Nav>foo</Nav>, <nav className="always this one">foo</nav>)
    })

    test('it allows passing classes as a function nested in array', () => {
      const Nav = classed.nav([
        'always',
        () => ['this', 'one'],
      ])

      assertEquals(<Nav>foo</Nav>, <nav className="always this one">foo</nav>)
    })

    test('it allows passing classes as a function nested in array', () => {
      const Nav = classed.nav([
        'always',
        () => ['this', 'one'],
      ])

      assertEquals(<Nav>foo</Nav>, <nav className="always this one">foo</nav>)
    })
  })

  describe('in function return', () => {
    test('it allows returning classes as a array in function', () => {
      const Nav = classed.nav(() => ['all', 'these', 'classes'])

      assertEquals(<Nav>foo</Nav>, <nav className="all these classes">foo</nav>)
    })

    test('it allows returning classes as a object in function', () => {
      const Nav = classed.nav(() => ({ 'this one': true, 'not that one': false }))

      assertEquals(<Nav>foo</Nav>, <nav className="this one">foo</nav>)
    })
  })

  describe('in template string', () => {
    test('it handles string placeholders', () => {
      const these = 'these'
      const Nav = classed.nav`all ${these} classes`

      assertEquals(<Nav>foo</Nav>, <nav className="all these classes">foo</nav>)
    })

    test('it handles function placeholders', () => {
      const Nav = classed.nav`all ${() => 'these'} classes`

      assertEquals(<Nav>foo</Nav>, <nav className="all these classes">foo</nav>)
    })

    test('it handles object placeholders', () => {
      const Nav = classed.nav`all ${{ these: true, 'not that': false }} classes`

      assertEquals(<Nav>foo</Nav>, <nav className="all these classes">foo</nav>)
    })

    test('it handles array placeholders', () => {
      const Nav = classed.nav`all ${['these', 'and', 'these']} classes`

      assertEquals(<Nav>foo</Nav>, <nav className="all these and these classes">foo</nav>)
    })
  })

  test('nesting is actually very very recursive', () => {
    const Nav = classed.nav`
      always
      ${['these', () => [{ classes: true }, () => ([{ 'but not': false }, false && 'these ones'])]]}
    `

    assertEquals(<Nav>foo</Nav>, <nav className="always these classes">foo</nav>)
  })
})

describe('Test using props in functions', () => {
  test('it passes basic component props in root class function', () => {
    const Link = classed.a(({ href }) => [
      'always this one',
      { 'only on external': href && href.startsWith('http') },
    ])

    assertEquals(<Link href="#">foo</Link>, <a className="always this one" href="#">foo</a>)

    assertEquals(
      <Link href="https://mathieutu.dev">foo</Link>,
      <a className="always this one only on external" href="https://mathieutu.dev">foo</a>,
    )
  })

  test('it passes custom component props in root class function', () => {
    const Link = ({ blank, ...props }: any) => <a {...(blank && { target: '_blank' })} {...props} />

    const ClassedLink = classed(Link)(({ blank }) => [
      'always this one',
      blank && 'only on blank',
    ])

    assertEquals(<ClassedLink href="#">foo</ClassedLink>, <a className="always this one" href="#">foo</a>)

    assertEquals(
      <ClassedLink href="https://mathieutu.dev" blank>foo</ClassedLink>,
      <a className="always this one only on blank" href="https://mathieutu.dev" target="_blank">foo</a>,
    )

  })

  test('it passes component props in any nested function', () => {
    const Link = classed.a([
      'always this one',
      ({ href }) => ({ 'only on external': href && href.startsWith('http') }),
    ])

    assertEquals(<Link href="#">foo</Link>, <a className="always this one" href="#">foo</a>)

    assertEquals(
      <Link href="https://mathieutu.dev">foo</Link>,
      <a className="always this one only on external" href="https://mathieutu.dev">foo</a>,
    )
  })

  test('it passes component props in template string function', () => {
    const Link = classed.a`
      always this one
      ${({ href }) => ({ 'only on external': href && href.startsWith('http') })}
    `

    assertEquals(<Link href="#">foo</Link>, <a className="always this one" href="#">foo</a>)

    assertEquals(
      <Link href="https://mathieutu.dev">foo</Link>,
      <a className="always this one only on external" href="https://mathieutu.dev">foo</a>,
    )
  })

  test('it allows passing new props just for managing the classes', () => {
    const Link = classed.a<{ external: boolean }>`
      always this one
      ${({ external }) => ({ 'only on external': external })}
    `

    assertEquals(
      <Link href="#" external={false}>foo</Link>,
      <a className="always this one" href="#">foo</a>,
    )

    assertEquals(
      <Link href="https://mathieutu.dev" external={true}>foo</Link>,
      <a className="always this one only on external" href="https://mathieutu.dev">foo</a>,
    )
  })
})
