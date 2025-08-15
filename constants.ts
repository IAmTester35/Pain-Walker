import { Age, Style } from './types';

export const AGE_OPTIONS = [
  { value: Age.Preschool, label: 'Mầm non' },
  { value: Age.Kid, label: 'Trẻ em' },
  { value: Age.Teen, label: 'Thanh thiếu niên' },
  { value: Age.Adult, label: 'Người lớn' },
  { value: Age.Elderly, label: 'Người cao tuổi' },
];

export const STYLE_OPTIONS = [
  { value: Style.FolkloreHorror, label: 'Kinh dị dân gian' },
  { value: Style.Realistic, label: 'Chân thực' },
  { value: Style.Cartoon, label: 'Hoạt hình' },
  { value: Style.Mythical, label: 'Thần thoại' },
  { value: Style.Cyberpunk, label: 'Viễn tưởng Cyberpunk' },
  { value: Style.InkWash, label: 'Tranh thủy mặc' },
  { value: Style.Anime, label: 'Anime (Hoạt hình Nhật Bản)' },
  { value: Style.PixelArt, label: 'Pixel Art (Nghệ thuật điểm ảnh)' },
  { value: Style.Watercolor, label: 'Tranh màu nước' },
  { value: Style.LowPoly, label: 'Đa giác thấp (Low Poly)' },
];

export const RANDOM_TERRAINS = [
    "một ngôi làng cổ ven sông", "thành phố Hồ Chí Minh về đêm đầy đèn neon", "một ngôi đền cổ bị lãng quên trong rừng rậm",
    "một cánh đồng lúa bậc thang ở Sapa", "một khu chợ nổi trên sông Cửu Long", "vịnh Hạ Long trong sương sớm",
    "một ngọn núi đá vôi hùng vĩ", "một khu phố cổ Hà Nội ảm đạm", "một hang động kỳ ảo với thạch nhũ phát sáng"
];

export const MINIMAP_SIZE = 15; // The width and height of the map grid