import tw from 'twrnc'
import {colors} from "../../types/Colors"

export const styles = {
    container: tw`flex-1 bg-white px-6`,
    content: tw`flex-1 justify-center items-center px-6`,
    title: tw`text-2xl font-bold mb-6 text-[${colors.yellow}]`,
    label: tw`w-full mb-2 font-semibold text-gray-700`,
    input: tw`w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 text-black`,
    button: tw`w-full h-12 bg-[${colors.yellow}] rounded justify-center items-center mt-2`,
    buttonText: tw`text-white font-bold`,
}