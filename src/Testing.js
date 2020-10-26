


export default function MyPicker(props) {

    if(Platform.OS === "ios") {
        return(
            <ModalPicker 
                title={props.title} 
                value={props.value} 
                setValue={props.setValue} 
                data={props.data}
            />
        )
    } else if(Platform.OS === "android"){
        return(
            <View style={styles.pickerContainer}>
                <Dropdown 
                    label={props.title}
                    onChangeText={value => props.setValue(value)}
                    value={props.value}
                    data={props.data}                       
                />
            </View>
        )
    }
}