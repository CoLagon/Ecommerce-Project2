
import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';


//bulma css framework
import 'bulma/css/bulma.css';
//styles
import './style.css';

//array of object literals
var JEANS = [
    {
      SKU: 1324,
      title: "RUSTIC DIME SHREDDED JEANS",
      fit: "TAPER FIT",
      color: "black",
      size: [ 30, 32, 34 ],
      image: ["https://cdn.shopify.com/s/files/1/0452/6221/products/110raw_1024x1024.jpg?v=1492608239"],
      description: "Get a stylish street look loaded with comfort with the new Biker Black Shredded jeans from Rustic Dime. A stylish tapered fit will have you looking your best in the black colorway that features custom knee panels and hand cut tears on the front for a shredded look and a cotton-spandex construction for a comfortable fit with plenty of stretch.",
      id: 3
    },
    {
      SKU: 1234,
      title: "SAINT VERNON",
      fit: "TAPER FIT",
      color: "blue",
      size: [ 28, 30, 32 ],
      image: ["https://cdn.shopify.com/s/files/1/0452/6221/products/rustic-dime-saint-vernon-taper-fit-1_1024x1024-1_1024x1024.jpg?v=1492608261%22", "https://cdn.shopify.com/s/files/1/0452/6221/products/rustic-dime-saint-vernon-taper-fit-2_1024x1024.jpg?v=1492608262"],
      description: "Our Saint Vernon Taper Fit denim features distressed and tattered details. Each pair is hand cut and sanded for a unique look. 100% cotton bleached american denim. Made in Los Angeles.",
      id: 1
    },
    {
      SKU: 4321,
      title: "BLACK",
      fit: "SKINNY FIT",
      color: "black",
      size: [ 28, 30, 32 ],
      image: ["https://cdn.shopify.com/s/files/1/0452/6221/products/105black_1024x1024.jpg?v=1492608011", "https://cdn.shopify.com/s/files/1/0452/6221/products/105black_b_1024x1024.jpg?v=1492608012","https://cdn.shopify.com/s/files/1/0452/6221/products/105black_c_1024x1024.jpg?v=1492608013"],
      description: "Our signature Black Skinny Fit denim is a fan favorite. Made from a garment dyed 98% cotton 2% spandex, these jeans are perfect for everyday wear. Made in Los Angeles.",
      id: 2
    }
];
function ButtonList(props) {
  return (
      <li><a>{props.item}</a></li>
  );
}
function ButtonDrop(props) {
  console.log(props.toggle)
  return (
    <div className="has-dropdown">
      <button className="button is-medium" onClick={function() {props.onButtonDrop(props.index);}}>Size</button>
        <div className={props.toggle}>
          <div className="dropdown box">
          <ul >
          {
            props.size.map(function(size, index) {
              return <ButtonList key={index} item={size}/>
            })
          }
          </ul>
          </div>
      </div>
    </div>
  );
}

var DisplayImage = createReactClass({
  wow: function() {
    console.log("hitting the wow function method")
  },
  dropButton: function(index) {
    console.log(document.getElementsByClassName("hide")[index].className)
    console.log(document.getElementsByClassName("show")[index].className)
    if(document.getElementsByClassName("hide")[index].className === "hide") {

      document.getElementsByClassName("hide")[index].style.display = "none";
      this.setState({ toggle: "show" })
    } else {
      document.getElementsByClassName("show")[index].style.display = "block";
      this.setState({toggle: "hide"})
    }
  },
  flipImage: function(len) {
    var loopImage = function(i) {
      if(i < len) {
        this.Timeout = setTimeout(function() {
          this.setState({image: this.props.image[i]})
          loopImage(i + 1);
        }.bind(this), 500)
      }
    }.bind(this);
    loopImage(1);
  },
  toDefault: function() {
    clearTimeout(this.Timeout);
    this.setState(this.getInitialState());
  },
  getInitialState: function() {
    return {
            image: this.props.image,
            toggle: "show"
           }
  },
  render: function() {
    return (
      <div className="column">
          <div className="card">
            <div className="card-image">
              <figure className="image is-2by3">
                  <img src={this.state.image} onMouseOver={ function() {
                    var len = this.state.image.length;
                    this.flipImage(len);
                  }.bind(this) } onMouseOut={function() {this.toDefault();}.bind(this)} onClick={ function() {this.wow()}.bind(this)}/>
              </figure>
            </div>
          </div>
          <div>
            {this.props.title}
            <ButtonDrop
                toggle={this.state.toggle}
                size={this.props.size}
                index={this.props.index}
                onButtonDrop={function(index) { this.dropButton(index)}.bind(this)}/>
          </div>
      </div>
    );
  }
})

// function DisplayImage(props) {
//   console.log(props);
//   return(
//     <div className="column">
//       <div className="card">
//         <div className="card-image">
//           <figure className="image is-2by3">
//               <img src={props.image[1]} onMouseOver={ function() {
//                 var len = props.image.length;
//                 this.onFlipImage(len);
//               }.bind(this) } onMouseOut={function() {this.onToDefault();}} onClick={ function() {this.onWow()}}/>
//           </figure>
//         </div>
//       </div>
//       <div>
//         {props.title}
//         {props.size}
//       </div>
//   </div>
//   );
// }
//Object literal or Class with properties and methods
//this class holds function expressions(methods)
var Ecommerce = createReactClass({
  propTypes: {
    initialJeans: React.PropTypes.arrayOf(React.PropTypes.shape({
      SKU: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired,
      fit: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
      size: React.PropTypes.arrayOf(React.PropTypes.number.isRequired),
      image: React.PropTypes.arrayOf(React.PropTypes.string.isRequired),
      description: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired
  },
  getInitialState: function() {
    return {
      jeans: this.props.initialJeans,
    }
  },
  render: function() {
    return (
      <div className="columns">
        {this.state.jeans.map(function(jean, index) {
          return (
              <DisplayImage
                SKU={jean.SKU}
                title={jean.title}
                fit={jean.fit}
                color={jean.color}
                size={jean.size}
                image={jean.image}
                description={jean.description}
                key={jean.id}
                index={index}/>
          );
        }.bind(this))}
      </div>
    );
  }
});

ReactDOM.render(<Ecommerce initialJeans={JEANS}/>, document.getElementById("root"));
