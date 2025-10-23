export type CustomTabbarProps = {
	show ?: boolean
	tabList ?: Array<{
		pagePath : string
		text : string
		iconPath : string
		selectedIconPath : string
		visible ?: boolean
	}>
	color ?: string
	selectedColor ?: string
	backgroundColor ?: string
}