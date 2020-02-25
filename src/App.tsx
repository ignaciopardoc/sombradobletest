import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { throws } from "assert";

// IMPUESTO AL CONSUMO El impuesto básico sobre las ventas se aplica con una tasa del 10% sobre todos los bienes, excepto los libros, los alimentos y los productos médicos que están exentos.
//El derecho de importación es un impuesto adicional sobre las ventas aplicable a todos los bienes importados con una tasa del 5%, sin exenciones.
//Cuando yo compro artículos, recibo un ticket con el nombre de todos los artículos y su precio (incluido el impuesto), terminando con el coste total de los artículos, y los importes
//totales de los impuestos sobre las ventas pagado. Las reglas de redondeo para el impuesto sobre las ventas son que para una tasa de impuestos de n% y un precio del producto base p contiene
//(np/100 redondeado hacia arriba al 0,05 más cercano) de cantidad de impuesto sobre las ventas.

// Implementa una aplicación que imprime los detalles de la compra de estas cestas de productos...
// INPUT:
// Input 1: 1 libro a 12.49 1 película en DVD a 14.99 1 barrita de chocolate a 0.85

// Input 2: 1 caja de bombones de importación a 10.00 1 frasco de perfume de importación a 47.50

// Input 3: 1 frasco de perfume de importación a 27.99 1 frasco de perfume a 18.99

// 1 caja de pastillas para el estómago a 9.75 1 caja de bombones importados a 11.25

interface IProducts {
  name: string;
  price: number;
  ammount: number;
  basicTax: boolean;
  importTax: boolean;
}

interface shoppingCart {
  index: number;
  products: IProducts[];
}

interface IProps {}

interface IState {
  selectedProducts: IProducts[];
  totalTaxes: number;
  totalPrice: number;
}

class App extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedProducts: [],
      totalTaxes: 0,
      totalPrice: 0
    };
  }

  input1: shoppingCart = {
    index: 1,
    products: [
      {
        name: "Libro",
        price: 12.49,
        ammount: 1,
        basicTax: false,
        importTax: false
      },
      {
        name: "Película DVD",
        price: 14.99,
        ammount: 1,
        basicTax: true,
        importTax: false
      },
      {
        name: "Barrita de chocolate",
        price: 0.85,
        ammount: 1,
        basicTax: false,
        importTax: false
      }
    ]
  };

  input2: shoppingCart = {
    index: 2,
    products: [
      {
        name: "Caja de bombones de importación",
        price: 10.0,
        ammount: 1,
        basicTax: false,
        importTax: true
      },
      {
        name: "Frasco de perfume de importación",
        price: 47.5,
        ammount: 1,
        basicTax: true,
        importTax: true
      }
    ]
  };

  input3: shoppingCart = {
    index: 3,
    products: [
      {
        name: "Frasco de perfume de importación",
        price: 27.99,
        ammount: 1,
        basicTax: true,
        importTax: true
      },
      {
        name: "Frasco de perfume",
        price: 18.99,
        ammount: 1,
        basicTax: true,
        importTax: false
      },
      {
        name: "Caja de pastillas para el estómago",
        price: 9.75,
        ammount: 1,
        basicTax: false,
        importTax: false
      },
      {
        name: "Caja de bombones",
        price: 11.25,
        ammount: 1,
        basicTax: false,
        importTax: true
      }
    ]
  };
  shopingCarts = [this.input1, this.input2, this.input3];

  calculateTaxes = () => {
    let totalTaxes = 0;
    for (let product of this.state.selectedProducts) {
      if (product.importTax) {
        totalTaxes += product.price * product.ammount * 0.05;
      }
      if (product.basicTax) {
        totalTaxes += product.price * product.ammount * 0.1;
      }
    }
    this.setState({
      totalTaxes: Number(Math.ceil(totalTaxes * 20) / 20).toFixed(2) as any
    });
    this.calculateTotal();
  };

  calculateTotal = () => {
    let totalPrice = 0;
    for (let product of this.state.selectedProducts) {
      totalPrice += product.price * product.ammount;
    }
    totalPrice += Number(this.state.totalTaxes);
    this.setState({ totalPrice: Number(totalPrice.toFixed(2)) });
  };
  render() {
    return (
      <div className="container">
        <h1>Seleccione su cesta</h1>

        <select
          name=""
          id=""
          className="custom-select"
          onChange={e => {
            if (e.target.value !== "0") {
              this.setState({
                selectedProducts: this.shopingCarts[Number(e.target.value) - 1]
                  .products
              });

              setTimeout(() => {
                this.calculateTaxes();
              }, 1);
            } else {
              this.setState({ selectedProducts: [] });
            }
          }}
        >
          <option value="0">Ninguna cesta seleccionada</option>
          {this.shopingCarts.map(c => (
            <option value={c.index}>Cesta {c.index}</option>
          ))}
        </select>

        {this.state.selectedProducts.length ? (
          <table className="table mt-5 table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Cantidad</th>
                <th>Concepto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
            {this.state.selectedProducts.map((p, i) => (
              <tr key={i}>
                <td>1</td>
                <td>{p.name}</td>
                <td>{p.price * p.ammount}€</td>
              </tr>
            ))}
            </tbody>
            <tr className="mt-5">
              <th>Impuestos</th>
              <td></td>
              <td>{this.state.totalTaxes}€</td>
            </tr>
            <tr>
              <th>Total</th>
              <td></td>
              <td className="table-secondary">
                <strong> {this.state.totalPrice}€</strong>
              </td>
            </tr>
            
          </table>
        ) : null}
      </div>
    );
  }
}

export default App;
