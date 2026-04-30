export type DistributiveOmit<T, K extends keyof unknown> = T extends unknown
  ? Omit<T, K>
  : never
