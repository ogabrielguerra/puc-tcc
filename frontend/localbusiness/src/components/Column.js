import React, {useContext} from 'react';
import { BaseContext } from './ContextProviders/BaseContextProvider';
import Loading from './Loading';

const Column = ()=>{

    const [base] = useContext(BaseContext);
    const max = 25;
    let count = 0;

    return (
        <aside>
            {/*<span className="gray-3">ANÚNCIO</span>*/}
            {/*<img src="/assets/images/anuncio.jpg" alt="Local Business"/>*/}

            <ul className="column-submenu">
                {base.categories ? base.categories.map((item) => {
                    count++;
                    let urlCategory = `/category/${item.id}`;
                    let title = `Fornecedores de ${item.name}`;
                    return (count < max) ? <li key={item.id}><a href={urlCategory} title={title}><span className="fa fa-check"></span> {item.name}</a></li> : ''
                }) : <Loading/>}
            </ul>
        </aside>
    )
}
  
export default Column;