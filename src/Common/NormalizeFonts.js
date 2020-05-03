import { Dimensions, Platform, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info'

// const tablet = DeviceInfo.isTablet ? true : false;

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

var guidelineWidth = (Platform.OS === 'ios' ? 812 : 680);
if(DeviceInfo.isTablet()){
  guidelineWidth = (Platform.OS === 'ios' ? 812 : 640)
}
else{
  guidelineWidth = (Platform.OS === 'ios' ? 812 : 680)
}
// const guidelineWidthTablet = (Platform.OS === 'ios' ? 768 : 640)

export function normalizeFont(size) {

  
  // based on iphone Xs's scale

  
  
  const scalew = SCREEN_HEIGHT / (guidelineWidth);

  const newSize = size * scalew
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))-2;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}