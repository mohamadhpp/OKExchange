import { defineStore } from 'pinia';

export const useSymbolStore = defineStore('symbol',
{
    state: () =>
    ({
        favorites: useCookie('favorite-symbol').value === undefined ? [] : useCookie('favorite-symbol').value?.split(",")
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

            const favorites = useCookie('favorite-symbol');
            favorites.value = this.favorites.join();
        },

        deleteFavorite(symbol:string)
        {
            let index = this.favorites.indexOf(symbol);

            if(index !== -1)
            {
                this.favorites.splice(index, 1);

                const favorites = useCookie('favorite-symbol');
                favorites.value = this.favorites.join();
            }
        }
    }
})