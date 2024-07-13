import { defineStore } from 'pinia';

export const useCoinStore = defineStore('app',
{
    state: () =>
    ({
        favorites: useCookie('favorite-coin').value === undefined ? [] : useCookie('favorite-coin').value?.split(",")
    }),

    getters:
    {
        getFavorites: (state) =>
        {
            return state.favorites;
        }
    },

    actions:
    {
        addFavorite(symbol:string)
        {
            this.favorites.push(symbol);

            const favorites = useCookie('favorite-coin');
            favorites.value = this.favorites.join();
        },

        deleteFavorite(symbol:string)
        {
            let index = this.favorites.indexOf(symbol);

            if(index !== -1)
            {
                this.favorites.splice(index, 1);

                const favorites = useCookie('favorite-coin');
                favorites.value = this.favorites.join();
            }
        }
    }
})