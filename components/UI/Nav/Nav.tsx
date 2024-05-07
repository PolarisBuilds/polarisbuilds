import Link from "next/link"

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href='/products'>Products</Link>
                </li>
                <li>
                    <Link href='/configurator'>Configurator</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav