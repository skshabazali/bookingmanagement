import { Dimensions, Platform, PixelRatio } from 'react-native';

const guidelineWidth = (Platform.OS === 'ios' ? 375 : 360)

export function normalizeWidth(size) {

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
  // based on iphone Xs's scale
  const scale = SCREEN_WIDTH / guidelineWidth;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}