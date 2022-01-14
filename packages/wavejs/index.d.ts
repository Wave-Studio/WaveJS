// WaveJS - Hash Router
declare namespace WJSRouters {
	const HashRouter: WJSHashRouter 
}

interface WJSHashRouterReturn {
	addRoute: (
		route: string,
		page: WJSRouterPage,
		replace?: boolean
	) => WJSHashRouterReturn;
	removeRoute: (route: string) => WJSHashRouterReturn;
}

interface WJSRouterPage {
	title: string;
	// deno-lint-ignore no-explicit-any
	component: ((...args: any[]) => unknown) | string;
}

interface WJSHashRouterOptions {
	/** Passes the page as a Children prop - Makes global components easy */
	wrapper?: ({ children }: { children: () => unknown }) => unknown | string;
}

interface WJSRouter {
	/** Homepage */
	home: WJSRouterPage;
	/** Shown when going to an invalid route */
	404?: WJSRouterPage;
	/** Any other route */
	// Typing hack
	[route: string]: WJSRouterPage | undefined;
}

interface WJSHashRouter {
	create(
		routes: WJSRouter,
		options?: WJSHashRouterOptions
	): WJSHashRouterReturn;
}

// WaveJS - Core
declare namespace WJS {
	function h(
		tagName:
			| string
			| ((
					...args: (string | JSX.AttributeCollection)[]
			  ) => Element | DocumentFragment)
			| DocumentFragment,
		attributes: JSX.AttributeCollection | null,
		...children: string[]
	): Element | DocumentFragment;

	function page(
		{}: {
			title?: string;
			route?: string;
		},
		page: () => unknown | string
	): void;

	function useState<T>(initialValue: T): [T, (value: T) => void];

	/* Same as useState except that states are saved for the session */
	function useSessionState<T>(initialValue: T): [() => T, (value: T) => void];
}

declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: {
			[propName: string]: unknown;
			className?: string;
			style?: WJSCssClasses;
			id?: string;
			onClick?: string | ((...args: unknown[]) => void);
		};
	}
	interface AttributeCollection {
		[name: string]: unknown;
		className?: string;
		children?: string | string[];
	}
	// Make Deno TS stop yelling
	interface IntrinsicAttributes extends AttributeCollection, AttributeCollection {}
	interface ElementAttributesProperty {
		props: unknown;
	}
}

