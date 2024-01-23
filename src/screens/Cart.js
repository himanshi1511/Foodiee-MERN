import React from "react";
import { Table, Button } from "react-bootstrap";
import { useCart, useDispatchCart } from "../components/ContextReducer";
// import trash from "../trash"
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

  //   console.log("cart data: "+data.length+"---");

  if (data.length === 0) {
    return (
      <div>
        <h1 className="w-100 text-center text-white m-5">
          Oops! Your cart is empty!
        </h1>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    console.log("order response: ", response);

    if (response.status === 200) {
      dispatch({
        type: "CLEAR_CART",
      });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {/* {console.log(data)} */}
      <div className=" mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <Table striped bordered hover variant="dark">
          <thead className=" text-success fs-4">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <Button>
                    <DeleteIcon
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <Button className="bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
