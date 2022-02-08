/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Animated } from "react-native";
const INITIAL_POSITION = { x: 0, y: 0 };
const ANIMATION_CONFIG = {
    duration: 200,
    useNativeDriver: true,
};
const useAnimatedComponents = (hideHeaderWhenZoomed, hideFooterWhenZoomed) => {
    const headerTranslate = new Animated.ValueXY(INITIAL_POSITION);
    const footerTranslate = new Animated.ValueXY(INITIAL_POSITION);
    const headerHiddenPosition = hideHeaderWhenZoomed ? -300 : 0;
    const footerHiddenPosition = hideFooterWhenZoomed ? 300 : 0;
    const toggleVisible = (isVisible) => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(headerTranslate.y, { ...ANIMATION_CONFIG, toValue: 0 }),
                Animated.timing(footerTranslate.y, { ...ANIMATION_CONFIG, toValue: 0 }),
            ]).start();
        }
        else {
            Animated.parallel([
                Animated.timing(headerTranslate.y, {
                    ...ANIMATION_CONFIG,
                    toValue: headerHiddenPosition,
                }),
                Animated.timing(footerTranslate.y, {
                    ...ANIMATION_CONFIG,
                    toValue: footerHiddenPosition,
                }),
            ]).start();
        }
    };
    const headerTransform = headerTranslate.getTranslateTransform();
    const footerTransform = footerTranslate.getTranslateTransform();
    return [headerTransform, footerTransform, toggleVisible];
};
export default useAnimatedComponents;
