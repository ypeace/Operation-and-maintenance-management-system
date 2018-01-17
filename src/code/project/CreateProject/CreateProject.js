import React, {Component} from 'react';
import Button from '../../../components/control/Button'
import style from './style.less';
import {addProject} from '../../../service/web/operate/operate';

export default class CreateOperate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      city: '',
      name: '',
      noParserA:'MANGO',
      noParsera:'no',
    }
  }

  creatProject = (city, name, noParser) => {
    (async ()=>{
        await addProject({city, name, noParser});
        this.props.refresh();
        setTimeout(_ => {
          this.props.closeDialog()
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

  changeNoParserA = (value) => {
    const noParserA = value;
    this.setState({
      noParserA
    })
  };

  changeNoParsera = (value) => {
    const noParsera = value;
    this.setState({
      noParsera
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
    const noParser = this.state.noParserA +'_'+'{'+this.state.noParsera+'}';
    return <div className={style.create}>
      <div className="containStyle">
        <p>
          <span>项目名称：</span>
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
          <span>车辆牌号的解析规则：</span>
          <input
            className='short'
            placeholder="{ }之前的内容"
            onChange={
              (e) => {
                const value = e.target.value;
                this.changeNoParserA(value)
              }
            }
          />
          <input
            className='short'
            placeholder="{ }内的内容"
            onChange={
              (e) => {
                const value = e.target.value;
                this.changeNoParsera(value)
              }
            }
          />
          <span>解析规则预览：{noParser}</span>
        </p>
      </div>

      <div
        className="styleButton"><Button
        onClick={() => {
          this.props.closeDialog()
        }}
      >取消</Button>
        <Button
          onClick={() => {
            this.creatProject(name, city, noParser)
          }}
        >确定</Button></div>
    </div>

  }

}