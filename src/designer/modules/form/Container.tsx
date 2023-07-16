import {
  NCard,
  NCollapse,
  NCollapseItem,
  NDivider,
  NTabPane,
  NTabs,
  NTimeline,
  NTimelineItem
} from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'

import { ContainerType } from '@/enum'
import type { MetaContainerItem, MetaForm } from '@/types/component'

import FormAttr from './FormAttr'

export default defineComponent({
  components: {
    FormAttr
  },
  props: {
    config: {
      type: Object as PropType<Array<MetaContainerItem>>,
      required: true
    },
    data: {
      type: Object as PropType<Recordable>,
      required: true
    },
    mode: {
      type: String as PropType<ContainerType>,
      required: false,
      defalut: ContainerType.COLLAPSE
    }
  },
  emits: ['change', 'update:data'],
  setup(props, { emit }) {
    const formData = ref<Recordable>(props.data)
    const change = (keys: Array<string>, val: any) => {
      emit('change', keys, val)
      emit('update:data', formData)
    }

    watch(
      () => props.data,
      () => {
        formData.value = props.data
      }
    )

    const updateForm = (prop: string, data: any) => {
      formData.value[prop] = data
    }

    const renderForm = (el: MetaContainerItem) => {
      return formData.value[el.prop] ? (
        <FormAttr
          children={(el.children || []) as Array<MetaForm>}
          data={formData.value[el.prop]}
          name={el.label}
          uid={el.prop}
          ukey={el.prop}
          onChange={change}
          onUpdateData={updateForm}
        />
      ) : (
        <> {'未获取到正确的数据'}</>
      )
    }
    const renderContainer = (containerItems: Array<MetaContainerItem>) => {
      switch (props.mode) {
        case ContainerType.COLLAPSE:
          return (
            <NCollapse accordion={true}>
              {containerItems.map((el) => {
                return (
                  <NCollapseItem key={el.prop} title={el.label} name={el.prop}>
                    {renderForm(el)}
                  </NCollapseItem>
                )
              })}
            </NCollapse>
          )
        case ContainerType.TABS:
          return (
            <NTabs type="line">
              {containerItems.map((el) => {
                return (
                  <NTabPane key={el.prop} tab={el.label} name={el.prop}>
                    {renderForm(el)}
                  </NTabPane>
                )
              })}
            </NTabs>
          )
        case ContainerType.CARD:
          return (
            <>
              {containerItems.map((el) => {
                return (
                  <NCard title={el.label} size="small">
                    {renderForm(el)}
                  </NCard>
                )
              })}
            </>
          )
        case ContainerType.FORM:
          return (
            <>
              {containerItems.map((el) => {
                return (
                  <>
                    <NDivider
                      title-placement="left"
                      style={{ marginTop: '0px', marginBottom: '0px' }}
                    >
                      {el.label}
                    </NDivider>
                    {renderForm(el)}
                  </>
                )
              })}
            </>
          )
        case ContainerType.TIMELINE:
          return (
            <NTimeline>
              {containerItems.map((el) => {
                return (
                  <NTimelineItem key={el.prop} title={el.label} type={'success'}>
                    {renderForm(el)}
                  </NTimelineItem>
                )
              })}
            </NTimeline>
          )
      }
    }
    return () => renderContainer(props.config)
  }
})
