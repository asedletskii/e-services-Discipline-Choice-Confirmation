import { PaletteOptions as MuiPaletteOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary']
    surface: Palette['primary']
    accent: Palette['primary']
    info: Palette['primary']
    text: Palette['primary']
    surfaceHover: string
    stroke: string
    grayDisabled: string
  }

  interface PaletteOptions {
    gray: MuiPaletteOptions['primary']
    surface: MuiPaletteOptions['primary']
    accent: MuiPaletteOptions['primary']
    info: MuiPaletteOptions['primary']
    text: MuiPaletteOptions['primary']
    surfaceHover?: Palette['surfaceHover']
    stroke?: Palette['stroke']
    grayDisabled?: Palette['grayDisabled']
  }

  type SvgIconPropsColorOverrides = 'gray'
}
