/**
 * WaveJS
 *
 * @author Wave-studios
 */

declare namespace JSX {
	interface IntrinsicElements {
		// Main root
		html: GlobalProps;

		// Document Metadata
		base: GlobalProps;
		head: GlobalProps;
		link: GlobalProps;
		meta: GlobalProps;
		style: GlobalProps;
		title: GlobalProps;

		// Sectioning root
		body: GlobalProps;

		// Content sectioning
		address: GlobalProps;
		article: GlobalProps;
		aside: GlobalProps;
		footer: GlobalProps;
		header: GlobalProps;
		h1: GlobalProps;
		h2: GlobalProps;
		h3: GlobalProps;
		h4: GlobalProps;
		h5: GlobalProps;
		h6: GlobalProps;
		main: GlobalProps;
		nav: GlobalProps;
		section: GlobalProps;

		// Text content
		blockquote: GlobalProps;
		dd: GlobalProps;
		div: GlobalProps;
		dl: GlobalProps;
		dt: GlobalProps;
		figcaption: GlobalProps;
		figure: GlobalProps;
		hr: GlobalProps;
		li: GlobalProps;
		ol: GlobalProps;
		p: GlobalProps;
		pre: GlobalProps;
		ul: GlobalProps;

		// Inline text semantics
		a: GlobalProps;
		abbr: GlobalProps;
		b: GlobalProps;
		bdi: GlobalProps;
		bdo: GlobalProps;
		br: GlobalProps;
		cite: GlobalProps;
		code: GlobalProps;
		data: GlobalProps;
		dfn: GlobalProps;
		em: GlobalProps;
		i: GlobalProps;
		kbd: GlobalProps;
		mark: GlobalProps;
		q: GlobalProps;
		rp: GlobalProps;
		rt: GlobalProps;
		ruby: GlobalProps;
		s: GlobalProps;
		samp: GlobalProps;
		small: GlobalProps;
		span: GlobalProps;
		strong: GlobalProps;
		sub: GlobalProps;
		sup: GlobalProps;
		time: GlobalProps;
		u: GlobalProps;
		var: GlobalProps;
		wbr: GlobalProps;

		// Image and multimedia
		area: GlobalProps;
		audio: GlobalProps;
		img: GlobalProps;
		map: GlobalProps;
		track: GlobalProps;
		video: GlobalProps;

		// Embedded content
		embed: GlobalProps;
		iframe: GlobalProps;
		object: GlobalProps;
		param: GlobalProps;
		picture: GlobalProps;
		portal: GlobalProps;
		source: GlobalProps;

		// SVG and MathML
		svg: GlobalProps;
		math: GlobalProps;

		// Scripting
		canvas: GlobalProps;
		/** Due to wave not pre-rendering, this is pretty useless */
		noscript: GlobalProps;
		script: GlobalProps;

		// Demarcating edits
		del: GlobalProps;
		ins: GlobalProps;

		// Table content
		caption: GlobalProps;
		col: GlobalProps;
		colgroup: GlobalProps;
		table: GlobalProps;
		tbody: GlobalProps;
		td: GlobalProps;
		tfoot: GlobalProps;
		th: GlobalProps;
		thead: GlobalProps;
		tr: GlobalProps;

		// Forms
		button: GlobalProps;
		datalist: GlobalProps;
		fieldset: GlobalProps;
		form: GlobalProps;
		input: GlobalProps;
		label: GlobalProps;
		legend: GlobalProps;
		meter: GlobalProps;
		optgroup: GlobalProps;
		option: GlobalProps;
		output: GlobalProps;
		progress: GlobalProps;
		select: GlobalProps;
		textarea: GlobalProps;

		// Interactive elements
		details: GlobalProps;
		dialog: GlobalProps;
		menu: GlobalProps;
		summary: GlobalProps;

		// Web Components
		slot: GlobalProps;
		template: GlobalProps;
	}
	interface AttributeCollection {
		[name: string]: unknown;
		className?: string;
		children?: unknown[];
	}
	// Make Deno TS stop yelling
	interface IntrinsicAttributes
		extends AttributeCollection,
			AttributeCollection {}
	interface ElementAttributesProperty {
		props: unknown;
	}
}

// Individual elements
interface GlobalProps {
	// Properties
	className?: string;
	style?: WJSCssClasses | string;
	id?: string;

	// Events
	onClick?: (e: Event) => void;

	// Non-implemented elements - Remove this when all typings are done
	[name: string]: unknown;
}

// JS Css classes
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
}
