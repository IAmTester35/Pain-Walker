export enum GameState {
  Setup,
  Loading,
  Playing,
  Error,
}

export enum Age {
  Preschool = 'for a preschool child (under 5)',
  Kid = 'for a young child (8-12)',
  Teen = 'for a teenager',
  Adult = 'for an adult',
  Elderly = 'for an elderly person',
}

export enum Style {
  FolkloreHorror = 'dark, gritty, Vietnamese folklore horror',
  Realistic = 'photorealistic, cinematic, hyper-detailed',
  Cartoon = 'vibrant, animated, friendly cartoon',
  Mythical = 'epic, mythical, legendary, fantasy art',
  Cyberpunk = 'neon-lit, futuristic, high-tech cyberpunk',
  InkWash = 'traditional Vietnamese ink wash painting style, minimalist',
  Anime = 'classic 1990s anime style, vibrant, cel-shaded',
  PixelArt = '16-bit pixel art, retro video game style, limited color palette',
  Watercolor = 'soft, dreamlike, watercolor painting style',
  LowPoly = 'low poly, stylized, geometric, 3D render',
}

export type Direction = 'forward' | 'backward' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export interface GameSettings {
  age: Age;
  style: Style;
  terrain: string;
}

export interface VisitedCellData {
  imageBase64: string;
  prompt: string;
}