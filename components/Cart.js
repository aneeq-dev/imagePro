import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Menu from './menu';
import Deals from './deals';
import {cartStyling} from '../styleSheeet/styles';
import store3 from '../redux/store3';
import { myAppointmentsStyling } from '../styleSheeet/screenStyles';

function Cart(props) {
  const [cart, setCart] = useState([]);
  const [sercart, setSerCart] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [setse, setSe] = useState(true);

  const cartTotalling = () => {
    var i;
    var len2 = sercart.length;
    var len = cart.length;
    var total = 0;
    var p = 0;
    for (i = 0; i < len2; i++) {
      if (!(sercart[i].discount === 0)) {
        p = sercart[i].price - sercart[i].price * (sercart[i].discount / 100);
        total = total + p;
      } else {
        total = total + sercart[i].price;
      }
    }
    for (i = 0; i < len; i++) {
      total = total + cart[i].saloonDealDetails.priceOfDeal;
    }
    // console.log("total: ",total);
    setCartTotal(total);
  };

  Cart.getCart = () => {
    return cart;
  };

  Cart.getserCart = () => {
    return sercart;
  };

  Cart.gettotal = () => {
    return cartTotal;
  };

  Cart.cartIsOkay = () => {
    if (cartTotal === 0) {
      return false;
    } else {
      return true;
    }
  };

  Cart.updateme = () => {
    if (setse) {
      setSe(false);
    } else {
      setSe(true);
    }
  };
  const c = () => {
    let c = [];
    var total = 0;
    c = Menu.getMenuCartonlyforupdate();
    //console.log("c: ",c);
    for (var i = 0; i < c.length; i++) {
      total = total + (c[i].price - c[i].price * (c[i].discount / 100));
    }
    let d = [];
    d = Deals.getDealsCartonlyforUpdate();
    for (var i = 0; i < d.length; i++) {
      total = total + d[i].saloonDealDetails.priceOfDeal;
    }
    //console.log("d: ",d);

    return total;
  };

  Cart.AddItemsToArray = item => {
    // console.log("hrtr");
    //  console.log("cart in cart: ",cart);
    const checksIfExists = cart.includes(item);
    // if already in cart then remove
    checksIfExists
      ? //console.log('already addded')
        console.log()
      : // else add it to cart
        cart.push(item);
    toggle ? setToggle(false) : setToggle(true);
    // console.log("i deal checked");
    cartTotalling();
    //console.log("cart in cart: ",cart);
  };

  Cart.AddServicesToArray = item => {
    // console.log("hrtr");
    //  console.log("cart in cart: ",cart);
    const checksIfExists = sercart.includes(item);
    // if already in cart then remove
    checksIfExists
      ? //console.log('already addded')
        console.log()
      : // else add it to cart
        sercart.push(item);
    toggle ? setToggle(false) : setToggle(true);
    // console.log("i deal checked");
    //console.log("cfgv: ",sercart);
    cartTotalling();
    //console.log("cart in cart: ",cart);
  };

  // if already exists then remove from cart
  Cart.RemoveItemFromArray = it => {
    const arr = cart.filter(i => i != it); // except the item
    var i, fLen;
    fLen = cart.length;
    for (i = 0; i < fLen; i++) {
      cart.pop(i);
    }
    for (i = 0; i < arr.length; i++) {
      cart.push(arr[i]);
    }
    toggle ? setToggle(false) : setToggle(true);
    cartTotalling();
  };

  // if already exists then remove from cart
  Cart.RemoveServicesFromArray = it => {
    const arr = sercart.filter(i => i != it); // except the item
    var i, fLen;
    fLen = sercart.length;
    for (i = 0; i < fLen; i++) {
      sercart.pop(i);
    }
    for (i = 0; i < arr.length; i++) {
      sercart.push(arr[i]);
    }
    toggle ? setToggle(false) : setToggle(true);
    cartTotalling();
  };

  return (
    //  console.log("cart in Cart: ", cart),
    // console.log("cart in serCart: ", sercart),

    <View style={cartStyling.containerBackColor}>
      <View style={cartStyling.container}>
        <Text style={cartStyling.cartHead}>
          {
            
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Your cart'
            ):(
              'آپ کی ٹوکری'
            )
          }
        </Text>
        <View>
          <TouchableOpacity>
            <View>
              {props.screenNumber === 2 &&
              !(Deals.getDealsCartonlyforUpdate().length === 0) &&
              !(Deals.getDealsCartonlyforUpdate().length === undefined)
                ? //  console.log("j: ",(Deals.getDealsCartonlyforUpdate())[0].deals),

                  Deals.getDealsCartonlyforUpdate().map(item => (
                    <View
                      key={item.id}
                      style={myAppointmentsStyling.services}>
                      <Text style={myAppointmentsStyling.servicestext}>
                        {item.saloonDealDetails.nameOfDeal}
                      </Text>
                      <Text style={myAppointmentsStyling.servicestext2}>
                        {item.saloonDealDetails.priceOfDeal.toFixed(0)}
                      </Text>
                    </View>
                  ))
                : console.log()}
              {props.screenNumber === 2 &&
              !(Menu.getMenuCartonlyforupdate().length === 0) &&
              !(Menu.getMenuCartonlyforupdate() === undefined)
                ? // console.log("k: ", Menu.getMenuCartonlyforupdate()),
                  Menu.getMenuCartonlyforupdate().map(itemn => (
                    <View
                      key={itemn.id}
                      style={myAppointmentsStyling.services}>
                      <Text style={myAppointmentsStyling.servicestext}>{itemn.name}</Text>
                      <Text style={myAppointmentsStyling.servicestext2}>
                        {(itemn.price - itemn.price * (itemn.discount / 100)).toFixed(0)}
                      </Text>
                    </View>
                  ))
                : cart.map(itemk => (
                    <View
                      key={itemk.id}
                      style={myAppointmentsStyling.services}>
                      <Text
                        style={myAppointmentsStyling.servicestext}>
                        {itemk.saloonDealDetails.nameOfDeal}
                      </Text>
                      <Text
                        style={myAppointmentsStyling.servicestext2}>
                        {itemk.saloonDealDetails.priceOfDeal.toFixed(0)}
                      </Text>
                    </View>
                  ))}
              {!(props.screenNumber === 2)
                ? sercart.map(itemn => (
                    <View
                      key={itemn.id}
                      style={myAppointmentsStyling.services}>
                      <Text
                        style={myAppointmentsStyling.servicestext}>
                        {itemn.name}
                      </Text>
                      <Text
                        style={myAppointmentsStyling.servicestext2}>
                        {itemn.discount === 0
                          ? itemn.price
                          : (itemn.price - itemn.price * (itemn.discount / 100)).toFixed(0)}
                      </Text>
                      
                    </View>
                  ))
                : console.log()}
              {props.screenNumber === 2 ? (
                <View
                  style={cartStyling.screen2Deals}>
                  <Text
                    style={cartStyling.screen2PriceText}>
                    {
                      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                        'Total RS. '
                      ):(
                        'کل رقم:'
                      )
                    }
                  </Text>
                  <Text
                    style={cartStyling.price}>
                    {c().toFixed(0)}
                  </Text>
                </View>
              ) : (
                <View
                  style={cartStyling.screen2Deals}>
                  <Text
                    style={cartStyling.screen2PriceText}>
                    {
                      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                        'Total RS. '
                      ):(
                        'کل رقم  '
                      )
                    }
                  </Text>
                  <Text
                    style={cartStyling.price}>
                    {cartTotal.toFixed(0)}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}



export default Cart;
