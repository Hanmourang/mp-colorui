import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {bgColorMoreType, bgColorType, iconType, lightBgColorType} from "../utils/types";
import {BG_COLOR_LIST} from "../utils/model";

interface IProps {
  bgColor?: bgColorType | lightBgColorType | bgColorMoreType;
  fix?: boolean;
  border?: boolean;
  tabs?: {
    badge?: number | boolean;
    icon?: iconType;
    img?: string;
    title?: string;
  }[];
  buttons?: {
    text?: string;
    bgColor?: bgColorType | bgColorMoreType | lightBgColorType
  }[];
  onClickTab?: (index: number) => void;
  onClickButton?: (index: number) => void;
}

interface IState {
}

export default class ClShopBar extends Component<IProps, IState> {
  static options = {
    addGlobalClass: true
  };

  static defaultProps: IProps = {
    bgColor: 'white',
    tabs: [],
    buttons: [],
    border: false,
    onClickButton: () => {},
    onClickTab: () => {}
  };
  onClickTab(index: number) {
    this.props.onClickTab && this.props.onClickTab(index)
  }
  onClickButton(index: number) {
    this.props.onClickButton && this.props.onClickButton(index)
  }
  render() {
    const bgColorClassName = BG_COLOR_LIST[this.props.bgColor || 'white'];
    const tabsComponent = this.props.tabs && this.props.tabs.map((item, index) =>
      <View key={index} className='action' onClick={this.onClickTab.bind(this, index)}>
        <View className={`${item.icon ? 'icon-' + item.icon : ''}`}>
          {item.badge !== false ? <View className='cu-tag badge'>{item.badge === true ? '' : item.badge}</View> : ''}
        </View>
        <View>{item.title}</View>
      </View>);
    const buttonsComponent = this.props.buttons && this.props.buttons.map((item, index) =>
      <View key={index} className={`${BG_COLOR_LIST[item.bgColor || 'red']} submit`} onClick={this.onClickButton.bind(this, index)}>{item.text}</View>);
    return (<View className={`cu-bar ${bgColorClassName} tabbar shop ${this.props.border ? 'border' : ''}`}>
      {tabsComponent}
      {buttonsComponent}
    </View>)
  }
}
