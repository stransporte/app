import { SNavigation, SText, STextProps } from "servisofts-component"

type LinkProps = { children: any, src: string, params: any, style: any }

export default (props: LinkProps) => {
    const { children, src, params } = props;
    return <SText
        onPress={() => SNavigation.navigate(src, params)}
        color={"#7AA8F2"}
        {...props}
        style={{
            textDecoration: "underline",
            ...props?.style
        }} >{children ?? src}</SText>
}   