declare interface WJSCssClasses {
	alignContent?: string;
	alignItems?: string;
	alignSelf?: string;
	alignmentBaseline?: string;
	all?: string;
	animation?: string;
	animationDelay?: string;
	animationDirection?: string;
	animationDuration?: string;
	animationFillMode?: string;
	animationIterationCount?: string;
	animationName?: string;
	animationPlayState?: string;
	animationTimingFunction?: string;
	appearance?: string;
	aspectRatio?: string;
	backfaceVisibility?: string;
	background?: string;
	backgroundAttachment?: string;
	backgroundBlendMode?: string;
	backgroundClip?: string;
	backgroundColor?: string;
	backgroundImage?: string;
	backgroundOrigin?: string;
	backgroundPosition?: string;
	backgroundPositionX?: string;
	backgroundPositionY?: string;
	backgroundRepeat?: string;
	backgroundSize?: string;
	baselineShift?: string;
	blockSize?: string;
	border?: string;
	borderBlock?: string;
	borderBlockColor?: string;
	borderBlockEnd?: string;
	borderBlockEndColor?: string;
	borderBlockEndStyle?: string;
	borderBlockEndWidth?: string;
	borderBlockStart?: string;
	borderBlockStartColor?: string;
	borderBlockStartStyle?: string;
	borderBlockStartWidth?: string;
	borderBlockStyle?: string;
	borderBlockWidth?: string;
	borderBottom?: string;
	borderBottomColor?: string;
	borderBottomLeftRadius?: string;
	borderBottomRightRadius?: string;
	borderBottomStyle?: string;
	borderBottomWidth?: string;
	borderCollapse?: string;
	borderColor?: string;
	borderEndEndRadius?: string;
	borderEndStartRadius?: string;
	borderImage?: string;
	borderImageOutset?: string;
	borderImageRepeat?: string;
	borderImageSlice?: string;
	borderImageSource?: string;
	borderImageWidth?: string;
	borderInline?: string;
	borderInlineColor?: string;
	borderInlineEnd?: string;
	borderInlineEndColor?: string;
	borderInlineEndStyle?: string;
	borderInlineEndWidth?: string;
	borderInlineStart?: string;
	borderInlineStartColor?: string;
	borderInlineStartStyle?: string;
	borderInlineStartWidth?: string;
	borderInlineStyle?: string;
	borderInlineWidth?: string;
	borderLeft?: string;
	borderLeftColor?: string;
	borderLeftStyle?: string;
	borderLeftWidth?: string;
	borderRadius?: string;
	borderRight?: string;
	borderRightColor?: string;
	borderRightStyle?: string;
	borderRightWidth?: string;
	borderSpacing?: string;
	borderStartEndRadius?: string;
	borderStartStartRadius?: string;
	borderStyle?: string;
	borderTop?: string;
	borderTopColor?: string;
	borderTopLeftRadius?: string;
	borderTopRightRadius?: string;
	borderTopStyle?: string;
	borderTopWidth?: string;
	borderWidth?: string;
	bottom?: string;
	boxShadow?: string;
	boxSizing?: string;
	breakAfter?: string;
	breakBefore?: string;
	breakInside?: string;
	captionSide?: string;
	caretColor?: string;
	clear?: string;
	clipPath?: string;
	clipRule?: string;
	color?: string;
	colorInterpolation?: string;
	colorInterpolationFilters?: string;
	colorScheme?: string;
	columnCount?: string;
	columnFill?: string;
	columnGap?: string;
	columnRule?: string;
	columnRuleColor?: string;
	columnRuleStyle?: string;
	columnRuleWidth?: string;
	columnSpan?: string;
	columnWidth?: string;
	columns?: string;
	contain?: string;
	content?: string;
	counterIncrement?: string;
	counterReset?: string;
	counterSet?: string;
	cssFloat?: string;
	cssText?: string;
	cursor?: string;
	direction?: string;
	display?: string;
	dominantBaseline?: string;
	emptyCells?: string;
	fill?: string;
	fillOpacity?: string;
	fillRule?: string;
	filter?: string;
	flex?: string;
	flexBasis?: string;
	flexDirection?: string;
	flexFlow?: string;
	flexGrow?: string;
	flexShrink?: string;
	flexWrap?: string;
	float?: string;
	floodColor?: string;
	floodOpacity?: string;
	font?: string;
	fontFamily?: string;
	fontFeatureSettings?: string;
	fontKerning?: string;
	fontOpticalSizing?: string;
	fontSize?: string;
	fontSizeAdjust?: string;
	fontStretch?: string;
	fontStyle?: string;
	fontSynthesis?: string;
	fontVariant?: string;
	fontVariantCaps?: string;
	fontVariantEastAsian?: string;
	fontVariantLigatures?: string;
	fontVariantNumeric?: string;
	fontVariantPosition?: string;
	fontVariationSettings?: string;
	fontWeight?: string;
	gap?: string;
	grid?: string;
	gridArea?: string;
	gridAutoColumns?: string;
	gridAutoFlow?: string;
	gridAutoRows?: string;
	gridColumn?: string;
	gridColumnEnd?: string;
	gridColumnGap?: string;
	gridColumnStart?: string;
	gridGap?: string;
	gridRow?: string;
	gridRowEnd?: string;
	gridRowGap?: string;
	gridRowStart?: string;
	gridTemplate?: string;
	gridTemplateAreas?: string;
	gridTemplateColumns?: string;
	gridTemplateRows?: string;
	height?: string;
	hyphens?: string;
	imageRendering?: string;
	inlineSize?: string;
	inset?: string;
	insetBlock?: string;
	insetBlockEnd?: string;
	insetBlockStart?: string;
	insetInline?: string;
	insetInlineEnd?: string;
	insetInlineStart?: string;
	isolation?: string;
	justifyContent?: string;
	justifyItems?: string;
	justifySelf?: string;
	left?: string;
	readonly length?: number;
	letterSpacing?: string;
	lightingColor?: string;
	lineBreak?: string;
	lineHeight?: string;
	listStyle?: string;
	listStyleImage?: string;
	listStylePosition?: string;
	listStyleType?: string;
	margin?: string;
	marginBlock?: string;
	marginBlockEnd?: string;
	marginBlockStart?: string;
	marginBottom?: string;
	marginInline?: string;
	marginInlineEnd?: string;
	marginInlineStart?: string;
	marginLeft?: string;
	marginRight?: string;
	marginTop?: string;
	marker?: string;
	markerEnd?: string;
	markerMid?: string;
	markerStart?: string;
	mask?: string;
	maskType?: string;
	maxBlockSize?: string;
	maxHeight?: string;
	maxInlineSize?: string;
	maxWidth?: string;
	minBlockSize?: string;
	minHeight?: string;
	minInlineSize?: string;
	minWidth?: string;
	mixBlendMode?: string;
	objectFit?: string;
	objectPosition?: string;
	offset?: string;
	offsetAnchor?: string;
	offsetDistance?: string;
	offsetPath?: string;
	offsetRotate?: string;
	opacity?: string;
	order?: string;
	orphans?: string;
	outline?: string;
	outlineColor?: string;
	outlineOffset?: string;
	outlineStyle?: string;
	outlineWidth?: string;
	overflow?: string;
	overflowAnchor?: string;
	overflowWrap?: string;
	overflowX?: string;
	overflowY?: string;
	overscrollBehavior?: string;
	overscrollBehaviorBlock?: string;
	overscrollBehaviorInline?: string;
	overscrollBehaviorX?: string;
	overscrollBehaviorY?: string;
	padding?: string;
	paddingBlock?: string;
	paddingBlockEnd?: string;
	paddingBlockStart?: string;
	paddingBottom?: string;
	paddingInline?: string;
	paddingInlineEnd?: string;
	paddingInlineStart?: string;
	paddingLeft?: string;
	paddingRight?: string;
	paddingTop?: string;
	pageBreakAfter?: string;
	pageBreakBefore?: string;
	pageBreakInside?: string;
	paintOrder?: string;
	perspective?: string;
	perspectiveOrigin?: string;
	placeContent?: string;
	placeItems?: string;
	placeSelf?: string;
	pointerEvents?: string;
	position?: string;
	quotes?: string;
	resize?: string;
	right?: string;
	rotate?: string;
	rowGap?: string;
	rubyPosition?: string;
	scale?: string;
	scrollBehavior?: string;
	scrollMargin?: string;
	scrollMarginBlock?: string;
	scrollMarginBlockEnd?: string;
	scrollMarginBlockStart?: string;
	scrollMarginBottom?: string;
	scrollMarginInline?: string;
	scrollMarginInlineEnd?: string;
	scrollMarginInlineStart?: string;
	scrollMarginLeft?: string;
	scrollMarginRight?: string;
	scrollMarginTop?: string;
	scrollPadding?: string;
	scrollPaddingBlock?: string;
	scrollPaddingBlockEnd?: string;
	scrollPaddingBlockStart?: string;
	scrollPaddingBottom?: string;
	scrollPaddingInline?: string;
	scrollPaddingInlineEnd?: string;
	scrollPaddingInlineStart?: string;
	scrollPaddingLeft?: string;
	scrollPaddingRight?: string;
	scrollPaddingTop?: string;
	scrollSnapAlign?: string;
	scrollSnapStop?: string;
	scrollSnapType?: string;
	shapeImageThreshold?: string;
	shapeMargin?: string;
	shapeOutside?: string;
	shapeRendering?: string;
	stopColor?: string;
	stopOpacity?: string;
	stroke?: string;
	strokeDasharray?: string;
	strokeDashoffset?: string;
	strokeLinecap?: string;
	strokeLinejoin?: string;
	strokeMiterlimit?: string;
	strokeOpacity?: string;
	strokeWidth?: string;
	tabSize?: string;
	tableLayout?: string;
	textAlign?: string;
	textAlignLast?: string;
	textAnchor?: string;
	textCombineUpright?: string;
	textDecoration?: string;
	textDecorationColor?: string;
	textDecorationLine?: string;
	textDecorationSkipInk?: string;
	textDecorationStyle?: string;
	textDecorationThickness?: string;
	textEmphasis?: string;
	textEmphasisColor?: string;
	textEmphasisPosition?: string;
	textEmphasisStyle?: string;
	textIndent?: string;
	textOrientation?: string;
	textOverflow?: string;
	textRendering?: string;
	textShadow?: string;
	textTransform?: string;
	textUnderlineOffset?: string;
	textUnderlinePosition?: string;
	top?: string;
	touchAction?: string;
	transform?: string;
	transformBox?: string;
	transformOrigin?: string;
	transformStyle?: string;
	transition?: string;
	transitionDelay?: string;
	transitionDuration?: string;
	transitionProperty?: string;
	transitionTimingFunction?: string;
	translate?: string;
	unicodeBidi?: string;
	userSelect?: string;
	verticalAlign?: string;
	visibility?: string;
	webkitLineClamp?: string;
	webkitMaskComposite?: string;
	webkitTextFillColor?: string;
	webkitTextStroke?: string;
	webkitTextStrokeColor?: string;
	webkitTextStrokeWidth?: string;
	whiteSpace?: string;
	widows?: string;
	width?: string;
	willChange?: string;
	wordBreak?: string;
	wordSpacing?: string;
	writingMode?: string;
	zIndex?: string;

