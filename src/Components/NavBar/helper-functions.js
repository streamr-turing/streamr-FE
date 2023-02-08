export const locationFunction = (location) => {
    switch(location.pathname) {
        case '/':
            return {
                homeButton: 'hide',
                watchlistButton:'nav-button',
            }
        case '/watchlist':
            return {
                homeButton: 'nav-button',
                watchlistButton:'hide',
            }
        default:
            return {
                homeButton: 'nav-button',
                watchlistButton:'nav-button',
            }
    }
}
