import { PropsDefinition, DefaultProps, RenderContext, InjectOptions } from 'vue/types/options';
import { CreateElement, VNode } from 'vue';

export type ModelOptions = {
  prop?: string;
  event?: string;
}

export type ObjectIndex = Record<string, any>;

export type ScopedSlot<Props = any> = (props?: Props) => VNode[] | VNode | undefined

export type DefaultSlots = {
  default?: ScopedSlot
}

export type ScopedSlots = DefaultSlots & {
  [key: string]: ScopedSlot | undefined
}

export type FunctionComponentOption<Props = DefaultProps, PropsDefs = PropsDefinition<Props>> = {
  (h: CreateElement, props: Props, slots: ScopedSlots, context: RenderContext<Props>): VNode | undefined
  props?: PropsDefs
  model?: ModelOptions
  inject?: InjectOptions
}
