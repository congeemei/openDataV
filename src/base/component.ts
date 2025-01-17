import { cloneDeep, isNumber } from 'lodash-es'
import { h } from 'vue'

import type { ComponentGroup } from './enums'
import { ContainerType, DataMode, FormType } from './enums'
import type {
  BaseScript,
  ComponentDataType,
  ComponentStyle,
  ComponentType,
  DataInstance,
  DOMRectStyle,
  GroupStyle,
  MetaContainerItem,
  MetaForm,
  Response
} from './type'
import { buildModeValue, getObjProp, updateFormItemsValue, updateModeValue, uuid } from './utils'

interface DataConfig {
  type: string
  dataInstance: DataInstance
}

export class CustomComponent {
  id: string
  component: string
  group: ComponentGroup
  name: string
  icon = ''
  locked = false
  selected = false
  display = true
  show = true
  active = false
  dataMode: DataMode = DataMode.SELF
  /**
   * @deprecated dataIntegrationMode 即将弃用，建议使用 dataMode
   */
  dataIntegrationMode: DataMode = DataMode.SELF
  callbackProp?: (propKeys: Array<string>, value: any) => void
  callbackStyle?: (propKeys: Array<string>, value: any) => void
  callbackData?: (result: any, type?: string) => void
  protected componentDataCallback?: (result: any, type?: string) => void

  // 检测变化
  propIsChange = true
  styleIsChange = true
  defaultViewType: ContainerType = ContainerType.CARD

