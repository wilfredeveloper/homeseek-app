import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { icons } from "../../constants"

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = React.useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

        <View className="w-full h-16 px-4 bg-black-100 border-1 border-gray-100 rounded-2xl focus:border-secondary items-center flex-row">
            <TextInput
                className="w-full h-full flex-1 font-psemibold text-base text-white"
                placeholder={placeholder}
                placeholderTextColor={"#7b7b8b"}
                value={value}
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
                {...props}
            />

            {title === 'Password' && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="mr-2">
                    <Image source={ !showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>
                </TouchableOpacity>
            )}
        </View>
    </View>
  )
}

export default FormField