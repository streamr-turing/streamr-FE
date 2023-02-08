import tv from '../../tv.png'
import "./_Header.scss"

const Header = () => {

  return (
    <div className="header-background">
        <section className="logo-section">
          <img src={tv} alt='Drawing of a TV' />
          <h1>Streamr</h1>
        </section>
    </div>
  )
}

export default Header