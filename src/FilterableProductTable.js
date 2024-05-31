import data from "./data"
import { useState } from "react";

export default function FilterableProductTable(){
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

  return(
    <div className="FilterableProductTableContainer">
        <SearchBar filterText={filterText} 
            inStockOnly={inStockOnly}
            onFilterTextChange={setFilterText}
            onInStockOnlyChange={setInStockOnly}/>
        <ProductTable filterText={filterText} inStockOnly={inStockOnly}/>
    </div>
  )
}


function SearchBar({filterText ,inStockOnly, onFilterTextChange, onInStockOnlyChange}){

    function ChangeText(value){
        onFilterTextChange(value) ;
       
    }
    function ChangeInStockOnly(checked){
        onInStockOnlyChange(checked) ;
    }
    return(
       <form>
          <input type="text" id='search' placeholder="Search..."  value={filterText}  onChange={(event)=>{ChangeText(event.target.value)}}/> <br/>
            <label htmlFor="productinstock">
                <input type="checkbox" id="productinstock" cheked={inStockOnly} onChange={(event)=>{ChangeInStockOnly(event.target.checked)}} />
                    Only show products in stock
            </label>
       </form>
    )

}

function ProductTable({filterText ,inStockOnly}){

return(
    <>
        <table>
            <thead>
               <tr>
                    <th>Name</th>
                    <th>Price</th>
               </tr>
            </thead>
            <tbody>
                <ProductCategory filterText={filterText} inStockOnly={inStockOnly} />

            </tbody>
        </table>
    </>
)

}

function ProductCategory({filterText ,inStockOnly}){
    let productTable=data ;
    if (inStockOnly) {
        productTable = productTable.filter(product => product.stocked);
    }
    if(filterText!=''){
        productTable = productTable.filter(product => product.name.toLowerCase().includes(filterText));
       

    }
    const categories = [...new Set(productTable.map(item => item.category))];


    return(
        <>
        
           { categories.map(((category , index)=>{
            return( 
                
                    <>
                        <tr key={index} className="category"><th key={category} colSpan={2}>{category}</th></tr>
                        {
                            productTable.map(((product , index2)=>{
                               if(product.category===category )
                                return <ProductRow price={product.price} name={product.name} index={index2}  stocked={product.stocked}/>
                            }))
                        }
                    
                    </>
                
        )
                
           }))}
        </>
    )

}

function ProductRow({price , name , stocked, index }){
    return(
        <tr key={index} className={`productrow ${stocked ? "" : "stockexpire"}`}>
            <td>{name}</td>
            <td>{price}</td>
         </tr>
    
    )
}