export const watchlist: string[] = [];


export const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
        watchlist.push(symbol);
        console.log('Symbol added to watchlist:', symbol);
    } else {
        console.log('Symbol already exists in watchlist:', symbol);
    }
};

export const removeFromWatchlist = (symbol: string) => {
    const index = watchlist.indexOf(symbol);
    if (index !== -1) {
        watchlist.splice(index, 1);
        console.log('Symbol removed from watchlist:', symbol);
    }
};




export const handleAddToWatchlist = (symbol: string, clicked: boolean) => {
    if(!clicked)
        addToWatchlist(symbol);
    else
        removeFromWatchlist(symbol)
    
    console.log(watchlist)
};
