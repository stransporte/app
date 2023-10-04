import { Text, View, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { Component } from 'react'
import { SList, SStorage, SText, STheme, SThread, SView } from 'servisofts-component'
import * as ReservedWords from './ReservedWords';

export default class TextArea extends Component {
    inp: TextInput;
    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            // value: "abcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ",
            value: ``,
            event: "",
            selection: { start: 1, end: 1 }
        }
    }


    componentDidMount() {
        SStorage.getItem("value_text", (val) => {
            this.setState({ value: val ?? "" })
        })
    }
    getValue() {
        return this.state.value;
    }
    preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    handleOnKeyPress_Tab = (e) => {
        this.preventDefault(e);

        const tapSpaces = 1;
        // e.preventDefault();  

        if (this.state.selection.start == this.state.selection.end) {
            if (this.state.selection.start == this.state.value.length) {
                this.handleOnChangeText(this.state.value + "\t")
                return;
            }

            let start = this.state.value.substring(0, this.state.selection.start)
            let end = this.state.value.substring(this.state.selection.start, this.state.value.length)
            this.state.selection.start = this.state.selection.start + tapSpaces;
            this.state.selection.end = this.state.selection.end + tapSpaces;
            this.state.event = "tab"
            this.handleOnChangeText(start + "\t" + end)

        } else {
            // this.handleOnChangeText(this.state.value + "\t")
        }
        new SThread(10, "sad", true).start(() => {
            this.inp.selectionStart = this.state.selection.start;
            this.inp.selectionEnd = this.state.selection.end;
        })

    }

    handleOnKeyPress_ArrowDown = (e) => {
        if (e.nativeEvent.shiftKey && e.nativeEvent.altKey) {
            this.preventDefault(e);
            let position_line_start = this.state.value.lastIndexOf("\n", this.state.selection.start - 1);
            let position_line_end = this.state.value.indexOf("\n", this.state.selection.end);
            let row = ""
            if (position_line_start < 0) {
                position_line_start = 0
            }
            if (position_line_end < 0) {
                position_line_end = this.state.value.length
            }
            row = this.state.value.substring(position_line_start, position_line_end);
            if (row.indexOf("\n") < 0) {
                row = "\n" + row;
            }
            if (!row.startsWith("\n")) {
                row = "\n" + row;
            }
            let value = this.state.value.substring(0, position_line_end) + row + this.state.value.substring(position_line_end, this.state.value.length)
            let saveSelect = { ...this.state.selection }
            saveSelect.start += row.length
            saveSelect.end += row.length
            this.handleOnChangeText(value)
            new SThread(10, "sadas", true).start(() => {
                this.state.selection = saveSelect
                this.inp.selectionStart = this.state.selection.start;
                this.inp.selectionEnd = this.state.selection.end;
            })
            // console.log(this.state.selection)
            console.log("clonar la posicion: ", row);
        }
    }
    handleOnKeyPress = (e) => {
        let key = e.nativeEvent.key;
        switch (key) {
            case "Tab":
                this.handleOnKeyPress_Tab(e);
                break;
            case "ArrowDown":
                this.handleOnKeyPress_ArrowDown(e);
                break;
        }

    }
    handleOnChangeText = (text) => {
        this.state.value = text;
        this.setState({ value: this.state.value })
        new SThread(500, "sad", true).start(() => {
            console.log("fuardo el elmento")
            SStorage.setItem("value_text", this.state.value)
        })


    }
    generarColorAleatorio() {
        const letras = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letras[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    buildWords(style) {

        // console.log(mayusc)

        let palabrasReservadas = Object.keys(ReservedWords.SQL);

        let wordMatch = []
        palabrasReservadas.forEach((palabra) => {
            let regex = new RegExp(`${palabra}`, 'gi');
            let match;
            while ((match = regex.exec(this.state.value)) !== null) {
                let wordReserved = {
                    word: match[0],
                    indexStart: match.index,
                    indexEnd: match.index + match[0].length,
                    color: ReservedWords.SQL[palabra]
                }
                wordMatch.push(wordReserved);
            }
        })
        // });
        // textToRender =textToRender.replace(/select/gi,  )

        // return <SList data={this.state.value.split("\n")} initSpace={0} space={0} render={obj => {
        //     return <Text style={[style, { color: "#f00", }]}>{obj??" "}</Text>
        // }} />
        let index = 0;
        let ARRAY = [];
        wordMatch.sort((a, b) => a.indexStart - b.indexStart).map(a => {
            if (index > a.indexStart) return;
            ARRAY.push(this.state.value.substring(index, a.indexStart))
            ARRAY.push(<Text style={[style, { color: a.color }]}>{a.word}</Text>)
            index = a.indexEnd;
        })
        ARRAY.push(this.state.value.substring(index, this.state.value.length))
        return <Text style={[style]}>{ARRAY}</Text>
    }
    render() {
        let textStyle = {
            fontSize: 14,
            lineHeight: 18,
            fontFamily: "Roboto",
            font: "Roboto",
            caretColor: STheme.color.text,
            color: STheme.color.text,
            padding: 0,
            margin: 0

        }
        let style = {
            borderWidth: 0,
            overflow: "hidden",
            outline: "none",
            ...textStyle
        }
        return (
            <SView col={"xs-12"} flex onLayout={e => {
                this.state.layout = e.nativeEvent.layout
                this.setState({ ...this.state })
            }}>
                <KeyboardAvoidingView
                    // keyboardVerticalOffset={20}
                    keyboardVerticalOffset={Platform.select({ ios: 50, android: 20 })}
                    enabled
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{ flex: 1 }}
                >
                    <ScrollView style={{ flex: 1, height: "100%" }}
                        ref={ref => this.scrollViewVertical = ref}
                        contentContainerStyle={{
                            minHeight: "100%"
                        }}
                        onContentSizeChange={() => {
                            // this.scrollViewVertical.scrollToEnd({ animated: false })
                        }}
                    >
                        <SView col={"xs-12"} row flex >
                            <SView width={10} ></SView>
                            <SView width={30} >
                                <SList space={0}
                                    scrollEnabled={false}
                                    data={this.state.value.split("\n")} render={(o, k, i) => <Text style={{
                                        ...textStyle,
                                        color: "#666",
                                        fontSize: textStyle.fontSize - 2,

                                    }}>{((i + 1) + "").padStart(4, " ")}</Text>} />
                            </SView>
                            <SView width={20} style={{
                                borderRightWidth: 1,
                                borderColor: "#eee"
                            }} ></SView>
                            <SView flex height={"100%"} >
                                <ScrollView horizontal
                                    ref={ref => this.scrollViewHorizontal = ref}
                                    style={{
                                        flex: 1
                                    }} >
                                    <SView row style={{
                                        width: Math.max(500, (this.state?.layout?.width ?? 100) - 60),
                                        // width: 3000,
                                        height: Math.max(parseFloat(this.state?.height ?? 0), this.state?.layout?.height ?? 100),
                                    }}>
                                        <View style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%" }} >
                                            <TextInput
                                                ref={ref => this.inp = ref}
                                                value={this.state.value}
                                                onLayout={(evt) => {
                                                    // console.log(evt);/
                                                }}
                                                cursorColor={"#000000"}
                                                // allowFontScaling={false}
                                                scrollEnabled={false}
                                                style={{
                                                    ...style,

                                                    paddingTop: 0,//No quitar son para IOS
                                                    marginTop: 0,//No quitar son para IOS
                                                    padding: 0,
                                                    margin: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    color: "#ffffff00",
                                                }}
                                                autoCorrect={false}
                                                autoFocus
                                                multiline={true}
                                                rows={1000}
                                                onKeyPress={this.handleOnKeyPress.bind(this)}
                                                onChangeText={this.handleOnChangeText.bind(this)}
                                                onFocus={(evt) => {
                                                    // this.scrollViewVertical.scrollTo({ x: 0, y: 0, animated: false })
                                                }}
                                                onSubmitEditing={e => {

                                                }}
                                                onContentSizeChange={(event) => {
                                                    this.state.width = event.nativeEvent.contentSize.width;
                                                    if (this.state.height != event.nativeEvent.contentSize.height) {
                                                        this.state.height = event.nativeEvent.contentSize.height;
                                                        this.setState({ ...this.state })

                                                    }
                                                }}
                                                onSelectionChange={(e) => {
                                                    if (this.state.event == "tab") {
                                                        this.state.event = "onSelectionChange";
                                                        // this.setState({ ...this.state })
                                                        return;
                                                    }
                                                    this.state.selection = e.nativeEvent.selection;
                                                    // this.setState({ selection:this.state.se })

                                                }}
                                            />

                                        </View>

                                        <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", width: "100%", }} >
                                            {this.buildWords(textStyle)}
                                        </View>
                                    </SView>
                                </ScrollView>
                            </SView>
                        </SView>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SView>
        )

    }
}