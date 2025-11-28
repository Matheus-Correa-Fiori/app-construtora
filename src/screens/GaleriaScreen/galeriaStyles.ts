import tw from 'twrnc';

export const styles = {
    container: tw`flex-1 bg-[#efeedb]`,
    header: tw`flex-row items-center px-4 py-2`,
    headerTitle: tw`flex-1 text-center text-lg font-bold mr-8`,
    backButton: tw`mr-2`,
    semanaContainer: tw`mb-6 px-4`,
    semanaTitulo: tw`text-lg font-bold mb-2`,
    grid: tw`flex-row flex-wrap -mx-1`,
    thumbWrap: tw`w-1/3 p-1`,
    thumbnail: tw`w-full aspect-square rounded-lg`,
    modalContainer: tw`flex-1 bg-black items-center justify-center`,
    modalClose: tw`absolute top-10 right-5 bg-black/50 p-2 rounded-lg z-10`,
    modalCloseText: tw`text-white font-bold`,
    imagemFull: tw`w-full h-full`,
};