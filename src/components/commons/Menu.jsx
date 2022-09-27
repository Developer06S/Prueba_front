import { Link } from 'react-router-dom'

export const Menu = () => {
  return (
    <nav className="panel">
        <p className='panel-heading'>Menu</p>       
        <div className='panel-block'>
            <Link to="/clientes" className='button is-fullwidth'>
                <span className='icon'>
                <i className='fas fa-user'></i>
                </span>
               <span>Usuarios</span>                
            </Link>            
        </div>
    </nav>    
  )
}