  // form表单中使用
  _prop: MetaContainerItem[] = []
  _style: MetaContainerItem[] = []
  extraStyle: Record<string, string | number | boolean> = {}
  groupStyle?: GroupStyle
  positionStyle: DOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }

  parent?: CustomComponent
  subComponents: CustomComponent[] = []

  _propValue: Record<string, any> = {}
  _styleValue: ComponentStyle = {
    ...this.positionStyle
  }
  dataConfig?: DataConfig
  scriptConfig?: BaseScript

  constructor(detail: ComponentType) {
    if (detail.id) {
      this.id = detail.id
    } else {
      this.id = uuid()
    }
    this.component = detail.component
    this.group = detail.group
    this.name = detail.name

    if (detail.icon) {
      this.icon = detail.icon
    }
    this.positionStyle.width = detail.width || 100
    this.positionStyle.height = detail.height || 100
    this.dataMode = detail.dataMode || detail.dataIntegrationMode || DataMode.SELF
  }

  get propFromValue(): MetaContainerItem[] {
    const common: MetaContainerItem = {
      label: '公共属性',
      prop: 'common',
      children: [
        {
          label: '名称',
          prop: 'name',
          type: FormType.TEXT,
          props: {
            defaultValue: this.name
          }
        },
        {
          label: '组件',
          prop: 'component',
          type: FormType.TEXT,
          props: {
            defaultValue: this.component,
            editable: false
          }
        },
        {
          label: '组件ID',
          prop: 'id',
          type: FormType.TEXT,
          props: {
            defaultValue: this.id,
            editable: false
          }
        }
      ]
    }
    const propFrom = [common, ...this._prop]
    const propValue = {}
    buildModeValue(propFrom, propValue)
    return propFrom
  }

  get styleFormValue(): MetaContainerItem[] {
    if (!this._style.find((item) => item.prop === 'position')) {
      const common: MetaContainerItem = {
        label: '位置大小',
        prop: 'position',
        children: [
          {
            label: '左边距',
            prop: 'left',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.left,
              suffix: () => h('span', {}, 'px'),
              precision: 0
            }
          },
          {
            label: '上边距',
            prop: 'top',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.top,
              suffix: () => h('span', {}, 'px'),
              precision: 0
            }
          },
          {
            label: '宽度',
            prop: 'width',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.width,
              suffix: () => h('span', {}, 'px'),
              precision: 0
            }
          },
          {
            label: '高度',
            prop: 'height',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.height,
              suffix: () => h('span', {}, 'px'),
              precision: 0
            }
          },
          {
            label: '旋转角度',
            prop: 'rotate',
            type: FormType.NUMBER,
            props: {
              defaultValue: this.positionStyle.rotate,
              suffix: () => h('span', {}, '°')
            }
          }
        ]
      }
      this._style = [common, ...this._style]
    }

    return this._style
  }

  get propValue() {
    if (this.propIsChange) {
      updateFormItemsValue(this._prop, this._propValue)
      this.propIsChange = false
    }
    return this._propValue
  }

  setViewType(viewType: ContainerType) {
    this.defaultViewType = viewType
  }

  get style(): ComponentStyle {
    if (this.styleIsChange) {
      const customStyle: Record<string, any>[] = []
      this.styleFormValue.forEach((item) => {
        ;(item.children || []).forEach((obj) => {
          const objProps = obj.props || obj.componentOptions
          if (objProps) {
            if (obj.type === FormType.CUSTOM) {
              customStyle[obj.prop] = objProps.defaultValue
            }
            this._styleValue[obj.prop] = objProps!.defaultValue
          }
        })
      })

      Object.assign(this._styleValue, this.extraStyle)
      const res = this.styleToCss(customStyle)
      if (res) {
        Object.assign(this._styleValue, res)
      }
      this.styleIsChange = false
    }
    return this._styleValue
  }

  get exampleData(): any {
    return undefined
  }

  // 自定义样式编辑框数据处理
  styleToCss(_: Record<string, any>[]): Nullable<Record<string, any>> {
    return null
  }

  // 生成后端存储需要的Json
  toJson(): ComponentDataType {
    const subComponents = this.subComponents.map((item) => item.toJson())
    const component: ComponentDataType = {
      id: this.id,
      component: this.component,
      name: this.name,
      propValue: this.propValue,
      style: this.style,
      subComponents: subComponents.length > 0 ? subComponents : undefined,
      dataMode: this.dataMode || this.dataIntegrationMode,
      script: this.scriptConfig?.toJSON()
    }
    if (this.dataConfig) {
      component.data = {
        type: this.dataConfig?.type,
        requestOptions: this.dataConfig?.dataInstance.toJSON()
      }
    }
    if (this.groupStyle) {
      component.groupStyle = this.groupStyle
    }
    return component
  }

  // 后端数据回填propValue
  setPropValue({ propValue }: { propValue: Record<string, any> }) {
    this.propIsChange = true
    updateFormItemsValue(this._prop, propValue)
    this._propValue = propValue
  }

  // 后端数据回填style
  setStyleValue({ style }: { style: Record<string, any> }) {
    this.styleIsChange = true
    for (const prop in style) {
      this.styleFormValue.forEach((item) => {
        const propObj = (item.children || []).find((obj) => obj.prop === prop)
        if (propObj) {
          const objProps = propObj.props || propObj.componentOptions
          if (!objProps) {
            return
          }
          objProps.defaultValue = style[prop]
          if (prop in this.positionStyle) {
            this.positionStyle[prop] = style[prop]
          }
        }
      })
    }
  }

  // change(propKeys: Array<string>, value: any, from: 'style' | 'propValue' | 'data') {
  //   if (from === 'propValue') {
  //     this.changeProp(propKeys, value)
  //   } else if (from === 'style') {
  //     this.changeStyle(propKeys, value)
  //   }
  // }
  // 修改属性
  changeProp(propKeys: Array<string>, value: string | number | boolean | any) {
    this.propIsChange = true
    if (propKeys.length === 2 && propKeys[0] === 'common' && propKeys[1] === 'name') {
      this.name = value as string
      return
    }
    updateModeValue(this._propValue, propKeys, value)
    if (this.callbackProp) {
      this.callbackProp(propKeys, value)
    }
  }

  setPropChangeCallback(callback: (propKeys: Array<string>, value: any) => void) {
    this.callbackProp = callback
  }
  afterCallbackChange(scriptHandler: BaseScript) {
    this.scriptConfig = scriptHandler
    if (this.dataConfig?.dataInstance && this.componentDataCallback) {
      this.callbackData = this.buildDataCallback()
      const { dataInstance } = this.dataConfig || {}
      if (dataInstance && dataInstance.close) {
        dataInstance.close()
        dataInstance.connect!(this.callbackData)
      }
    }
  }

  // 修改样式
  changeStyle(propKeys: Array<string>, value: any) {
    const positionKey = ['top', 'left', 'height', 'width', 'rotate']
    let changeValue = value
    if (propKeys[0] === 'position') {
      if ((propKeys.length === 2, positionKey.includes(propKeys[1]))) {
        changeValue = Math.round(value)
        this.positionStyle[propKeys[1]] = changeValue
      } else if (propKeys.length === 1) {
        positionKey.forEach((el) => {
          if (!isNumber(value[el])) {
            return
          }
          this.positionStyle[el] = value[el]
        })
      }
    }
    this.styleIsChange = true
    const curObj = getObjProp(this.styleFormValue, propKeys) as MetaForm
    const objProps = curObj && (curObj.props || curObj.componentOptions)
    if (objProps) {
      objProps.defaultValue = value
    }

    if (this.callbackStyle) this.callbackStyle(propKeys, value)
  }

  setStyleChangeCallback(callback: (propKeys: Array<string>, value: any) => void) {
    this.callbackStyle = callback
  }

  /**
   * 添加子组件
   * @param components
   * @param deep
   * @param clear
   */
  addComponent(components: CustomComponent[], deep = false, clear = false) {
    if (clear) {
      this.subComponents = []
    }

    components.forEach((item) => {
      let com = item
      if (deep) {
        com = cloneDeep(item)
      }
      com.parent = this
      this.subComponents.push(com)
    })
  }
  /**
   * 设置组件的可见性
   */
  setVisible(visible: boolean) {
    this.display = visible
  }
  async changeDataConfig(dataConfig: DataConfig) {
    const { dataInstance } = this.dataConfig || {}
    if (dataInstance && dataInstance.close) {
      dataInstance.close()
    }
    this.dataConfig = dataConfig
    if (this.callbackData) {
      await this.dataConfig?.dataInstance.connect!(this.callbackData)
    }
  }
  setDataChangeCallback(callback: (result: any, type?: string) => void) {
    this.componentDataCallback = callback
    this.callbackData = this.buildDataCallback()
    const { dataInstance } = this.dataConfig || {}
    if (!dataInstance) {
      return
    }
    if (dataInstance.close) {
      dataInstance.close()
    }
    dataInstance.connect!(this.callbackData)
  }

  buildDataCallback() {
    return (resp: Response) => {
      if (this.scriptConfig && this.scriptConfig.afterCallback) {
        const afterCallback = this.scriptConfig.afterCallback
        const { status, data } = resp
        if (status === 'SUCCESS') {
          try {
            const afterData = afterCallback(data, this.propValue)
            resp['afterData'] = afterData
          } catch (err) {
            resp['afterData'] = undefined
            resp.status = 'FAILED'
          }
        }
      } else {
        resp['afterData'] = resp.data
      }
      if (this.componentDataCallback) {
        this.componentDataCallback(resp)
      }
    }
  }
  loadDemoData() {
    const exampleData = this.exampleData
    setTimeout(() => {
      if (this.callbackData) {
        this.callbackData({ status: 'SUCCESS', data: exampleData, afterData: exampleData }, 'DEMO')
      }
    }, 200)
  }
  appendChild(child: CustomComponent) {
    this.subComponents.push(child)
  }
  updateChild(index: number, child: CustomComponent) {
    this.subComponents[index] = child
  }
}

export type BaseComponent = { new (id?: string, name?: string, icon?: string): CustomComponent }
