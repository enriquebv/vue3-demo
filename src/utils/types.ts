export type InferComponentProps<ComponentTypeOf extends { $props: any }> = ComponentTypeOf['$props']
