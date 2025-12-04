import tw from 'twrnc';

export const styles = {
    container: tw`flex-1 bg-[#efeedb]`,
    contentWrapper: tw`flex-1 p-4`,
    title: tw`text-xl font-bold mb-4 text-[#55585b]`,
    notificationItem: tw`bg-white p-4 rounded-xl shadow mb-4`,
    notificationTitle: tw`text-lg font-medium text-[#F5A500]`,
    notificationRow: tw`flex-row items-center mb-2`,
    notificationBody: tw`text-gray-700 text-sm mb-2`,
    notificationLink: tw`text-blue-500 underline text-sm mb-2`,
    notificationImage: tw`w-full h-40 rounded-lg mt-2 mb-2`,
    notificationDate: tw`text-gray-500 text-xs mt-2`,
    bellIcon: tw`mr-2`,
};
