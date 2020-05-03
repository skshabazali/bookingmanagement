import { Dimensions, Platform, PixelRatio } from 'react-native';

const guidelineHeight = (Platform.OS === 'ios' ? 812 : 640)

export function normalizeHeight(size) {

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
  // based on iphone X's scale
  const scale = SCREEN_HEIGHT / guidelineHeight;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}