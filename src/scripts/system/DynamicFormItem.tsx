import { isUndefined } from 'lodash-es'
import {
  NColorPicker,
  NFormItem,
  NInput,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NSelect,
  NSwitch
} from 'naive-ui'
import type {
  CustomProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  SelectProps,
  SwitchProps
} from 'open-data-v/base'
import { FormType, GlobalColorSwatches } from 'open-data-v/base'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

import CustomItem from './CustomItem'
import type { ScriptForm } from './type'

export default defineComponent({
  components: {
    NSwitch
  },
  props: {
    items: {
      type: Array as PropType<ScriptForm[]>,
      required: true
    },
    data: {
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  },
  emits: ['change', 'update:data'],
  setup(props, { emit }) {
    const changed = (val: any, key: string) => {
      emit('change', key, val)
    }
    const renderItem = (item: ScriptForm, modelValue) => {
      if (!modelValue) {
        return <> </>
      }
      const itemOptions = (item.props || {}) as FormItemProps
      const options: Record<string, any>[] =
        (itemOptions as SelectProps | RadioProps | SwitchProps)?.options || []

      /**
       * 获取设置的值
       * @param {string} name 需要获取值的名称
       * @param {any} [defaultValue=undefined] 默认值
       * @return 返回值本体或默认值
       */
      function getOptionsValue<T = undefined>(name: string, defaultValue?: T): T {
        return name in itemOptions ? itemOptions[name] : defaultValue
      }

      switch (item.type) {
        case FormType.COLOR:
          return (
            <NColorPicker
              v-model:value={modelValue[item.prop]}
              swatches={GlobalColorSwatches}
              modes={['hex', 'rgb', 'hsl']}
              onUpdateValue={(event) => changed(event, item.prop)}
            />
          )
        case FormType.SELECT:
          return (
            <NSelect
              v-model:value={modelValue[item.prop]}
              placeholder={item.label}
              onUpdateValue={(event) => changed(event, item.prop)}
              options={options}
              clearable={true}
            />
          )
        case FormType.RADIO:
          return (
            <NRadioGroup
              v-model:value={modelValue[item.prop]}
              name={item.prop}
              onUpdateValue={(event) => changed(event, item.prop)}
            >
              {options.map((op) => (
                <NRadio value={op.value} key={op.value}>
                  {op.label}
                </NRadio>
              ))}
            </NRadioGroup>
          )
        case FormType.NUMBER:
          const numberMax: number = getOptionsValue<number>('max', 9999999999)
          const numberMin: number = getOptionsValue<number>('min', -9999999999)
          const precision: number | undefined = getOptionsValue<number>('precision', undefined)

          return (
            <NInputNumber
              v-model:value={modelValue[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              max={numberMax}
              min={numberMin}
              precision={precision}
              clearable={true}
              v-slots={{
                prefix: (itemOptions as InputNumberProps).prefix,
                suffix: (itemOptions as InputNumberProps).suffix
              }}
            />
          )
        case FormType.SWITCH:
          return h(NSwitch, {
            value: modelValue[item.prop],
            onUpdateValue: (value) => {
              modelValue[item.prop] = value
              changed(value, item.prop)
            }
          })
        case FormType.CUSTOM:
          return (
            <CustomItem
              v-model:value={modelValue[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              component={(itemOptions as CustomProps).componentType}
              args={(itemOptions as CustomProps).args}
            />
          )
        default:
          return (
            <NInput
              clearable
              v-model:value={modelValue[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              readonly={itemOptions!.editable === false}
              disabled={itemOptions!.disabled}
              v-slots={{
                prefix: (itemOptions as InputProps).prefix,
                suffix: (itemOptions as InputProps).suffix
              }}
            />
          )
      }
    }
    return () => (
      <>
        {props.items.map((item) => (
          <NFormItem key={`${item.prop}`} label={item.label}>
            {isUndefined(props.data) ? <></> : renderItem(item, props.data)}
          </NFormItem>
        ))}
      </>
    )
  }
})
