import React from "react";
import "./App.css";

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

  //Inputs are simulated as it comes from the DB
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
  // End of DB mockup

  // Put all the inputs on a single array as it comes from DB
  shopingCarts = [this.input1, this.input2, this.input3];

  // Added amount in case customer select more than one product
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
              // Settimeout to let React to change the state
              setTimeout(() => {
                this.calculateTaxes();
              }, 1);
            } else {
              //Reset the state when no shopping cart is selected
              this.setState({ selectedProducts: [] });
            }
          }}
        >
          <option value="0">Ninguna cesta seleccionada</option>
          {/* Map to create dinamically the select */}
          {this.shopingCarts.map(c => (
            <option value={c.index}>Cesta {c.index}</option>
          ))}
        </select>
        {/* Check to avoid showing the thead when no shopping cart selected */}
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