	// Deprecated properties
	// May be removed in future versions of wavejs
	/** @deprecated */
	clip?: string;
	/** @deprecated */
	wordWrap?: string;
	/** @deprecated This is a legacy alias of `transform`. */
	webkitTransform?: string;
	/** @deprecated This is a legacy alias of `transformOrigin`. */
	webkitTransformOrigin?: string;
	/** @deprecated This is a legacy alias of `transformStyle`. */
	webkitTransformStyle?: string;
	/** @deprecated This is a legacy alias of `transition`. */
	webkitTransition?: string;
	/** @deprecated This is a legacy alias of `transitionDelay`. */
	webkitTransitionDelay?: string;
	/** @deprecated This is a legacy alias of `transitionDuration`. */
	webkitTransitionDuration?: string;
	/** @deprecated This is a legacy alias of `transitionProperty`. */
	webkitTransitionProperty?: string;
	/** @deprecated This is a legacy alias of `transitionTimingFunction`. */
	webkitTransitionTimingFunction?: string;
	/** @deprecated This is a legacy alias of `userSelect`. */
	webkitUserSelect?: string;
	/** @deprecated This is a legacy alias of `maskImage`. */
	webkitMaskImage?: string;
	/** @deprecated This is a legacy alias of `maskOrigin`. */
	webkitMaskOrigin?: string;
	/** @deprecated This is a legacy alias of `maskPosition`. */
	webkitMaskPosition?: string;
	/** @deprecated This is a legacy alias of `maskRepeat`. */
	webkitMaskRepeat?: string;
	/** @deprecated This is a legacy alias of `maskSize`. */
	webkitMaskSize?: string;
	/** @deprecated This is a legacy alias of `order`. */
	webkitOrder?: string;
	/** @deprecated This is a legacy alias of `perspective`. */
	webkitPerspective?: string;
	/** @deprecated This is a legacy alias of `perspectiveOrigin`. */
	webkitPerspectiveOrigin?: string;
	/** @deprecated This is a legacy alias of `mask`. */
	webkitMask?: string;
	/** @deprecated This is a legacy alias of `maskBorder`. */
	webkitMaskBoxImage?: string;
	/** @deprecated This is a legacy alias of `maskBorderOutset`. */
	webkitMaskBoxImageOutset?: string;
	/** @deprecated This is a legacy alias of `maskBorderRepeat`. */
	webkitMaskBoxImageRepeat?: string;
	/** @deprecated This is a legacy alias of `maskBorderSlice`. */
	webkitMaskBoxImageSlice?: string;
	/** @deprecated This is a legacy alias of `maskBorderSource`. */
	webkitMaskBoxImageSource?: string;
	/** @deprecated This is a legacy alias of `maskBorderWidth`. */
	webkitMaskBoxImageWidth?: string;
	/** @deprecated This is a legacy alias of `maskClip`. */
	webkitMaskClip?: string;
	/** @deprecated This is a legacy alias of `alignContent`. */
	webkitAlignContent?: string;
	/** @deprecated This is a legacy alias of `alignItems`. */
	webkitAlignItems?: string;
	/** @deprecated This is a legacy alias of `alignSelf`. */
	webkitAlignSelf?: string;
	/** @deprecated This is a legacy alias of `animation`. */
	webkitAnimation?: string;
	/** @deprecated This is a legacy alias of `animationDelay`. */
	webkitAnimationDelay?: string;
	/** @deprecated This is a legacy alias of `animationDirection`. */
	webkitAnimationDirection?: string;
	/** @deprecated This is a legacy alias of `animationDuration`. */
	webkitAnimationDuration?: string;
	/** @deprecated This is a legacy alias of `animationFillMode`. */
	webkitAnimationFillMode?: string;
	/** @deprecated This is a legacy alias of `animationIterationCount`. */
	webkitAnimationIterationCount?: string;
	/** @deprecated This is a legacy alias of `animationName`. */
	webkitAnimationName?: string;
	/** @deprecated This is a legacy alias of `animationPlayState`. */
	webkitAnimationPlayState?: string;
	/** @deprecated This is a legacy alias of `animationTimingFunction`. */
	webkitAnimationTimingFunction?: string;
	/** @deprecated This is a legacy alias of `appearance`. */
	webkitAppearance?: string;
	/** @deprecated This is a legacy alias of `backfaceVisibility`. */
	webkitBackfaceVisibility?: string;
	/** @deprecated This is a legacy alias of `backgroundClip`. */
	webkitBackgroundClip?: string;
	/** @deprecated This is a legacy alias of `backgroundOrigin`. */
	webkitBackgroundOrigin?: string;
	/** @deprecated This is a legacy alias of `backgroundSize`. */
	webkitBackgroundSize?: string;
	/** @deprecated This is a legacy alias of `borderBottomLeftRadius`. */
	webkitBorderBottomLeftRadius?: string;
	/** @deprecated This is a legacy alias of `borderBottomRightRadius`. */
	webkitBorderBottomRightRadius?: string;
	/** @deprecated This is a legacy alias of `borderRadius`. */
	webkitBorderRadius?: string;
	/** @deprecated This is a legacy alias of `borderTopLeftRadius`. */
	webkitBorderTopLeftRadius?: string;
	/** @deprecated This is a legacy alias of `borderTopRightRadius`. */
	webkitBorderTopRightRadius?: string;
	/** @deprecated */
	webkitBoxAlign?: string;
	/** @deprecated */
	webkitBoxFlex?: string;
	/** @deprecated */
	webkitBoxOrdinalGroup?: string;
	/** @deprecated */
	webkitBoxOrient?: string;
	/** @deprecated */
	webkitBoxPack?: string;
	/** @deprecated This is a legacy alias of `boxShadow`. */
	webkitBoxShadow?: string;
	/** @deprecated This is a legacy alias of `boxSizing`. */
	webkitBoxSizing?: string;
	/** @deprecated This is a legacy alias of `filter`. */
	webkitFilter?: string;
	/** @deprecated This is a legacy alias of `flex`. */
	webkitFlex?: string;
	/** @deprecated This is a legacy alias of `flexBasis`. */
	webkitFlexBasis?: string;
	/** @deprecated This is a legacy alias of `flexDirection`. */
	webkitFlexDirection?: string;
	/** @deprecated This is a legacy alias of `flexFlow`. */
	webkitFlexFlow?: string;
	/** @deprecated This is a legacy alias of `flexGrow`. */
	webkitFlexGrow?: string;
	/** @deprecated This is a legacy alias of `flexShrink`. */
	webkitFlexShrink?: string;
	/** @deprecated This is a legacy alias of `flexWrap`. */
	webkitFlexWrap?: string;
	/** @deprecated This is a legacy alias of `justifyContent`. */
	webkitJustifyContent?: string;
	/** @deprecated */
	imageOrientation?: string;
	/** @deprecated */
	fontVariantAlternates?: string;
}
