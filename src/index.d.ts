interface TurbulentFluxOptions {
  minDistance: number
  speed: number
  spotsCountFactor: number
  saturation: number
  lightness: number
  blurRadius: number
  spotRadius: number
}

export declare const DEFAULT_OPTIONS: TurbulentFluxOptions

export declare class TurbulentFlux {
  element: HTMLElement
  options: TurbulentFluxOptions
  paused: boolean

  constructor(element: HTMLElement, options?: Partial<TurbulentFluxOptions>)

  get containerWidth(): number
  get containerHeight(): number
  get containerSize(): number
  get containerDiagonal(): number
  get spotsCount(): number
  get randomColor(): string

  raf(): void
  play(): void
  pause(): void
  toggle(): void
}

export default TurbulentFlux
