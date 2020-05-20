import React, {useEffect, useState} from 'react';

const SearchBar = ({filterText, inStockOnly, onInStockChange, onFilterTextChange}) => {
    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={onFilterTextChange}
            />
            <p>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={onInStockChange}
                />
                {' '}
                Only show products in stock
            </p>
        </form>
    );
};

const ProductCategoryRow = ({category}) => {
    return (
        <tr>
            <th colSpan="20">
                {category}
            </th>
        </tr>
    );
};

const ProductRow = ({product}) => {
    const name = product.stocked ?
        product.name :
        <span style={{color: 'red'}}>
        {product.name}
      </span>;
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
};


const ProductTable = ({filterText, products, inStockOnly}) => {

    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (product.name.indexOf(filterText) === -1) {
            return; //then search characters don't match
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            let key = product.category + "_func";  // avoids conflicts with class implementation
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={key}
                />
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};


const FilterableProductTableNew = ({products}) => {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);


    const handleFilterTextChange = e => {
        setFilterText(e.target.value);
        console.log("[func] New text: " + filterText)
    };

    const handleInStockChange = e => {
        setInStockOnly(e.target.checked);
        console.log("[func] Only show in-stock items: " + inStockOnly);
    };

    return (
        <>
            <div>
                <SearchBar
                    inStockOnly={inStockOnly}
                    onInStockChange={handleInStockChange}
                    onFilterTextChange={handleFilterTextChange}
                />
                <ProductTable
                    products={products}
                    filterText={filterText}
                    inStockOnly={inStockOnly}
                />

            </div>
        </>
    )
};


export default FilterableProductTableNew;