import React, { Component } from 'react';

import 'purecss/build/buttons.css';
import './Home.less';

const data = [
  {
    name: '玻利維亞 唐卡洛斯莊園 ',
    price: '430'
  },
  {
    name: '玻利維亞 社區小農 ',
    price: '480'
  },
  {
    name: '玻利維亞 柰里小農',
    price: '550'
  },
  {
    name: '玻利維亞 風信子莊園 ',
    price: '350'
  },
  {
    name: '哥倫比亞 藍寶石莊園 ',
    price: '380'
  },
  {
    name: '哥倫比亞 希望莊園 ',
    price: '600'
  },
  {
    name: '哥倫比亞 魅力莊園',
    price: '400'
  },
  {
    name: '哥倫比亞 緹瑪娜合作社',
    price: '410'
  },
  {
    name: '巴西 姵莉亞姊妹莊園',
    price: '420'
  },
  {
    name: '巴西 春天莊園',
    price: '550'
  }
];

export default class Home extends Component {

  state = {
    cafeList: data
  }

  sortName = () => {
    const newList = this.state.cafeList.sort((p, n) => (p.name.localeCompare(n.name)));
    this.setState({ cafeList: newList });
  }

  sortPrice = () => {
    const newList = this.state.cafeList.sort((p, n) => (p.price - n.price));
    this.setState({cafeList: newList});
  }

  render() {
    return (
      <div id="bands">
        <button className="pure-button" onClick={this.sortName}>按照名稱排序</button>
        <button className="pure-button" onClick={this.sortPrice}>按照價格排序</button>
        {
          this.state.cafeList.map(cafeDate => (
            <li> {`${cafeDate.name} - ${cafeDate.price}`}</li>
          ))
        }
      </div>
    );
  }
}
