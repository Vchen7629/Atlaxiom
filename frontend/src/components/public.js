import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">My Card Catalog Website!</span></h1>
            </header>
            <main className="public__main">
                <p>I love cards How about you yeah you do.</p>
                <address className="public__addr">
                    Placeholder<br />
                    Placeholder<br />
                    Placeholder<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Vincent Chen</p>
            </main>
            <footer>
                <Link to="/login">Member Login</Link>
            </footer>
        </section>
    )
    return content
}
export default Public

