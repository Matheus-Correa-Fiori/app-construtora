import tw from 'twrnc'
import {colors} from "../../types/Colors"

export const styles = {
  container: tw`flex-1 bg-white px-6`,
  content: tw`flex-1 justify-center items-center px-6`,
  title: tw`text-3xl font-bold mb-8 text-[${colors.yellow}]`,
  label: tw`w-full mb-2 font-semibold text-gray-700`,
  input: tw`w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 text-black`,
  link: tw`text-[${colors.yellow}] text-right mb-4 font-medium w-full`,
  button: tw`bg-[${colors.yellow}] w-full rounded-lg py-3 mt-2`,
  buttonText: tw`text-white text-center text-lg font-semibold`,
  password: tw`w-full mb-4 relative`,
  passwordInput: tw`w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-black`,
  showPassword: tw`absolute right-4 top-1/2 -mt-2`,
}