import navigationStrings from './navigationStrings';

export const useDrawer = () => {
    const routesConfig = [
        {
            label: 'Home',
            // imageSrc: require('src/assets/drawerIcons/menu/menu/icon/menu/home.png'),
            url: navigationStrings.TAB_BAR_HOME,
        },
    ];

    return {
        routesConfig,
    };
};
