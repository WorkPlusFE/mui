import Vue, { VueConstructor, VNode, ComponentOptions } from 'vue';
import { DefaultProps, RenderContext } from 'vue/types/options';
import { FunctionComponentOption } from '../types';
import { SlotsMixin } from '../../mixins/slots';

export interface IWpComponentOption extends ComponentOptions<Vue> {
  functional?: boolean;
  install?: (Vue: VueConstructor) => void;
}

export type TsxBaseProps<Slots> = {
  key: string | number;
  // hack for jsx prop spread
  props: any;
  class: any;
  style: string | object[] | object;
  scopedSlots: Slots;
};

export type TsxComponent<Props, Events, Slots> = (
  props: Partial<Props & Events & TsxBaseProps<Slots>>
) => VNode;

function install(this: ComponentOptions<Vue>, Vue: VueConstructor) {
  const { name } = this;
  Vue.component(name as string, this);
}

function unifySlots(context: RenderContext) {
  const scopedSlots = context.scopedSlots || context.data.scopedSlots || {};
  const slots = context.slots();

  Object.keys(slots).forEach(key => {
    if (!scopedSlots[key]) {
      scopedSlots[key] = () => slots[key];
    }
  });

  return scopedSlots;
}

function transformFunctionComponent(pure: FunctionComponentOption): IWpComponentOption {
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    inject: pure.inject,
    render: (h, ctx): any => pure(h, ctx.props, unifySlots(ctx), ctx)
  };
}

export function createComponent(name: string) {
  return function<Props = DefaultProps, Events = {}, Slots = {}> (
    sfc: IWpComponentOption | FunctionComponentOption
  ): TsxComponent<Props, Events, Slots> {
    if (typeof sfc === 'function') {
      sfc = transformFunctionComponent(sfc);
    }

    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(SlotsMixin);
    }

    sfc.name = name;
    sfc.install = install;

    return sfc as TsxComponent<Props, Events, Slots>;
  };
}
