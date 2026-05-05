type BaseSelectOption<T extends string> = {
  label: string
  value: T | (string & {})
}

export type SelectOption<T extends string> = BaseSelectOption<T> & {
  group?: string
}
