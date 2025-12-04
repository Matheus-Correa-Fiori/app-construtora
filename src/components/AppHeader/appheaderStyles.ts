import tw from 'twrnc';

export const styles = {
  wrapper: tw`bg-white py-2 px-6 flex-row items-center justify-center relative`,
  logo: tw`w-48 h-12`,
  menuButton: tw`absolute left-6 p-2`,
  overlay: tw`flex-1 bg-black/40`,
  dropdownContainer: tw`absolute top-14 left-4`,
  dropdown: tw`bg-white rounded-2xl shadow-2xl p-3 w-56`,
  closeButton: tw`self-end mb-2 p-1`,
  menuItem: tw`py-3 px-2 border-b border-gray-200`,
  menuText: tw`text-gray-800 text-base`,
};