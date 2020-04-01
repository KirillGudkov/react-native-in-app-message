import React, { Fragment } from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import { PanGestureHandler, ForceTouchGestureHandler } from 'react-native-gesture-handler';
import { NotificationBase } from './NotificationBase';
import { IOStyle } from "./iOStyle";
import { Util } from "../Util";
import { Blur } from "../RNInAppMessage/Blur";

export class Notification extends NotificationBase {

	static defaultProps = {
		useBlur: true,
		blurAmount: 7,
		duration: 2000,
		showKnob: true,
		textColor: '#000',
		backgroundColor: 'transparent',
		autohide: true,
		hideStatusBar: true,
		useForceTouch: false
	};

	offset = Util.isIphoneX() ? 42 : (this.props.hideStatusBar ? 8 : 22);

	render() {
		const { textColor, customComponent, blurAmount, blurType = 'light', useBlur, onPress, style, useForceTouch, showKnob, onForceTouchGestureEvent, onForceTouchHandlerStateChange, backgroundColor } = this.props;
		const animatedStyle = [IOStyle.notification, {
			top: this.offset,
			transform: [{ translateY: this.translateY }]
		}, IOStyle.mainStyle];
		const border = style ? style.borderRadius : 14;
		return (
			<Fragment>
				<PanGestureHandler onHandlerStateChange={this.onHandlerStateChange} onGestureEvent={this.onGestureEvent}>
					<Animated.View onLayout={this.handleOnLayout} style={animatedStyle}>
						<Animated.View style={[IOStyle.innerContainer, style, { borderRadius: border || 14 }]}>
							<TouchableOpacity style={IOStyle.container} activeOpacity={1} onPress={onPress}>
								{useBlur &&
									<Blur style={[IOStyle.absolute, { borderRadius: border || 14 }]} blurType={blurType}
										blurAmount={blurAmount} />
								}
								<ForceTouchGestureHandler
									minForce={0.2}
									enabled={useForceTouch}
									onGestureEvent={onForceTouchGestureEvent}
									onHandlerStateChange={onForceTouchHandlerStateChange}>
									<View style={IOStyle.content}>
										{customComponent ? this.renderCustomComponent() : this.renderOwnComponent()}
										{showKnob && <View style={[IOStyle.knob, { backgroundColor: textColor }]} />}
									</View>
								</ForceTouchGestureHandler>
							</TouchableOpacity>
						</Animated.View>
					</Animated.View>
				</PanGestureHandler>
			</Fragment>
		)
	}
}