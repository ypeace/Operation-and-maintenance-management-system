import React, {Component} from 'react';
import Button from '../../components/control/Button'
import style from './style.less';
import {addStation} from '../../service/web/operate/operate';

export default class CreateOperate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      city: '',
      name: '',
      lngLat: [0, 0],
    }
  }

  creatStation = (city, name, lngLat) => {
    (async ()=>{
       await addStation({city, name, lngLat});
        this.props.refresh();
        setTimeout(_ => {
          this.props.onCloseDialog()
        }, 400)
      }
    )().catch(error => {
      this.error = error;
    })
  };

  changeName = (value) => {
    const name = value;
    this.setState({
      name
    })
  };

  changeLngLatJ = (value) => {
    const lngLat = this.state.lngLat;
    lngLat[0] = value ? value : 0;
    this.setState({
      lngLat
    })
  };

  changeLngLatW = (value) => {
    const lngLat = this.state.lngLat;
    lngLat[1] = value ? value : 0;
    this.setState({
      lngLat
    })
  };


  changeCity = (value) => {
    const city = value;
    this.setState({
      city
    })
  };

  render () {
    const {name, city, lngLat} = this.state;
    return <div className={style.create}>
      <div className="containStyle">
        <p>
          <span>城市：</span>
          <input
            onChange={
              (e) => {
                const value = e.target.value;
                this.changeCity(value)
              }
            }
          />
        </p>
        <p>
          <span>仓库名称：</span>
          <input
            onChange={
              (e) => {
                const value = e.target.value;
                this.changeName(value)
              }
            }
          />
        </p>
        <p>
          <span>位置：</span>
          <input
            placeholder='经度坐标点,非必填项'
            onChange={
              (e) => {
                const value = e.target.value;
                this.changeLngLatJ(value)
              }
            }
          /><input
          placeholder='纬度坐标点,非必填项'
          onChange={
            (e) => {
              const value = e.target.value;
              this.changeLngLatW(value)
            }
          }
        />
        </p>
      </div>

      <div
        className="styleButton"><Button
        onClick={() => {
          this.props.onCloseDialog()
        }}
      >取消</Button>
        <Button
          onClick={() => {
            this.creatStation(name, city, lngLat)
          }}
        >确定</Button></div>
    </div>

  }

}